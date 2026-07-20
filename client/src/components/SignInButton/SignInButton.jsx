import React from 'react';

const SignInButton = () => {
  return (
    <button 
      style={{
        backgroundColor: '#8ab4f8', // Google-style dark mode primary blue
        color: '#202124',
        border: 'none',
        padding: '9px 23px',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = '#93baf9'}
      onMouseOut={(e) => e.target.style.backgroundColor = '#8ab4f8'}
      onClick={() => alert("Sign in clicked!")}
    >
      Sign in
    </button>
  );
};

export default SignInButton;