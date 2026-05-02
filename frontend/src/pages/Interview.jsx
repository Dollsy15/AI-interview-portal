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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data.questions || res.data || [];
        setQuestions(data);
      } catch (err) {
        console.log("FETCH ERROR:", err.response?.data || err.message);
      }
    };

    fetchQuestions();
  }, []);

  // ================= HANDLE ANSWER =================
  const handleChange = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: value,
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

  // ================= SUBMIT INTERVIEW =================
  const submitInterview = async () => {
    try {
      const token = localStorage.getItem("token");

      // format answers properly
      const formattedAnswers = {};

      questions.forEach((q, index) => {
        formattedAnswers[q._id] = answers[index] || "";
      });

      const res = await axios.post(
        "http://localhost:5000/api/submit-answers",
        { answers: formattedAnswers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      navigate("/result", {
        state: {
          score: res.data.score,
          feedback: res.data.feedback,
        },
      });
    } catch (err) {
      console.log("SUBMIT ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error submitting interview");
    }
  };

  // ================= LOADING =================
  if (!questions.length) {
    return <h2 style={{ padding: "40px" }}>Loading questions...</h2>;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h2>
        Question {currentIndex + 1} of {questions.length}
      </h2>

      <p style={{ fontSize: "18px", margin: "20px 0" }}>
        {currentQuestion.question}
      </p>

      <textarea
        value={answers[currentIndex] || ""}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Type your answer..."
        style={{
          width: "100%",
          height: "150px",
          padding: "10px",
          fontSize: "16px",
        }}
      />

      {/* NAVIGATION BUTTONS */}
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

      {/* SUBMIT BUTTON */}
      {currentIndex === questions.length - 1 && (
        <button
          onClick={submitInterview}
          style={{
            marginTop: "30px",
            padding: "10px 20px",
            background: "green",
            color: "white",
            border: "none",
          }}
        >
          Submit Interview
        </button>
      )}
    </div>
  );
};

export default Interview;
