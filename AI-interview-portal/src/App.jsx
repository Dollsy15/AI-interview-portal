import React, { useState } from 'react';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './styling/landing.css';
import './styling/login.css';
import './styling/signup.css';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
    document.body.style.overflow = 'hidden';
  };

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setShowLogin(false);
    setShowSignup(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <Landing onLoginClick={handleLoginClick} />
      {showLogin && <Login onClose={handleClose} onSignupClick={handleSignupClick} />}
      {showSignup && <Signup onClose={handleClose} />}
    </>
  );
}

export default App;
