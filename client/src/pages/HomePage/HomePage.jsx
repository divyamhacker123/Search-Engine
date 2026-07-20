import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import SignInButton from './SignInButton'; // Adjust path if you put it in a components folder

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length > 0) {
      try {
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
    }
  };

  const executeSearch = (searchQuery) => {
    if (!searchQuery.trim()) return;
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeSearch(query);
    }
  };

  return (
    <div className="home-container">
      {/* Top Navigation for Sign In Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '15px 20px', width: '100%', boxSizing: 'border-box' }}>
        <SignInButton />
      </div>

      <main className="home-main">
        <div className="logo">
          <span className="logo-blue">S</span>
          <span className="logo-red">e</span>
          <span className="logo-yellow">a</span>
          <span className="logo-blue">r</span>
          <span className="logo-green">c</span>
          <span className="logo-red">h</span>
        </div>

        <div className="search-container">
          <div className={`search-box ${showSuggestions && suggestions.length > 0 ? 'search-box-active' : ''}`}>
            <svg className="search-icon" viewBox="0 0 24 24" fill="var(--icon-color)">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            
            <input 
              type="text" 
              placeholder="Search or type a URL" 
              autoFocus 
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Autocomplete Dropdown */}
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
      </main>
    </div>
  );
};

export default HomePage;