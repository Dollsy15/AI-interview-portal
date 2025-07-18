import React from 'react';

const Landing = ({ onLoginClick }) => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Welcome to AI Interview Portal</h1>
        <p>Scroll down to explore. Click below to login.</p>
        <button onClick={onLoginClick}>Click here to Login</button>
      </div>
    </div>
  );
};

export default Landing;
