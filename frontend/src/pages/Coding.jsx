import React, { useState } from "react";
import axios from "axios";

const Coding = () => {
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [runResult, setRunResult] = useState(null);

  const questions = [
    {
      title: "Reverse a String",
      description: "Write a function to reverse a string",
      example: 'Input: "hello" → Output: "olleh"',
      tag: "String",
    },
    {
      title: "Maximum in Array",
      description: "Find the maximum number in an array",
      example: "Input: [3, 7, 1, 9, 4] → Output: 9",
      tag: "Array",
    },
    {
      title: "Palindrome Check",
      description: "Check if a number is a palindrome",
      example: "Input: 121 → Output: true",
      tag: "Logic",
    },
  ];

  const runCode = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/code/run", {
        code: answers[currentIndex],
      });

      setRunResult(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const answeredCount = Object.values(answers).filter(
    (a) => a.trim() !== "",
  ).length;
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const isLast = currentIndex === questions.length - 1;
  const q = questions[currentIndex];

  const tagColors = {
    String: { bg: "#eff6ff", color: "#1d4ed8" },
    Array: { bg: "#f0fdf4", color: "#15803d" },
    Logic: { bg: "#fdf4ff", color: "#7e22ce" },
  };

  if (submitted) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "48px",
            textAlign: "center",
            maxWidth: "520px",
            width: "100%",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🎉</div>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#1f2937",
              margin: "0 0 8px",
            }}
          >
            Code Submitted!
          </h2>
          <p style={{ color: "#6b7280", marginBottom: "32px" }}>
            {answeredCount} of {questions.length} questions attempted
          </p>

          {questions.map((q, i) => (
            <div
              key={i}
              style={{
                textAlign: "left",
                padding: "16px",
                borderRadius: "12px",
                marginBottom: "12px",
                background: answers[i]?.trim() ? "#f0fdf4" : "#fef2f2",
                borderLeft: `4px solid ${answers[i]?.trim() ? "#22c55e" : "#ef4444"}`,
              }}
            >
              <p
                style={{
                  margin: "0 0 6px",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "#374151",
                }}
              >
                {answers[i]?.trim() ? "✅" : "❌"} {q.title}
              </p>
              {answers[i]?.trim() && (
                <pre
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    color: "#374151",
                    background: "#f8fafc",
                    padding: "8px",
                    borderRadius: "6px",
                    overflow: "auto",
                    fontFamily: "monospace",
                  }}
                >
                  {answers[i].trim().slice(0, 100)}
                  {answers[i].length > 100 ? "..." : ""}
                </pre>
              )}
            </div>
          ))}

          <button
            onClick={() => {
              setAnswers({});
              setSubmitted(false);
              setCurrentIndex(0);
            }}
            style={{
              width: "100%",
              marginTop: "8px",
              padding: "14px",
              background: "linear-gradient(135deg, #6366f1, #4f46e5)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Try Again 🔄
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
        padding: "40px 20px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1
            style={{
              color: "white",
              fontSize: "32px",
              fontWeight: "700",
              margin: "0 0 8px",
            }}
          >
            Coding Practice
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "15px",
              margin: 0,
            }}
          >
            {answeredCount} of {questions.length} attempted
          </p>
        </div>

        {/* Progress Bar */}
        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            borderRadius: "999px",
            height: "6px",
            marginBottom: "24px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "linear-gradient(90deg, #6366f1, #a855f7)",
              borderRadius: "999px",
              transition: "width 0.4s ease",
            }}
          />
        </div>

        {/* Question Pills */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          {questions.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentIndex(i)}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background:
                  i === currentIndex
                    ? "white"
                    : answers[i]?.trim()
                      ? "rgba(255,255,255,0.4)"
                      : "rgba(255,255,255,0.1)",
                color: i === currentIndex ? "#4f46e5" : "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Main Card */}
        <div
          style={{
            background: "#1e293b",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            marginBottom: "20px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Card Header */}
          <div
            style={{
              padding: "24px 28px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  background: "linear-gradient(135deg, #6366f1, #a855f7)",
                  color: "white",
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  fontSize: "15px",
                  flexShrink: 0,
                }}
              >
                {currentIndex + 1}
              </div>
              <h2
                style={{
                  color: "white",
                  fontSize: "20px",
                  fontWeight: "700",
                  margin: 0,
                }}
              >
                {q.title}
              </h2>
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: "600",
                  background: tagColors[q.tag].bg,
                  color: tagColors[q.tag].color,
                  marginLeft: "auto",
                }}
              >
                {q.tag}
              </span>
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                margin: "0 0 8px",
                fontSize: "15px",
              }}
            >
              {q.description}
            </p>
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: "8px",
                padding: "10px 14px",
                fontFamily: "monospace",
                fontSize: "13px",
                color: "#94a3b8",
              }}
            >
              {q.example}
            </div>
          </div>

          {/* Code Editor Area */}
          <div style={{ padding: "0" }}>
            {/* Fake editor top bar */}
            <div
              style={{
                padding: "10px 16px",
                background: "#0f172a",
                display: "flex",
                gap: "6px",
                alignItems: "center",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#ef4444",
                }}
              />
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#f59e0b",
                }}
              />
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#22c55e",
                }}
              />
              <span
                style={{
                  color: "#64748b",
                  fontSize: "12px",
                  marginLeft: "8px",
                }}
              >
                solution.js
              </span>
            </div>

            <textarea
              placeholder={`// Write your solution here...\nfunction solution() {\n  \n}`}
              value={answers[currentIndex] || ""}
              onChange={(e) =>
                setAnswers({ ...answers, [currentIndex]: e.target.value })
              }
              style={{
                width: "100%",
                height: "220px",
                padding: "20px",
                background: "#0f172a",
                color: "#e2e8f0",
                border: "none",
                fontSize: "14px",
                fontFamily: "'Courier New', monospace",
                resize: "vertical",
                outline: "none",
                lineHeight: "1.7",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Buttons */}

          <button
            onClick={runCode}
            style={{
              width: "100%",
              marginBottom: "10px",
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              color: "white",
              fontSize: "15px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Run Code ▶️
          </button>

          {runResult && (
            <div
              style={{
                background: "#0f172a",
                color: "white",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px",
                fontSize: "14px",
              }}
            >
              ✅ Passed: {runResult.passed} / {runResult.total}
            </div>
          )}

          <div
            style={{
              padding: "16px 24px",
              background: "#1e293b",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              gap: "12px",
            }}
          >
            <button
              onClick={() => setCurrentIndex((p) => p - 1)}
              disabled={currentIndex === 0}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "transparent",
                color: currentIndex === 0 ? "rgba(255,255,255,0.2)" : "white",
                fontSize: "15px",
                fontWeight: "600",
                cursor: currentIndex === 0 ? "not-allowed" : "pointer",
              }}
            >
              ← Previous
            </button>

            {isLast ? (
              <button
                onClick={() => setSubmitted(true)}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "10px",
                  border: "none",
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Submit Code 🚀
              </button>
            ) : (
              <button
                onClick={() => setCurrentIndex((p) => p + 1)}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "10px",
                  border: "none",
                  background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Next →
              </button>
            )}
          </div>
        </div>

        <p
          style={{
            textAlign: "center",
            color: "rgba(255,255,255,0.3)",
            fontSize: "13px",
          }}
        >
          Click any number above to jump to that question
        </p>
      </div>
    </div>
  );
};

export default Coding;
