import React from 'react';

const Landing = ({ onLoginClick }) => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Welcome to AI Interview Portal</h1>
        <p>Crack your dream job with AI-powered mock interviews.</p>
        <button className="login-btn" onClick={onLoginClick}>
          Click here to Login
        </button>
      </div>
    </div>
  );
};

export default Landing;
