import React, { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './styling/landing.css';
import './styling/login.css';
import './styling/signup.css';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = (showLogin || showSignup) ? 'hidden' : 'auto';
  }, [showLogin, showSignup]);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const handleCloseModal = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  return (
    <>
      <Landing onLoginClick={handleLoginClick} />

      {(showLogin || showSignup) && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>×</button>
            {showLogin && <Login onSignupClick={handleSignupClick} />}
            {showSignup && <Signup />}
          </div>
        </div>
      )}
    </>
  );
};

export default App;
