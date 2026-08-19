# Search Engine

A lightweight search engine that crawls web pages, builds an **inverted index**, ranks relevant documents, and returns search results through a web interface. The project is designed to demonstrate how a search engine works internally, from document processing and indexing to query processing and ranking.

## 🚀 Features

* 🔎 Keyword-based search
* 🕷️ Web/document crawling
* 📚 Inverted index for fast retrieval
* 🧹 Text preprocessing and tokenization
* 📊 Document ranking
* ⚡ Fast search using indexed data
* 🌐 Web-based search interface
* 🤖 LLM + RAG integration for AI-powered answers
* 🔗 Displays traditional search results alongside LLM-generated results

## 🏗️ Architecture

```text
                 ┌─────────────────┐
                 │   User Query    │
                 └────────┬────────┘
                          │
                          ▼
                ┌───────────────────┐
                │ Query Processing  │
                └─────────┬─────────┘
                          │
              ┌───────────┴───────────┐
              ▼                       ▼
      ┌────────────────┐     ┌────────────────┐
      │ Inverted Index │     │  RAG Pipeline  │
      └───────┬────────┘     └───────┬────────┘
              │                      │
              ▼                      ▼
      ┌────────────────┐     ┌────────────────┐
      │ Search Ranking │     │      LLM       │
      └───────┬────────┘     └───────┬────────┘
              │                      │
              └──────────┬───────────┘
                         ▼
                ┌──────────────────┐
                │ Search Results   │
                └──────────────────┘
```

## 🔍 How It Works

### 1. Crawling

The crawler collects documents/web pages that will be searchable.

```text
URL → Fetch Page → Extract Content → Store Document
```

### 2. Preprocessing

The extracted text is cleaned and converted into searchable tokens.

Typical operations include:

* Lowercasing
* Tokenization
* Removing unnecessary characters
* Stop-word removal
* Stemming/lemmatization

### 3. Inverted Index

The search engine creates an inverted index that maps terms to documents.

Example:

```text
"react"  → [doc1, doc4, doc8]
"node"   → [doc2, doc4]
"search" → [doc1, doc2, doc8]
```

This allows the engine to find relevant documents without scanning every document.

### 4. Query Processing

When a user searches:

```text
machine learning
```

the query is processed in the same way as indexed documents.

```text
User Query
    ↓
Tokenization
    ↓
Normalization
    ↓
Term Lookup
    ↓
Candidate Documents
```

### 5. Ranking

Retrieved documents are ranked based on their relevance to the query.

Possible ranking techniques include:

* TF-IDF
* BM25
* Term frequency
* Document frequency
* Cosine similarity
* Vector similarity

### 6. LLM + RAG

The search engine can also use **Retrieval-Augmented Generation (RAG)**.

```text
User Query
    ↓
Retrieve Relevant Documents
    ↓
Create Context
    ↓
Send Context + Query to LLM
    ↓
Generate Answer
```

The UI can display both:

```text
┌────────────────────────────────────┐
│ AI Answer                          │
│                                    │
│ Generated answer using retrieved   │
│ documents as context.              │
└────────────────────────────────────┘

Search Results
──────────────────────────────────────
1. Document A
2. Document B
3. Document C
```

## 🛠️ Tech Stack

Update this section according to the technologies used in your implementation.

### Frontend

* React.js
* JavaScript
* HTML
* CSS

### Backend

* Node.js
* Express.js
* REST APIs

### Search

* Inverted Index
* TF-IDF / BM25
* Text preprocessing
* Ranking algorithms

### AI

* LLM
* RAG
* Embeddings
* Vector search

### Database

* MongoDB / PostgreSQL / your chosen database

## 📁 Project Structure

```text
search-engine/
│
├── frontend/
│   ├── src/
│   ├── components/
│   └── App.jsx
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── services/
│   └── server.js
│
├── crawler/
│   ├── crawler.js
│   └── parser.js
│
├── search/
│   ├── invertedIndex.js
│   ├── tokenizer.js
│   ├── ranking.js
│   └── search.js
│
├── rag/
│   ├── retriever.js
│   ├── embeddings.js
│   └── llm.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

## ⚙️ Installation

Clone the repository:

```bash
git clone <YOUR_REPOSITORY_URL>
cd search-engine
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=8080
MONGO_URL=your_mongodb_connection_string
LLM_API_KEY=your_api_key
```

Start the development server:

```bash
npm run dev
```

The application should now be available at:

```text
http://localhost:8080
```

## 🔌 API Example

### Search

```http
GET /api/search?q=machine+learning
```

Example response:

```json
{
  "query": "machine learning",
  "results": [
    {
      "title": "Introduction to Machine Learning",
      "url": "https://example.com/ml",
      "score": 0.92
    },
    {
      "title": "Machine Learning Algorithms",
      "url": "https://example.com/algorithms",
      "score": 0.84
    }
  ]
}
```

## 🧠 Search Pipeline

```text
Documents
    ↓
Crawler
    ↓
Text Extraction
    ↓
Preprocessing
    ↓
Tokenization
    ↓
Inverted Index
    ↓
Query
    ↓
Candidate Retrieval
    ↓
Ranking
    ↓
Search Results
    ↓
RAG
    ↓
LLM Answer
```

## 🎯 Goals

The main goal of this project is to understand and implement the core concepts behind modern search engines, including:

* Information retrieval
* Inverted indexing
* Search ranking
* Query processing
* Web crawling
* Embeddings
* Vector retrieval
* RAG
* LLM integration

## 🚧 Future Improvements

* [ ] Implement BM25 ranking
* [ ] Add spelling correction
* [ ] Add autocomplete
* [ ] Add semantic/vector search
* [ ] Improve crawler scalability
* [ ] Add distributed indexing
* [ ] Add caching
* [ ] Add personalized ranking
* [ ] Improve RAG answer quality
* [ ] Add source citations to AI responses
* [ ] Implement hybrid keyword + semantic search
* [ ] Add query analytics

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes.
5. Push the branch.
6. Open a pull request.

---

**Built to understand how search engines work — from inverted indexing to RAG-powered AI search.**
