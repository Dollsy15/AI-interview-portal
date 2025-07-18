import React, { useEffect, useState } from "react";
import "./Login.css";

function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollPrompt, setShowScrollPrompt] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && !isModalOpen) {
        setIsModalOpen(true);
        setShowScrollPrompt(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isModalOpen]);

  return (
    <>
      {showScrollPrompt && (
        <div className="scroll-down">
          Scroll Down to Continue
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13S23.2 3 16 3zm0 2c6.1 0 11 4.9 11 11s-4.9 11-11 11S5 22.1 5 16 9.9 5 16 5zm-1 4v10.3l-4-4-1.4 1.4L16 23.1l6.4-6.4-1.4-1.4-4 4V9z" />
          </svg>
        </div>
      )}

      <div className="container"></div>

      <div className={`modal ${isModalOpen ? "is-open" : ""}`}>
        <div className="modal-container">
          <div className="modal-left">
            <h1 className="modal-title">Welcome!</h1>
            <p className="modal-desc">Fanny pack hexagon food truck, street art waistcoat kitsch.</p>
            <div className="input-block">
              <label htmlFor="email" className="input-label">Email</label>
              <input type="email" name="email" id="email" placeholder="Email" />
            </div>
            <div className="input-block">
              <label htmlFor="password" className="input-label">Password</label>
              <input type="password" name="password" id="password" placeholder="Password" />
            </div>
            <div className="modal-buttons">
              <a href="/">Forgot your password?</a>
              <button className="input-button">Login</button>
            </div>
            <p className="sign-up">Don't have an account? <a href="/signup">Sign up now</a></p>
          </div>
          <div className="modal-right">
            <img src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=1000&q=80" alt="Welcome" />
          </div>
          <button className="icon-button close-button" onClick={() => setIsModalOpen(false)}>
            ✕
          </button>
        </div>
        <button className="modal-button">Click here to login</button>
      </div>
    </>
  );
}

export default Login;
