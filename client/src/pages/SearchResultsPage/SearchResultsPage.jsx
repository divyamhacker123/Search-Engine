import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../HomePage/HomePage.css'; 

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q'); 
  
  const [searchInput, setSearchInput] = useState(query || '');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      fetchResults(query);
    }
  }, [query]);

  const fetchResults = async (searchQuery) => {
    try {
      const res = await fetch(`http://localhost:3000/api/search?q=${searchQuery}`);
      const data = await res.json();
      setResults(data.results);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const handleNewSearch = (e) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput)}`);
    }
  };

  return (
    <div className="results-page-container">
      {/* Top Navigation Bar */}
      <header className="results-header" style={{ display: 'flex', padding: '20px', alignItems: 'center', borderBottom: '1px solid #ebebeb' }}>
        <h2 style={{ margin: '0 20px 0 0', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <span style={{color: '#4285F4'}}>S</span>
          <span style={{color: '#EA4335'}}>e</span>
          <span style={{color: '#FBBC05'}}>a</span>
          <span style={{color: '#4285F4'}}>r</span>
          <span style={{color: '#34A853'}}>c</span>
          <span style={{color: '#EA4335'}}>h</span>
        </h2>
        <div style={{ position: 'relative' }}>
          <input 
            type="text" 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleNewSearch}
            style={{ 
              width: '400px', padding: '10px 40px 10px 15px', borderRadius: '24px', 
              border: '1px solid #dfe1e5', backgroundColor: '#303134', color: 'white', outline: 'none' 
            }}
          />
        </div>
      </header>

      {/* Search Results */}
      <main style={{ padding: '20px 150px' }}>
        <p style={{ color: '#9aa0a6', fontSize: '14px' }}>About {results.length} results</p>
        
        <div className="google-style-results">
          {results.map((result) => {
            // Generate the true Wikipedia link
            const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(result.title.replace(/ /g, '_'))}`;

            return (
              <div key={result.id} className="google-result-card" style={{ marginBottom: '25px' }}>
                
                {/* URL Breadcrumb */}
                <div className="result-url-container">
                  <span className="result-url">https://en.wikipedia.org › wiki › {result.title.replace(/\s+/g, '_')}</span>
                </div>
                
                {/* Clickable Title */}
                <a href={wikiUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <h3 className="result-title">{result.title}</h3>
                </a>
                
                {/* Snippet */}
                <p className="result-snippet" style={{ color: '#bdc1c6', fontSize: '14px', marginTop: '4px' }}>
                  {result.content}
                </p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default SearchResultsPage;