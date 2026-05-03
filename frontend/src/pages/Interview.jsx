import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Interview = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  // Fetch questions
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

  // Handle answer change
  const handleChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  // Navigation
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

  // Submit interview
  const submitInterview = async () => {
    try {
      const token = localStorage.getItem("token");

      const finalAnswers = questions.map((q, index) => ({
        questionId: q._id,
        answer: answers[index] || "",
      }));

      const res = await axios.post(
        "http://localhost:5000/api/interview/submit",
        { answers: finalAnswers },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // FIX: correct response handling
      const result = res.data.data;

      // extract questions text
      const questionList = questions.map((q) => q.question);

      // extract answers in order
      const answerList = questions.map((q, index) => answers[index] || "");

      navigate("/result", {
        state: {
          score: result.score,
          feedback: "Good attempt! Improve clarity and depth.", // temp
          questions: questionList,
          answers: answerList,
        },
      });

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

  // Loading state
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
