import React from 'react';

const Login = ({ onClose, onSignupClick }) => {
  return (
    <div className="modal-overlay">
      <div className="login-modal">
        <div className="login-left">
          <h2>Welcome!</h2>
          <p>Fanny pack hexagon food truck, street art waistcoat kitsch.</p>

          <form className="login-form">
            <label htmlFor="email">EMAIL</label>
            <input type="email" id="email" placeholder="Email" />

            <label htmlFor="password">PASSWORD</label>
            <input type="password" id="password" placeholder="Password" />

            <a href="#" className="forgot-link">Forgot your password?</a>

            <button type="submit" className="login-button">Login</button>
          </form>

          <p className="signup-link">
            Don’t have an account? <span onClick={onSignupClick}>Sign up now</span>
          </p>
        </div>

        <div className="login-right">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
            alt="laptop-coffee"
          />
        </div>

        <button className="close-button" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default Login;
