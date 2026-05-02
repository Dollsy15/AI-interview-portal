import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // SAFE FALLBACK (IMPORTANT FIX)
  const score = location.state?.score ?? 0;
  const feedback = location.state?.feedback ?? "No feedback available";

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>🎯 Interview Result</h1>

      {/* SCORE BOX */}
      <div
        style={{
          marginTop: "20px",
          fontSize: "28px",
          fontWeight: "bold",
          color: score >= 50 ? "green" : "red",
        }}
      >
        Your Score: {score}%
      </div>

      {/* FEEDBACK BOX */}
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          textAlign: "left",
          whiteSpace: "pre-wrap",
          background: "#f9f9f9",
          maxWidth: "700px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <h3>📊 AI Feedback</h3>
        <p>{feedback}</p>
      </div>

      {/* BUTTONS */}
      <div style={{ marginTop: "30px" }}>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            background: "#333",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          🏠 Dashboard
        </button>

        <button
          onClick={() => navigate("/interview")}
          style={{
            padding: "10px 20px",
            background: "#4a6cf7",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          🔁 Retake Interview
        </button>
      </div>
    </div>
  );
};

export default Result;
