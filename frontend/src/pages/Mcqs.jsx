import React, { useState } from "react";

const Mcqs = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      question: "Which is not a JavaScript datatype?",
      options: ["String", "Boolean", "Float", "Undefined"],
      correct: "Float",
    },
    {
      question: "Which method adds element to array?",
      options: ["push()", "pop()", "shift()", "filter()"],
      correct: "push()",
    },
    {
      question: "Which keyword declares a constant?",
      options: ["let", "var", "const", "define"],
      correct: "const",
    },
  ];

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correct) correct++;
    });
    const finalScore = Math.round((correct / questions.length) * 100);
    setScore(finalScore);
    setSubmitted(true);
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;
  const isLast = currentIndex === questions.length - 1;

  if (submitted) {
    const correct = questions.filter((q, i) => answers[i] === q.correct).length;
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
            maxWidth: "480px",
            width: "100%",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          }}
        >
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>
            {score >= 80 ? "🏆" : score >= 50 ? "👍" : "💪"}
          </div>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#1f2937",
              margin: "0 0 8px",
            }}
          >
            Quiz Complete!
          </h2>
          <p style={{ color: "#6b7280", margin: "0 0 32px" }}>
            {correct} out of {questions.length} correct
          </p>

          <div
            style={{
              fontSize: "72px",
              fontWeight: "800",
              color:
                score >= 80 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444",
              lineHeight: 1,
              marginBottom: "8px",
            }}
          >
            {score}%
          </div>

          <p style={{ color: "#6b7280", marginBottom: "32px" }}>
            {score >= 80
              ? "Excellent work! Keep it up!"
              : score >= 50
                ? "Good effort! Review and retry."
                : "Keep practicing, you'll get there!"}
          </p>

          {/* Review */}
          <div style={{ textAlign: "left", marginBottom: "32px" }}>
            {questions.map((q, i) => (
              <div
                key={i}
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                  background: answers[i] === q.correct ? "#f0fdf4" : "#fef2f2",
                  borderLeft: `4px solid ${answers[i] === q.correct ? "#22c55e" : "#ef4444"}`,
                }}
              >
                <p
                  style={{
                    margin: "0 0 4px",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  {q.question}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    color: answers[i] === q.correct ? "#16a34a" : "#dc2626",
                  }}
                >
                  {answers[i] === q.correct
                    ? `✅ ${answers[i]}`
                    : `❌ Your: ${answers[i] || "No answer"} → Correct: ${q.correct}`}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              setAnswers({});
              setScore(null);
              setSubmitted(false);
              setCurrentIndex(0);
            }}
            style={{
              width: "100%",
              padding: "14px",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
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

  const q = questions[currentIndex];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "40px 20px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
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
            MCQ Practice
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "15px",
              margin: 0,
            }}
          >
            {answeredCount} of {questions.length} answered
          </p>
        </div>

        {/* Progress Bar */}
        <div
          style={{
            background: "rgba(255,255,255,0.2)",
            borderRadius: "999px",
            height: "8px",
            marginBottom: "24px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "white",
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
                    : answers[i]
                      ? "rgba(255,255,255,0.5)"
                      : "rgba(255,255,255,0.2)",
                color: i === currentIndex ? "#667eea" : "white",
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

        {/* Question Card */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                color: "white",
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "16px",
                flexShrink: 0,
              }}
            >
              {currentIndex + 1}
            </div>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#1f2937",
                margin: 0,
                lineHeight: "1.5",
              }}
            >
              {q.question}
            </p>
          </div>

          {/* Options */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {q.options.map((opt, i) => {
              const selected = answers[currentIndex] === opt;
              return (
                <div
                  key={i}
                  onClick={() =>
                    setAnswers({ ...answers, [currentIndex]: opt })
                  }
                  style={{
                    padding: "14px 18px",
                    borderRadius: "12px",
                    border: `2px solid ${selected ? "#667eea" : "#e5e7eb"}`,
                    background: selected ? "#f0f0ff" : "white",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    transition: "all 0.2s",
                  }}
                >
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      border: `2px solid ${selected ? "#667eea" : "#d1d5db"}`,
                      background: selected ? "#667eea" : "white",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {selected && (
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "white",
                        }}
                      />
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: "15px",
                      color: selected ? "#667eea" : "#374151",
                      fontWeight: selected ? "600" : "400",
                    }}
                  >
                    {opt}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
            <button
              onClick={() => setCurrentIndex((p) => p - 1)}
              disabled={currentIndex === 0}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "10px",
                border: "2px solid #e5e7eb",
                background: "white",
                color: currentIndex === 0 ? "#ccc" : "#374151",
                fontSize: "15px",
                fontWeight: "600",
                cursor: currentIndex === 0 ? "not-allowed" : "pointer",
              }}
            >
              ← Previous
            </button>

            {isLast ? (
              <button
                onClick={handleSubmit}
                disabled={answeredCount < questions.length}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "10px",
                  border: "none",
                  background:
                    answeredCount < questions.length
                      ? "#ccc"
                      : "linear-gradient(135deg, #22c55e, #16a34a)",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "700",
                  cursor:
                    answeredCount < questions.length
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                Submit 🚀
              </button>
            ) : (
              <button
                onClick={() => setCurrentIndex((p) => p + 1)}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "10px",
                  border: "none",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
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
            color: "rgba(255,255,255,0.6)",
            fontSize: "13px",
          }}
        >
          Click any number above to jump to that question
        </p>
      </div>
    </div>
  );
};

export default Mcqs;
