import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Landing from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/dashboard.jsx";

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "auto";
  }, [modalOpen]);

  const handleLoginClick = () => {
    setModalOpen(true);
    setShowLogin(true);
  };

  const handleSignupClick = () => {
    setShowLogin(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleLoginSuccess = () => {
    setModalOpen(false);
    navigate("/dashboard"); // Redirect to dashboard after login
  };

  return (
    <Routes>
      {/* ✅ Route for Landing page */}
      <Route
        path="/"
        element={
          <>
            <Landing onLoginClick={handleLoginClick} />
            {modalOpen && (
              <div className="modal-overlay">
                <div className="modal-content">
                  {showLogin ? (
                    <Login
                      onClose={handleCloseModal}
                      onSignupClick={handleSignupClick}
                      onLoginSuccess={handleLoginSuccess} // <-- this will trigger dashboard redirect
                    />
                  ) : (
                    <Signup onClose={handleCloseModal} />
                  )}
                </div>
              </div>
            )}
          </>
        }
      />

      {/* ✅ Route for Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
