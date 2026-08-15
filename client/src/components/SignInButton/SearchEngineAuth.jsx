import React, { useState } from 'react';

const SearchEngineAuth = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); 

  const [loggedInEmail, setLoggedInEmail] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    const endpoint = isSignUp ? '/api/signup' : '/api/login';

    try {
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message);
      } else {
        setLoggedInEmail(email);
        setIsModalOpen(false); 
      }
    } catch (err) {
      setErrorMsg("Failed to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setLoggedInEmail(null);
    setEmail('');
    setPassword('');
  };

  const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(2px)' },
    modal: { backgroundColor: '#202124', padding: '40px', borderRadius: '8px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', fontFamily: 'Roboto, Arial, sans-serif', border: '1px solid #3c4043' },
    headerText: { color: '#e8eaed', fontSize: '24px', fontWeight: '400', textAlign: 'center', margin: '0 0 8px 0' },
    subText: { color: '#9aa0a6', fontSize: '16px', textAlign: 'center', margin: '0 0 32px 0' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' },
    input: { backgroundColor: 'transparent', border: '1px solid #5f6368', borderRadius: '4px', color: '#e8eaed', padding: '13px 15px', fontSize: '16px', outline: 'none', transition: 'border-color 0.2s', width: '100%', boxSizing: 'border-box' },
    forgotPassword: { color: '#8ab4f8', fontSize: '14px', textDecoration: 'none', fontWeight: '500', cursor: 'pointer', display: 'inline-block', marginTop: '8px' },
    footerActions: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' },
    createAccountBtn: { color: '#8ab4f8', backgroundColor: 'transparent', border: 'none', fontSize: '14px', fontWeight: '500', cursor: 'pointer', padding: '8px 0' },
    submitBtn: { backgroundColor: '#8ab4f8', color: '#202124', border: 'none', padding: '9px 24px', borderRadius: '4px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'background-color 0.2s ease', opacity: isLoading ? 0.7 : 1 },
    triggerBtn: { backgroundColor: isHovered ? '#93baf9' : '#8ab4f8', color: '#202124', border: 'none', padding: '9px 23px', borderRadius: '4px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'background-color 0.2s ease' },
    errorText: { color: '#f28b82', fontSize: '13px', marginTop: '4px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' },
    
    avatarContainer: { display: 'flex', alignItems: 'center', gap: '12px' },
    avatar: { 
      width: '36px', 
      height: '36px', 
      borderRadius: '50%', 
      backgroundColor: '#8ab4f8', 
      color: '#202124', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      fontSize: '18px', 
      fontWeight: '500', 
      cursor: 'pointer',
      userSelect: 'none'
    },
    logoutBtn: { color: '#9aa0a6', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '14px' }
  };

  return (
    <div>
      {loggedInEmail ? (
        <div style={styles.avatarContainer}>
          <div 
            style={styles.avatar} 
            title={loggedInEmail}
          >
            {loggedInEmail.charAt(0).toUpperCase()}
          </div>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <button 
          style={styles.triggerBtn}
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
          onClick={() => setIsModalOpen(true)}
        >
          Sign in
        </button>
      )}

      {/* The Modal */}
      {isModalOpen && !loggedInEmail && (
        <div style={styles.overlay} onClick={() => setIsModalOpen(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.headerText}>{isSignUp ? 'Create account' : 'Sign in'}</h2>
            <p style={styles.subText}>Continue to your Search Engine</p>

            <form onSubmit={handleSubmit}>
              <div style={styles.inputGroup}>
                <input 
                  type="email" 
                  placeholder="Email or phone" 
                  style={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                
                <div>
                  <input 
                    type="password" 
                    placeholder="Enter your password" 
                    style={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {!isSignUp && <span style={styles.forgotPassword}>Forgot password?</span>}
                </div>
              </div>

              {errorMsg && (
                <div style={styles.errorText}>
                  ⚠️ {errorMsg}
                </div>
              )}

              <div style={styles.footerActions}>
                <button 
                  type="button" 
                  style={styles.createAccountBtn}
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setErrorMsg('');
                  }}
                >
                  {isSignUp ? 'Sign in instead' : 'Create account'}
                </button>
                
                <button 
                  type="submit" 
                  style={styles.submitBtn}
                  disabled={isLoading}
                >
                  {isLoading ? 'Checking...' : (isSignUp ? 'Sign up' : 'Next')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchEngineAuth;