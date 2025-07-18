import React from 'react';
import '../styling/signup.css';

const Signup = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="signup-modal">
        <div className="signup-left">
          <h2>Create an Account</h2>
          <p>Join us for a better experience!</p>

          <form className="signup-form">
            <label htmlFor="name">FULL NAME</label>
            <input type="text" id="name" placeholder="Your name" />

            <label htmlFor="email">EMAIL</label>
            <input type="email" id="email" placeholder="Email" />

            <label htmlFor="password">PASSWORD</label>
            <input type="password" id="password" placeholder="Password" />

            <button type="submit" className="signup-button">Sign Up</button>
          </form>
        </div>

        <div className="signup-right"></div>

        <button className="close-button" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default Signup;
