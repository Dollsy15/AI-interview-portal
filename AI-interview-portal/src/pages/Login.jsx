import React from "react";

const Login = ({ isOpen, onClose, onSignupClick }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    document.body.style.overflow = "auto";
  };

  return (
    <div className="modal is-open">
      <div className="modal-container">
        <div className="modal-left">
          <h1 className="modal-title">Welcome!</h1>
          <p className="modal-desc">
            Fanny pack hexagon food truck, street art waistcoat kitsch.
          </p>
          <div className="input-block">
            <label htmlFor="email" className="input-label">Email</label>
            <input type="email" id="email" placeholder="Email" />
          </div>
          <div className="input-block">
            <label htmlFor="password" className="input-label">Password</label>
            <input type="password" id="password" placeholder="Password" />
          </div>
          <div className="modal-buttons">
            <a href="#" onClick={(e) => e.preventDefault()}>Forgot your password?</a>
            <button className="input-button">Login</button>
          </div>
          <p className="sign-up">
            Don't have an account?{" "}
            <a href="#" onClick={(e) => {
              e.preventDefault();
              onSignupClick();
              handleClose();
            }}>Sign up now</a>
          </p>
        </div>

        <div className="modal-right">
          <img
            src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f"
            alt="login"
          />
        </div>

        <button className="icon-button close-button" onClick={handleClose}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
            <path d="M 25 3 C 12.86158 3 3 12.86158 3 25 C 3 37.13842 12.86158 47 25 47 C 37.13842 47 47 37.13842 47 25 C 47 12.86158 37.13842 3 25 3 z M 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.980469 15.990234 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Login;
