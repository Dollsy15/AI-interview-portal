import React from "react";
import "../styling/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="left-section">
        <div className="logo">🤖 AI Interview</div>
        <ul className="nav-links">
          <li>Practice</li>
          <li>Customers</li>
          <li>Feedback</li>
          <li>Resources</li>
        </ul>
        <div className="buttons">
          <button className="btn login">Login</button>
          <button className="btn signup">Sign Up</button>
        </div>
      </div>

      <div className="right-section">
        <h1>Crack interviews with AI feedback instantly.</h1>
        <p>
          Practice mock interviews powered by AI. Get instant feedback, tips and
          performance reports.
        </p>
        <div className="email-section">
          <input type="email" placeholder="Your email" />
          <button className="btn get-started">Get Started</button>
        </div>
        <div className="example-feedback">
          <p className="platforms">OpenAI · Leetcode · Glassdoor</p>
          <p className="heading">Interview Feedback</p>
          <p className="improvements">
            Suggested Improvements: Communication, Depth
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
