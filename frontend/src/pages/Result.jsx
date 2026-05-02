import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { score, feedback } = location.state || {};

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>🎯 Interview Result</h1>

      <h2 style={{ marginTop: "20px" }}>Your Score: {score}%</h2>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          textAlign: "left",
          whiteSpace: "pre-wrap",
        }}
      >
        {feedback}
      </div>

      <div style={{ marginTop: "30px" }}>
        <button
          onClick={() => navigate("/dashboard")}
          style={{ marginRight: "10px", padding: "10px 20px" }}
        >
          Go to Dashboard
        </button>

        <button
          onClick={() => navigate("/interview")}
          style={{ padding: "10px 20px" }}
        >
          Retake Interview
        </button>
      </div>
    </div>
  );
};

export default Result;
