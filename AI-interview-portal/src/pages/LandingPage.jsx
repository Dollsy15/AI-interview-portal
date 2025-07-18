import React, { useEffect, useState } from "react";
import Login from "./Login";
import "../styling/landing.css";

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2) {
        setShowModal(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="landing-container">
      <div className="scroll-section">
        <h1>SCROLL DOWN</h1>
        <span className="arrow">⬇</span>
      </div>
      <button className="login-fixed" onClick={() => setShowModal(true)}>
        Click here to login
      </button>
      {showModal && <Login onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default LandingPage;
