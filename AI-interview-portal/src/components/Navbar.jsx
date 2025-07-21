import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">🤖 AI Interview</div>
      <ul className="navbar-links">
        <li>Products</li>
        <li>Customers</li>
        <li>Pricing</li>
        <li>Learn</li>
      </ul>
      <div className="navbar-buttons">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
