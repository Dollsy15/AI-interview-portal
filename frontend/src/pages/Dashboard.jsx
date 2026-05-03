import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const userRes = await axios.get("http://localhost:5000/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(userRes.data);

        const questionsRes = await axios.get(
          "http://localhost:5000/api/questions",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setQuestions(questionsRes.data.questions || questionsRes.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError(err.response?.data?.message || "Failed to load dashboard");
        }
      }
    };

    fetchDashboard();
  }, [navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/interview/history")
      .then((res) => setHistory(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleStartInterview = () => {
    navigate("/interview");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const submitAnswers = async () => {
    try {
      const token = localStorage.getItem("token");

      const formattedAnswers = {};

      questions.forEach((q) => {
        const key = q._id || q.id;
        formattedAnswers[key] = answers[key] || "";
      });

      const res = await axios.post(
        "http://localhost:5000/api/submit-answers",
        { answers: formattedAnswers },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      alert(`Your Score: ${res.data.score}`);
      window.location.reload();
    } catch (err) {
      alert("Error submitting answers");
    }
  };

  if (error) return <h3 style={{ color: "red" }}>{error}</h3>;
  if (!userData) return <h3>Loading user info...</h3>;

  const userName =
    userData.user?.name || userData.user?.email?.split("@")[0] || "User";

  // 🔥 NEW ANALYTICS
  const total = history.length;

  const avgScore =
    total > 0
      ? Math.round(history.reduce((acc, cur) => acc + cur.score, 0) / total)
      : 0;

  const bestScore =
    total > 0 ? Math.max(...history.map((item) => item.score)) : 0;

  const chartData = history.map((item, index) => ({
    name: `Attempt ${index + 1}`,
    score: item.score,
  }));

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(120deg, #f5f7fa, #e4e9f7)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px 50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#ffffff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ color: "#4a6cf7" }}>AI Interview Portal</h2>

        <button
          onClick={handleLogout}
          style={{
            padding: "10px 18px",
            background: "#ff4d4f",
            border: "none",
            borderRadius: "6px",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Section */}
      <div
        style={{
          flex: 1,
          padding: "60px 80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ maxWidth: "550px" }}>
          <h1 style={{ fontSize: "40px", marginBottom: "15px" }}>
            Welcome back, <span style={{ color: "#4a6cf7" }}>{userName}!</span>
          </h1>

          <p style={{ fontSize: "18px", color: "#555" }}>
            Continue your AI-powered interview preparation and improve your
            confidence with real-world questions.
          </p>

          <div
            style={{
              marginTop: "25px",
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={handleStartInterview}
              style={{
                padding: "14px 30px",
                background: "#4a6cf7",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",
                boxShadow: "0 8px 20px rgba(74,108,247,0.3)",
              }}
            >
              Start Interview
            </button>

            <button
              onClick={() => navigate("/coding")}
              style={{
                padding: "14px 30px",
                background: "#4a6cf7",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",
                boxShadow: "0 8px 20px rgba(74,108,247,0.3)",
              }}
            >
              Coding Practice
            </button>

            <button
              onClick={() => navigate("/mcqs")}
              style={{
                padding: "14px 30px",
                background: "#4a6cf7",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",
                boxShadow: "0 8px 20px rgba(74,108,247,0.3)",
              }}
            >
              MCQ Practice
            </button>

            <button
              onClick={() => navigate("/upload-resume")}
              style={{
                padding: "14px 30px",
                background: "#4a6cf7",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",
                boxShadow: "0 8px 20px rgba(74,108,247,0.3)",
              }}
            >
              Upload Resume
            </button>
          </div>
        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
          alt="AI Bot"
          style={{
            width: "260px",
            animation: "float 3s ease-in-out infinite",
          }}
        />
      </div>

      {/* Questions Section */}
      <div style={{ padding: "40px 80px" }}>
        <h2 style={{ marginBottom: "25px" }}>Practice Questions</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {questions.length === 0 ? (
            <p>No questions available.</p>
          ) : (
            questions.map((q) => (
              <div
                key={q._id || q.id}
                style={{
                  background: "#ffffff",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                }}
              >
                <p style={{ fontWeight: "600", marginBottom: "10px" }}>
                  {q.question}
                </p>

                <textarea
                  placeholder="Write your answer here..."
                  value={answers[q._id || q.id] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [q._id || q.id]: e.target.value,
                    }))
                  }
                  style={{
                    width: "100%",
                    minHeight: "100px",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    resize: "vertical",
                  }}
                />
              </div>
            ))
          )}
        </div>

        {questions.length > 0 && (
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <button
              onClick={submitAnswers}
              style={{
                padding: "14px 30px",
                background: "#4a6cf7",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Submit Answers
            </button>
          </div>
        )}
      </div>

      {/* 🔥 Analytics Section */}
      <div style={{ padding: "40px 80px", display: "flex", gap: "20px" }}>
        <div
          style={{
            flex: 1,
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Total Interviews</h3>
          <p style={{ fontSize: "22px" }}>{total}</p>
        </div>

        <div
          style={{
            flex: 1,
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Average Score</h3>
          <p style={{ fontSize: "22px" }}>{avgScore}%</p>
        </div>

        <div
          style={{
            flex: 1,
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Best Score</h3>
          <p style={{ fontSize: "22px" }}>{bestScore}%</p>
        </div>
      </div>

      {/* 👇 ADD GRAPH HERE */}
      <div style={{ padding: "40px 80px" }}>
        <h2 style={{ marginBottom: "20px" }}>Performance Graph</h2>

        {chartData.length === 0 ? (
          <p>No data available</p>
        ) : (
          <LineChart width={600} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#4a6cf7" />
          </LineChart>
        )}
      </div>

      {/* 🔥 Interview History */}
      <div style={{ padding: "40px 80px" }}>
        <h2>Previous Interviews</h2>

        {history.length === 0 ? (
          <p>No interviews yet</p>
        ) : (
          history.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px",
                background: "#fff",
              }}
            >
              <p>
                <b>Score:</b> {item.score}%
              </p>
              <p>
                <b>Date:</b> {new Date(item.createdAt).toLocaleString()}
              </p>

              <button
                onClick={() =>
                  navigate("/result", {
                    state: {
                      score: item.score,
                      questions: item.questions,
                      answers: item.answers,
                      feedback: "Review your answers and improve.",
                    },
                  })
                }
                style={{
                  marginTop: "10px",
                  padding: "8px 15px",
                  background: "#4a6cf7",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                View Result
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <footer
        style={{
          background: "#111",
          color: "#fff",
          padding: "25px",
          textAlign: "center",
          marginTop: "auto",
        }}
      >
        <p>© 2026 AI Interview Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
