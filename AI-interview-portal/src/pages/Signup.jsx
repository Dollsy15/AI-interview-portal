import React from "react";
import "../styling/signup.css";

function Signup() {
  return (
    <div className="signup-container">
      <h1>Signup Page</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
