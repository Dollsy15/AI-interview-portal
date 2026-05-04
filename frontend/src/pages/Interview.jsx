import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Interview = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/questions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.questions || res.data || [];
        setQuestions(data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };
    fetchQuestions();
  }, []);

  const handleChange = (index, value) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1)
      setCurrentIndex((prev) => prev + 1);
  };

  const prevQuestion = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const submitInterview = async () => {
    try {
      const token = localStorage.getItem("token");
      const finalAnswers = questions.map((q, index) => ({
        questionId: q._id,
        answer: answers[index] || "",
      }));

      const res = await axios.post(
        "http://localhost:5000/api/interview/submit",
        { answers: finalAnswers, questions: questions },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const result = res.data.data;

      navigate("/result", {
        state: {
          score: result.score,
          feedback: "Good attempt! Improve clarity and depth.",
          questions: questions.map((q) => q.question),
          answers: questions.map((q, index) => answers[index] || ""),
        },
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Check console for error");
    }
  };

  if (!questions || questions.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", color: "white" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>⏳</div>
          <h2 style={{ fontSize: "24px", fontWeight: "600" }}>
            Loading questions...
          </h2>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const answeredCount = Object.values(answers).filter(
    (a) => a.trim() !== "",
  ).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "40px 20px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
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
            AI Interview
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
            flexWrap: "wrap",
            marginBottom: "24px",
            justifyContent: "center",
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

        {/* Main Card */}
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
              marginBottom: "24px",
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
              {currentQuestion?.question}
            </p>
          </div>

          <textarea
            placeholder="Type your answer here..."
            value={answers[currentIndex] || ""}
            onChange={(e) => handleChange(currentIndex, e.target.value)}
            style={{
              width: "100%",
              height: "160px",
              padding: "16px",
              borderRadius: "12px",
              border: "2px solid #e5e7eb",
              fontSize: "15px",
              fontFamily: "sans-serif",
              resize: "vertical",
              outline: "none",
              color: "#374151",
              lineHeight: "1.6",
              boxSizing: "border-box",
              transition: "border 0.2s",
            }}
            onFocus={(e) => (e.target.style.border = "2px solid #667eea")}
            onBlur={(e) => (e.target.style.border = "2px solid #e5e7eb")}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "24px",
              gap: "12px",
            }}
          >
            <button
              onClick={prevQuestion}
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

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={nextQuestion}
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
            ) : (
              <button
                onClick={submitInterview}
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
                Submit Interview 🚀
              </button>
            )}
          </div>
        </div>

        {/* Bottom hint */}
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

export default Interview;
