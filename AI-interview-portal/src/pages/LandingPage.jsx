import React, { useEffect, useState } from "react";
import Login from "./Login";
import "../styling/landing.css";

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 3 && !showModal) {
        setShowModal(true);
        document.body.style.overflow = "hidden";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="landing-page">
      <div className="scroll-section">
        <h1>Scroll Down</h1>
        <div className="arrow">&#8595;</div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>×</button>
            <Login />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
