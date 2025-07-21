import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>
          Crack interviews <br />
          with AI feedback<br />
          instantly.
        </h1>
        <p>
          Practice mock interviews powered by AI. Get instant feedback, tips, and performance reports.
        </p>
        <div className="hero-input">
          <input type="email" placeholder="Your business email" />
          <button>Get Started</button>
        </div>

        <div className="brands">
          <span>OpenAI</span>
          <span>Leetcode</span>
          <span>Glassdoor</span>
        </div>
      </div>

      <div className="hero-illustration">
        <div className="mock-card">
          <h4>Interview Feedback</h4>
          <p>Confidence Score: <strong>89%</strong></p>
          <p>Suggested Improvements: Communication, Depth</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
