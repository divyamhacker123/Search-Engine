import React, { useState } from 'react';
import './HomePage.css';

const shortcuts = [
  { name: 'GitHub', bgColor: '#161b22', icon: <svg viewBox="0 0 24 24" fill="white" width="24" height="24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
  { name: 'YouTube', bgColor: '#ff0000', icon: <svg viewBox="0 0 24 24" fill="white" width="24" height="24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
  { name: 'LinkedIn', bgColor: '#0a66c2', icon: <svg viewBox="0 0 24 24" fill="white" width="24" height="24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { name: 'Twitter', bgColor: '#1d9bf0', icon: <svg viewBox="0 0 24 24" fill="white" width="24" height="24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg> },
  { name: 'Dev.to', bgColor: '#8b5cf6', icon: <svg viewBox="0 0 24 24" fill="white" width="24" height="24"><path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-1.47h-2.47v1.77h2.52v1.26H8.22V8.53h2.94v1.25h-2.47v1.78h2.47v1.27zm4.33-1.53L17.03 8.5h1.46l-1.22 3.88-1.21 3.84h-1.4l-1.22-3.84L12.22 8.5h1.5l.95 3.01.96 3.05.35-1.13z"/></svg> },
  { name: 'Medium', bgColor: '#059669', icon: <svg viewBox="0 0 24 24" fill="white" width="24" height="24"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42M24 12c0 3.11-.53 5.62-1.18 5.62-.66 0-1.18-2.51-1.18-5.62s.52-5.62 1.18-5.62c.65 0 1.18 2.51 1.18 5.62"/></svg> },
  { name: 'Portfolio', bgColor: '#ea580c', icon: <svg viewBox="0 0 24 24" fill="white" width="24" height="24"><path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 16H4V8h16v12z"/></svg> },
  { name: 'Add shortcut', bgColor: '#303134', icon: <svg viewBox="0 0 24 24" fill="white" width="24" height="24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg> }
];

const HomePage = () => {
  // --- STATE MANAGEMENT ---
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // --- 1. HANDLE AUTOCOMPLETE ---
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length > 0) {
      try {
        // Fetch from the Node.js backend
        const res = await fetch(`http://localhost:3000/api/autocomplete?q=${value}`);
        const data = await res.json();
        setSuggestions(data.suggestions);
        setShowSuggestions(true);
      } catch (err) {
        console.error("Autocomplete error:", err);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setResults([]); // Clear results if query is empty
    }
  };

  // --- 2. HANDLE SEARCH FUNCTION ---
  const executeSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;
    
    setShowSuggestions(false); // Hide the dropdown when searching
    setQuery(searchQuery);     // Ensure the input box shows the clicked/searched term

    try {
      const res = await fetch(`http://localhost:3000/api/search?q=${searchQuery}`);
      const data = await res.json();
      setResults(data.results);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  // Trigger search on "Enter" key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeSearch(query);
    }
  };

  return (
    <div className="home-container">
      {/* Top Navigation */}
      <header className="home-header">
        <div className="header-left">
          <svg className="menu-icon" viewBox="0 0 24 24" fill="var(--text-color)">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </div>
        <div className="header-right">
          <a href="#gmail">Gmail</a>
          <a href="#images">Images</a>
          <svg className="nav-icon" viewBox="0 0 24 24" fill="var(--text-color)"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/></svg>
          <div className="profile-icon">U</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="home-main">
        {/* Hide logo if we have search results */}
        {results.length === 0 && (
          <div className="logo">
            <span className="logo-blue">S</span>
            <span className="logo-red">e</span>
            <span className="logo-yellow">a</span>
            <span className="logo-blue">r</span>
            <span className="logo-green">c</span>
            <span className="logo-red">h</span>
          </div>
        )}

        {/* --- SEARCH BOX CONTAINER --- */}
        <div className="search-container">
          <div className={`search-box ${showSuggestions && suggestions.length > 0 ? 'search-box-active' : ''}`}>
            <svg className="search-icon" viewBox="0 0 24 24" fill="var(--icon-color)">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            
            {/* Input modified to use State and Event Handlers */}
            <input 
              type="text" 
              placeholder="Search or type a URL" 
              autoFocus 
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            
            <svg className="mic-icon" viewBox="0 0 24 24" fill="var(--icon-color)">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
          </div>

          {/* --- AUTOCOMPLETE DROPDOWN --- */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {suggestions.map((suggestion, index) => (
                <div 
                  key={index} 
                  className="suggestion-item"
                  onClick={() => executeSearch(suggestion)}
                >
                  <svg className="search-icon-small" viewBox="0 0 24 24" fill="var(--icon-color)">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- CONDITIONAL RENDERING: Results OR Shortcuts --- */}
        {results.length > 0 ? (
          <div className="search-results">
            {results.map((result) => (
              <div key={result.id} className="result-card">
                <h3>{result.title}</h3>
                <p>{result.content}</p>
                <span className="result-score">Relevance Score: {result.score}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="shortcuts-grid">
            {shortcuts.map((shortcut, index) => (
              <div className="shortcut-item" key={index}>
                <div className="shortcut-icon" style={{ backgroundColor: shortcut.bgColor }}>
                  {shortcut.icon}
                </div>
                <span className="shortcut-label">{shortcut.name}</span>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-left">
          <a href="#about">About</a>
          <a href="#advertising">Advertising</a>
          <a href="#business">Business</a>
        </div>
        <div className="footer-right">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#settings">Settings</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;