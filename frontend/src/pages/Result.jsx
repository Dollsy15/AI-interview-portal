import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // SAFE FALLBACKS
  const score = location.state?.score ?? 0;
  const feedback = location.state?.feedback ?? "No feedback available";
  const answers = location.state?.answers ?? [];
  const questions = location.state?.questions ?? [];

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>🎯 Interview Result</h1>

      {/* SCORE */}
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

      {/* OVERALL FEEDBACK */}
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

      {/* QUESTIONS + ANSWERS */}
      <div
        style={{
          marginTop: "40px",
          maxWidth: "700px",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "left",
        }}
      >
        <h3>📝 Your Responses</h3>

        {questions.length === 0 ? (
          <p>No questions available</p>
        ) : (
          questions.map((q, index) => (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                background: "#fff",
              }}
            >
              <strong>
                Q{index + 1}: {q}
              </strong>

              <p style={{ marginTop: "10px" }}>
                <b>Your Answer:</b>{" "}
                {answers[index] ? answers[index] : "No answer provided"}
              </p>
            </div>
          ))
        )}
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
