import { useEffect, useState } from "react";
import "../styling/Login.css";

function Login() {
  const [showModal, setShowModal] = useState(false);
  const [showScrollPrompt, setShowScrollPrompt] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowModal(true);
        setShowScrollPrompt(false);
        window.removeEventListener("scroll", handleScroll);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container">
      {showScrollPrompt && (
        <div className="scroll-down">
          Scroll Down to Continue
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
            <path d="M480 696 280 496h400L480 696Z" />
          </svg>
        </div>
      )}

      <div className={`modal ${showModal ? "is-open" : ""}`}>
        <div className="modal-container">
          <div className="modal-left">
            <h1 className="modal-title">Welcome Back</h1>
            <p className="modal-desc">Login to your account</p>
            <form>
              <div className="input-block">
                <label htmlFor="email" className="input-label">
                  Email
                </label>
                <input type="email" id="email" placeholder="example@gmail.com" />
              </div>
              <div className="input-block">
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <input type="password" id="password" placeholder="••••••••" />
              </div>
              <button type="submit" className="input-button">Login</button>
            </form>
            <p className="sign-up">
              Don't have an account? <a href="/signup">Sign up now</a>
            </p>
          </div>
          <div className="modal-right">
            <img
              src="https://images.unsplash.com/photo-1538137524007-21e48fa42f3f"
              alt="login visual"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;