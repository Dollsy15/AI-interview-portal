import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Interview = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  // ================= FETCH QUESTIONS =================
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

  // ================= HANDLE CHANGE =================
  const handleChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  // ================= NAVIGATION =================
  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // ================= SUBMIT =================
  const submitInterview = async () => {
    try {
      const token = localStorage.getItem("token");

      const formattedAnswers = {};
      questions.forEach((q, index) => {
        if (q._id) {
          formattedAnswers[q._id] = answers[index] || "";
        }
      });

      const res = await axios.post(
        "http://localhost:5000/api/submit-answers",
        { answers: formattedAnswers },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      alert(`Score: ${res.data.score}\n\nFeedback:\n${res.data.feedback}`);
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error submitting interview");
    }
  };

  if (!questions || questions.length === 0) {
    return <h2 style={{ padding: "40px" }}>Loading questions...</h2>;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>
        Question {currentIndex + 1} of {questions.length}
      </h2>

      <p style={{ fontSize: "18px", margin: "20px 0", fontWeight: "500" }}>
        {currentQuestion?.question}
      </p>

      <textarea
        placeholder="Type your answer here..."
        value={answers[currentIndex] || ""}
        onChange={(e) => handleChange(currentIndex, e.target.value)}
        style={{
          width: "100%",
          height: "150px",
          padding: "15px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={prevQuestion}
          disabled={currentIndex === 0}
          style={{
            padding: "10px 20px",
            cursor: currentIndex === 0 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>

        <button
          onClick={nextQuestion}
          disabled={currentIndex === questions.length - 1}
          style={{
            padding: "10px 20px",
            cursor:
              currentIndex === questions.length - 1 ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>

      {currentIndex === questions.length - 1 && (
        <button
          onClick={submitInterview}
          style={{
            marginTop: "30px",
            padding: "12px 25px",
            background: "#4a6cf7",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            width: "100%",
            fontSize: "16px",
          }}
        >
          Submit Interview
        </button>
      )}
    </div>
  );
};

export default Interview;
