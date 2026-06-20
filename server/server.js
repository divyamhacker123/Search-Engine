const fs = require('fs');
const csv = require('csv-parser');
const express = require('express');
const cors = require('cors');
const SearchEngine = require('./SearchEngine');

const engine = new SearchEngine();
const app = express();

app.use(cors());
app.use(express.json());

// --- API Endpoints ---

// 1. Autocomplete Endpoint
app.get('/api/autocomplete', (req, res) => {
  const query = req.query.q || '';
  if (query.length < 1) return res.json({ suggestions: [] });
  
  const suggestions = engine.getAutocompleteSuggestions(query);
  res.json({ suggestions });
});

// 2. Search Endpoint
app.get('/api/search', (req, res) => {
  const query = req.query.q || '';
  if (!query) return res.json({ results: [] });

  const results = engine.search(query);
  res.json({ results });
});

// --- Data Import & Server Start ---

console.log('Starting data import. Please wait...');
let documentCount = 0;

fs.createReadStream('../articles.csv')
  .pipe(csv())
  .on('data', (row) => {
    
    // ⚠️ CRITICAL CHECK: Look at your articles.csv file. 
    // If your headers are 'Title' and 'Body', change this to row.Title and row.Body
    const doc = {
        id: row.url || String(documentCount), 
        title: row.title || row.Title || 'Untitled', 
        content: row.text || row.Text || row.content || '' 
    };

    engine.addDocument(doc.id, doc.title, doc.content);
    documentCount++;

    if (documentCount % 50000 === 0) {
        console.log(`Loaded ${documentCount} documents...`);
    }
  })
  .on('end', () => {
    console.log(`✅ Success! Indexed ${documentCount} documents.`);
    
    // 🚀 START THE SERVER HERE! Only after data is loaded.
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Search Engine backend is now live on http://localhost:${PORT}`);
    });
  })
  .on('error', (err) => {
      console.error('Error reading the CSV file:', err);
  });