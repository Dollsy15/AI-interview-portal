import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const feedbackArray = location.state?.feedbackArray ?? [];

  // SAFE FALLBACKS
  const score = location.state?.score ?? 0;
  const feedback = location.state?.feedback ?? "No feedback available";
  const answers = location.state?.answers ?? [];
  const questions = location.state?.questions ?? [];

  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < score) {
        current += 1;
        setDisplayScore(current);
      } else {
        clearInterval(interval);
      }
    }, 20); // Speed of the counter
    return () => clearInterval(interval);
  }, [score]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-gradient)",
        padding: "60px 20px",
        textAlign: "center",
        color: "var(--text-primary)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          h1 { font-size: 24px !important; }
          .result-container { padding: 20px 10px !important; }
          .feedback-box, .qa-box, .response-box { padding: 20px !important; }
          .btn-group { flex-direction: column; gap: 12px; }
          .btn-group button { width: 100%; margin-right: 0 !important; }
        }
      `}</style>
      <h1 style={{ fontSize: "36px", fontWeight: "800", marginBottom: "40px" }}>🎯 Interview Result</h1>

      {/* SCORE */}
      <div
        style={{
          marginTop: "20px",
          fontSize: "28px",
          fontWeight: "bold",
          color: score >= 50 ? "green" : "red",
        }}
      >
        Your Score: {displayScore}%
      </div>

      {/* OVERALL FEEDBACK */}
      <div
        className="feedback-box"
        style={{
          marginTop: "30px",
          padding: "32px",
          border: "1px solid var(--border-color)",
          borderRadius: "20px",
          textAlign: "left",
          whiteSpace: "pre-wrap",
          background: "var(--bg-card)",
          maxWidth: "800px",
          marginLeft: "auto",
          marginRight: "auto",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        }}
      >
        <h3 style={{ marginBottom: "16px" }}>📊 AI Feedback</h3>
        <p style={{ lineHeight: "1.6" }}>{feedback}</p>
      </div>

      {/* 🧠 QUESTION-WISE FEEDBACK (ADDED) */}
      {feedbackArray.length > 0 && (
        <div
          style={{
            marginTop: "40px",
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "left",
          }}
        >
          <h3 style={{ marginBottom: "20px" }}>🧠 Question-wise Feedback</h3>
          {feedbackArray.map((f, i) => (
            <div
              key={i}
              style={{
                marginBottom: "16px",
                padding: "20px",
                border: "1px solid var(--border-color)",
                borderRadius: "12px",
                background: "var(--bg-card)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            >
              <p style={{ marginBottom: "8px" }}><b>Q:</b> {f.question}</p>
              <p style={{ margin: 0 }}><b>Feedback:</b> {f.remark}</p>
            </div>
          ))}
        </div>
      )}

      {/* QUESTIONS + ANSWERS */}
      <div
        style={{
          marginTop: "40px",
          maxWidth: "800px",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "left",
        }}
      >
        <h3 style={{ marginBottom: "20px" }}>📝 Your Responses</h3>
        {questions.length === 0 ? (
          <p>No questions available</p>
        ) : (
          questions.map((q, index) => (
            <div
              key={index}
              style={{
                marginBottom: "16px",
                padding: "20px",
                border: "1px solid var(--border-color)",
                borderRadius: "12px",
                background: "var(--bg-card)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            >
              <strong style={{ display: "block", marginBottom: "12px" }}>
                Q{index + 1}: {q}
              </strong>
              <p style={{ margin: 0, lineHeight: "1.6" }}>
                <b>Your Answer:</b>{" "}
                {answers[index] ? answers[index] : "No answer provided"}
              </p>
            </div>
          ))
        )}
      </div>

      {/* BUTTONS */}
      <div className="btn-group" style={{ marginTop: "40px", paddingBottom: "60px" }}>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            marginRight: "16px",
            padding: "14px 28px",
            background: "var(--bg-card)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-color)",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "all 0.3s ease",
          }}
        >
          🏠 Dashboard
        </button>
        <button
          onClick={() => navigate("/interview")}
          style={{
            padding: "14px 28px",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "700",
            boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
            transition: "all 0.3s ease",
          }}
        >
          🔁 Retake Interview
        </button>
      </div>
    </div>
  );
};

export default Result;