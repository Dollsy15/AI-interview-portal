import React from 'react';

const Landing = ({ onLoginClick }) => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Welcome to <br/> AI Interview Portal</h1>
        <p>Scroll down to explore. </p>
        <button onClick={onLoginClick}>Click here to Login</button>
      </div>
    </div>
  );
};

export default Landing;
