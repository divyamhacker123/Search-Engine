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
    this.documents = new Map();
  }

  tokenize(text) {
    if (!text) return [];
    return text.toLowerCase().match(/\b\w+\b/g) || [];
  }

  addDocument(docId, title, content) {
    if (!docId || !title) return;
    
    const safeContent = content || "";
    this.documents.set(docId, { title, content: safeContent });
    
    const words = this.tokenize(title + " " + safeContent);
    const wordCounts = new Map();

    for (const word of words) {
      wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
      this._insertIntoTrie(word);
    }

    for (const [word, frequency] of wordCounts.entries()) {
      if (!this.invertedIndex.has(word)) {
        this.invertedIndex.set(word, []);
      }
      this.invertedIndex.get(word).push({ docId, frequency });
    }
  }

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
    if (!prefix) return [];
    
    let current = this.trieRoot;
    const prefixLower = prefix.toLowerCase();
    
    for (const char of prefixLower) {
      if (!current.children.has(char)) return [];
      current = current.children.get(char);
    }

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

  search(query) {
    const queryWords = this.tokenize(query);
    if (queryWords.length === 0) return [];

    const docScores = new Map(); 

    for (const word of queryWords) {
      if (this.invertedIndex.has(word)) {
        const postings = this.invertedIndex.get(word);
        
        for (const posting of postings) {
          const currentScore = docScores.get(posting.docId) || 0;
          docScores.set(posting.docId, currentScore + posting.frequency);
        }
      }
    }

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