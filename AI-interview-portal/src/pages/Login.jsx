import React, { useEffect, useState } from "react";
import "../styling/login.css";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "initial";
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 3 && !isModalOpen) {
        setIsModalOpen(true);
        const scrollDown = document.querySelector(".scroll-down");
        if (scrollDown) scrollDown.style.display = "none";
        document.body.style.overflow = "hidden";
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <div className="container">
      <div className="scroll-down">
        Scroll Down <br />
        <svg viewBox="0 0 24 24">
          <path d="M12 16l-6-6h12z" />
        </svg>
      </div>

      <div className={`modal ${isModalOpen ? "is-open" : ""}`}>
        <div className="modal-container">
          <div className="modal-left">
            <h1 className="modal-title">Welcome Back</h1>
            <p className="modal-desc">Login to access your dashboard</p>

            <form>
              <div className="input-block">
                <label htmlFor="email" className="input-label">Email</label>
                <input type="email" id="email" placeholder="example@email.com" />
              </div>

              <div className="input-block">
                <label htmlFor="password" className="input-label">Password</label>
                <input type="password" id="password" placeholder="Enter your password" />
              </div>

              <button type="submit" className="input-button">Login</button>
            </form>

            <p className="sign-up">Don't have an account? <a href="#">Sign up now</a></p>
          </div>

          <div className="modal-right">
            <img src="https://images.unsplash.com/photo-1538137524007-21e48fa42f3f?auto=format&fit=crop&w=934&q=80" alt="modal visual" />
          </div>
        </div>

        <button className="modal-button" onClick={openModal}>Open Login</button>
        <button className="close-button" onClick={closeModal}>×</button>
      </div>
    </div>
  );
};

export default Login;
