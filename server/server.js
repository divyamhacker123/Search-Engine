// server.js
const express = require('express');
const cors = require('cors');
const SearchEngine = require('./SearchEngine');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Engine and load dummy data..
const engine = new SearchEngine();

// Simulating a dataset
const dummyData = [
  { id: '1', title: 'Learn React', content: 'React is a popular JavaScript library for building user interfaces.' },
  { id: '2', title: 'Nodejs Backend', content: 'Nodejs allows you to run JavaScript on the server. Great for APIs.' },
  { id: '3', title: 'Data Structures', content: 'Tries and Maps are essential data structures for efficient search queries.' },
  { id: '4', title: 'Advanced React', content: 'Hooks and context make React state management easier.' },
];

dummyData.forEach(doc => engine.addDocument(doc.id, doc.title, doc.content));

// --- API Endpoints ---

// 1. Autocomplete Endpoint
// Example: GET /api/autocomplete?q=rea
app.get('/api/autocomplete', (req, res) => {
  const query = req.query.q || '';
  if (query.length < 1) return res.json({ suggestions: [] });
  
  const suggestions = engine.getAutocompleteSuggestions(query);
  res.json({ suggestions });
});

// 2. Search Endpoint
// Example: GET /api/search?q=react data
app.get('/api/search', (req, res) => {
  const query = req.query.q || '';
  if (!query) return res.json({ results: [] });

  const results = engine.search(query);
  res.json({ results });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Search Engine backend running on http://localhost:${PORT}`);
});