import React, { useState, useEffect } from 'react';
import Landing from './pages/LandingPage.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

import './styling/landing.css';
import './styling/Login.css';
import './styling/Signup.css';

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : 'auto';
  }, [modalOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 3 && !modalOpen) {
        setModalOpen(true);
        setShowLogin(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [modalOpen]);

  const handleLoginClick = () => {
    if (!modalOpen) {
      setModalOpen(true);
      setShowLogin(true);
    }
  };

  const handleSignupClick = () => {
    setShowLogin(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Landing onLoginClick={handleLoginClick} />

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>×</button>
            {showLogin ? (
              <Login onSignupClick={handleSignupClick} />
            ) : (
              <Signup />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default App;
