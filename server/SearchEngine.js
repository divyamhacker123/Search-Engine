// SearchEngine.js

class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class SearchEngine {
  constructor() {
    this.trieRoot = new TrieNode();
    this.invertedIndex = new Map(); 
    // Map structure: { "word": [{ docId: 1, frequency: 3 }, { docId: 2, frequency: 1 }] }
    this.documents = new Map(); // Store original docs for retrieval
  }

  // --- 1. Optimized String Processing ---
  tokenize(text) {
    // Convert to lowercase and match only alphanumeric words
    return text.toLowerCase().match(/\b\w+\b/g) || [];
  }

  // --- 2. Inverted Index Construction ---
  addDocument(docId, title, content) {
    this.documents.set(docId, { title, content });
    
    const words = this.tokenize(title + " " + content);
    const wordCounts = new Map();

    // Calculate term frequency in this specific document
    for (const word of words) {
      wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
      this._insertIntoTrie(word); // Feed word to Autocomplete
    }

    // Add to Inverted Index
    for (const [word, frequency] of wordCounts.entries()) {
      if (!this.invertedIndex.has(word)) {
        this.invertedIndex.set(word, []);
      }
      this.invertedIndex.get(word).push({ docId, frequency });
    }
  }

  // --- 3. Trie Implementation for Autocomplete ---
  _insertIntoTrie(word) {
    let current = this.trieRoot;
    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char);
    }
    current.isEndOfWord = true;
  }

  getAutocompleteSuggestions(prefix, limit = 5) {
    let current = this.trieRoot;
    const prefixLower = prefix.toLowerCase();
    
    // Navigate to the end of the prefix
    for (const char of prefixLower) {
      if (!current.children.has(char)) return [];
      current = current.children.get(char);
    }

    // DFS to find all words branching from this prefix
    const suggestions = [];
    const dfs = (node, currentWord) => {
      if (suggestions.length >= limit) return;
      if (node.isEndOfWord) suggestions.push(currentWord);
      
      for (const [char, childNode] of node.children.entries()) {
        dfs(childNode, currentWord + char);
      }
    };

    dfs(current, prefixLower);
    return suggestions;
  }

  // --- 4. Efficient Search & Ranking ---
  search(query) {
    const queryWords = this.tokenize(query);
    if (queryWords.length === 0) return [];

    const docScores = new Map(); // docId -> cumulative score

    for (const word of queryWords) {
      if (this.invertedIndex.has(word)) {
        const postings = this.invertedIndex.get(word);
        
        for (const posting of postings) {
          // Simple ranking: Term Frequency (TF)
          // For advanced ranking, you would implement TF-IDF here
          const currentScore = docScores.get(posting.docId) || 0;
          docScores.set(posting.docId, currentScore + posting.frequency);
        }
      }
    }

    // Sort documents by score descending
    const rankedResults = Array.from(docScores.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([docId, score]) => ({
        id: docId,
        score: score,
        ...this.documents.get(docId)
      }));

    return rankedResults;
  }
}

module.exports = SearchEngine;