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

        setQuestions(res.data.questions || res.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };

    fetchQuestions();
  }, []);

  const handleChange = (e) => {
    const currentQuestionId = questions[currentIndex]._id;

    setAnswers({
      ...answers,
      [currentQuestionId]: e.target.value,
    });
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const submitInterview = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/submit-answers",
        { answers },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      alert(`Score: ${res.data.score}\n\nFeedback:\n${res.data.feedback}`);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error submitting interview");
    }
  };

  if (questions.length === 0) return <h2>Loading questions...</h2>;

  const currentQuestion = questions[currentIndex];
  const currentQuestionId = currentQuestion._id;

  return (
    <div style={{ padding: "40px" }}>
      {" "}
      <h2>
        Question {currentIndex + 1} of {questions.length}{" "}
      </h2>
      <p style={{ fontSize: "18px", margin: "20px 0" }}>
        {currentQuestion.question}
      </p>
      <textarea
        placeholder="Type your answer..."
        value={answers[currentQuestionId] || ""}
        onChange={handleChange}
        style={{
          width: "100%",
          height: "120px",
          padding: "10px",
          borderRadius: "8px",
        }}
      />
      <div style={{ marginTop: "20px" }}>
        <button onClick={prevQuestion} disabled={currentIndex === 0}>
          Previous
        </button>

        <button
          onClick={nextQuestion}
          disabled={currentIndex === questions.length - 1}
          style={{ marginLeft: "10px" }}
        >
          Next
        </button>
      </div>
      {currentIndex === questions.length - 1 && (
        <button
          onClick={submitInterview}
          style={{
            marginTop: "30px",
            padding: "10px 20px",
            background: "#4a6cf7",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Submit Interview
        </button>
      )}
    </div>
  );
};

export default Interview;
