import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [hoveredCard, setHoveredCard] = useState(null);

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

      toast.success(`Your Score: ${res.data.score}`);
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      toast.error("Error submitting answers");
    }
  };

  if (error) return <h3 style={s.error}>{error}</h3>;
  if (!userData) return (
    <div style={s.mainContainer}>
      <div style={s.skeletonHeader}></div>
      <div style={s.skeletonHero}></div>
      <div style={s.statsContainer}>
        {[1, 2, 3, 4].map(i => <div key={i} style={s.skeletonCard}></div>)}
      </div>
    </div>
  );

  const userName =
    userData.user?.name || userData.user?.email?.split("@")[0] || "User";

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

  const stats = [
    {
      label: "Total Interviews",
      value: total,
      icon: "🎯",
      color: "#667eea",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      label: "Average Score",
      value: `${avgScore}%`,
      icon: "📊",
      color: "#764ba2",
      gradient: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
    },
    {
      label: "Best Score",
      value: `${bestScore}%`,
      icon: "🏆",
      color: "#667eea",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      label: "Total Questions",
      value: questions.length,
      icon: "❓",
      color: "#764ba2",
      gradient: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
    },
  ];

  const menuItems = [
    { label: "Start Interview", icon: "🎤", action: handleStartInterview },
    { label: "Coding", icon: "💻", action: () => navigate("/coding") },
    { label: "MCQs", icon: "📝", action: () => navigate("/mcqs") },
    { label: "Resume", icon: "📄", action: () => navigate("/upload-resume") },
  ];

  return (
    <div style={s.mainContainer}>
      {/* Animated Background */}
      <div style={s.bgGradient}></div>
      <div style={s.floatingOrb}></div>
      <div style={s.floatingOrb2}></div>
      <div style={s.floatingOrb3}></div>

      {/* Gradient Overlay for Cards */}
      <div style={s.gradientOverlay}></div>

      {/* Header */}
      <header style={s.header}>
        <div style={s.headerContent}>
          <div style={s.logo}>
            <div style={s.logoIcon}>🚀</div>
            <div>
              <h1 style={s.logoText}>Interview Portal</h1>
              <p style={s.logoSubtext}>Master Your Skills</p>
            </div>
          </div>

          <button onClick={handleLogout} style={s.logoutBtn}>
            <span style={{ fontSize: "18px" }}>↗</span>
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={s.heroSection}>
        <div style={s.heroContent}>
          <div style={s.heroText}>
            <div style={s.badgeContainer}>
              <span style={s.badge}>✨ Welcome Back</span>
            </div>
            <h2 style={s.heroTitle}>
              Hey, <span style={s.heroHighlight}>{userName}</span>! 👋
            </h2>
            <p style={s.heroSubtitle}>
              You're on the path to mastery. Keep pushing, keep learning, and
              watch yourself become unstoppable.
            </p>

            {/* Quick Menu with Hover Effects */}
            <div style={s.quickMenuGrid}>
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  style={{
                    ...s.quickMenuBtn,
                    animationDelay: `${index * 0.1}s`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 40px rgba(102, 126, 234, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 30px rgba(0,0,0,0.1)";
                  }}
                  onClick={item.action}
                >
                  <span style={s.quickMenuIcon}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div style={s.heroImage}>
            <div style={s.floatingCard}>
              <div style={s.cardGlow}></div>
              <div style={s.cardContent}>
                <div style={s.cardValue}>{total}</div>
                <div style={s.cardLabel}>Interviews Completed</div>
                <div style={s.cardProgress}>
                  <div
                    style={{
                      ...s.progressBar,
                      width: `${Math.min((total / 10) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid with Enhanced Cards */}
      <section style={s.statsSection}>
        <h3 style={s.sectionHeading}>Your Performance</h3>
        <div style={s.statsContainer}>
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                ...s.statCard,
                animationDelay: `${index * 0.1}s`,
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={s.statCardGlow}></div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    ...s.statIcon,
                    background: stat.gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "36px",
                  }}
                >
                  {stat.icon}
                </div>
                <div style={s.statLabel}>{stat.label}</div>
                <div style={{ ...s.statValue, color: stat.color }}>
                  {stat.value}
                </div>
              </div>
              {hoveredCard === index && <div style={s.statHoverGlow}></div>}
            </div>
          ))}
        </div>
      </section>

      {/* Tabs Section - Ultra Enhanced */}
      <section style={s.tabsSection}>
        <div style={s.tabsContainer}>
          <div style={s.tabButtons}>
            {[
              { id: "overview", label: "Overview", icon: "📊" },
              { id: "practice", label: "Practice", icon: "📝" },
              { id: "history", label: "History", icon: "⏳" },
            ].map((tab) => (
              <button
                key={tab.id}
                style={{
                  ...s.tabBtn,
                  ...(activeTab === tab.id ? s.tabBtnActive : {}),
                }}
                onClick={() => setActiveTab(tab.id)}
              >
                <span style={s.tabIcon}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={s.tabContent}>
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div style={s.tabPane}>
                <div style={s.tabPaneHeader}>
                  <h3 style={s.tabTitle}>📈 Performance Analytics</h3>
                  <p style={s.tabSubtitle}>
                    Track your improvement across all interviews
                  </p>
                </div>

                {chartData.length === 0 ? (
                  <div style={s.emptyState}>
                    <div style={s.emptyIcon}>📈</div>
                    <p style={s.emptyText}>
                      Start your first interview to see analytics
                    </p>
                  </div>
                ) : (
                  <div style={s.chartContainer}>
                    <ResponsiveContainer width="100%" height={380}>
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient
                            id="colorScore"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#667eea"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#667eea"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#e5e7eb"
                          opacity={0.5}
                        />
                        <XAxis dataKey="name" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip
                          contentStyle={{
                            ...s.tooltipStyle,
                            boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
                          }}
                          cursor={{ stroke: "#667eea", strokeWidth: 3 }}
                        />
                        <Area
                          type="monotone"
                          dataKey="score"
                          stroke="#667eea"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#colorScore)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            )}

            {/* Practice Tab */}
            {activeTab === "practice" && (
              <div style={s.tabPane}>
                <div style={s.tabPaneHeader}>
                  <h3 style={s.tabTitle}>📝 Practice Questions</h3>
                  <p style={s.tabSubtitle}>
                    {questions.length} questions available
                  </p>
                </div>

                {questions.length === 0 ? (
                  <div style={s.emptyState}>
                    <div style={s.emptyIcon}>❌</div>
                    <p style={s.emptyText}>No questions available yet</p>
                  </div>
                ) : (
                  <>
                    <div style={s.questionsGrid}>
                      {questions.map((q, idx) => (
                        <div
                          key={q._id || q.id}
                          style={s.questionCard}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                              "translateY(-8px)";
                            e.currentTarget.style.boxShadow =
                              "0 20px 50px rgba(102, 126, 234, 0.2)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                              "0 10px 30px rgba(0,0,0,0.08)";
                          }}
                        >
                          <div style={s.questionNumber}>{idx + 1}</div>
                          <p style={s.questionText}>{q.question}</p>
                          <textarea
                            placeholder="Write your answer here..."
                            value={answers[q._id || q.id] || ""}
                            onChange={(e) =>
                              setAnswers((prev) => ({
                                ...prev,
                                [q._id || q.id]: e.target.value,
                              }))
                            }
                            style={s.questionTextarea}
                          />
                        </div>
                      ))}
                    </div>

                    <div style={s.submitBtnContainer}>
                      <button onClick={submitAnswers} style={s.submitBtn}>
                        ✨ Submit All Answers
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* History Tab */}
            {activeTab === "history" && (
              <div style={s.tabPane}>
                <div style={s.tabPaneHeader}>
                  <h3 style={s.tabTitle}>⏳ Interview History</h3>
                  <p style={s.tabSubtitle}>
                    {history.length} interviews completed
                  </p>
                </div>

                {history.length === 0 ? (
                  <div style={s.emptyState}>
                    <div style={s.emptyIcon}>🕐</div>
                    <p style={s.emptyText}>
                      No interviews yet. Start your first one!
                    </p>
                  </div>
                ) : (
                  <div style={s.historyList}>
                    {history.map((item, index) => (
                      <div
                        key={index}
                        style={s.historyCard}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateX(8px)";
                          e.currentTarget.style.boxShadow =
                            "0 15px 40px rgba(102, 126, 234, 0.15)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateX(0)";
                          e.currentTarget.style.boxShadow =
                            "0 5px 20px rgba(0,0,0,0.05)";
                        }}
                      >
                        <div style={s.historyHeader}>
                          <div style={s.historyInfo}>
                            <div style={s.historyNumber}>
                              #{index + 1} Attempt
                            </div>
                            <p style={s.historyDate}>
                              {new Date(item.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <div style={s.historyRight}>
                            <div
                              style={{
                                ...s.scoreBadge,
                                background:
                                  item.score >= 80
                                    ? "linear-gradient(135deg, #10b981, #059669)"
                                    : item.score >= 60
                                      ? "linear-gradient(135deg, #f59e0b, #d97706)"
                                      : "linear-gradient(135deg, #ef4444, #dc2626)",
                              }}
                            >
                              {item.score}%
                            </div>
                            <button
                              onClick={() =>
                                navigate("/result", {
                                  state: {
                                    score: item.score,
                                    questions: item.questions,
                                    answers: item.answers,
                                    feedback: "Review your performance.",
                                  },
                                })
                              }
                              style={s.viewResultBtn}
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={s.footer}>
        <p style={s.footerText}>
          ✨ © 2026 AI Interview Portal | Master Interviews with Intelligence
        </p>
      </footer>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes floatOrb {
          0% { transform: translate(0, 0); }
          50% { transform: translate(40px, -40px); }
          100% { transform: translate(0, 0); }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);
          }
          50% {
            box-shadow: 0 0 40px rgba(102, 126, 234, 0.7);
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// ===================== STYLES =====================
const s = {
  mainContainer: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    fontFamily: "sans-serif",
    color: "#1a1a2e",
    overflow: "hidden",
    position: "relative",
  },

  bgGradient: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    zIndex: -3,
  },

  floatingOrb: {
    position: "fixed",
    width: "500px",
    height: "500px",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
    borderRadius: "50%",
    top: "-150px",
    right: "-100px",
    zIndex: -2,
    animation: "floatOrb 25s ease-in-out infinite",
  },

  floatingOrb2: {
    position: "fixed",
    width: "400px",
    height: "400px",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
    borderRadius: "50%",
    bottom: "-100px",
    left: "-100px",
    zIndex: -2,
    animation: "floatOrb 30s ease-in-out infinite reverse",
  },

  floatingOrb3: {
    position: "fixed",
    width: "300px",
    height: "300px",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
    borderRadius: "50%",
    top: "50%",
    left: "10%",
    zIndex: -2,
    animation: "floatOrb 35s ease-in-out infinite",
  },

  gradientOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 100%)",
    zIndex: -1,
  },

  // Header
  header: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(15px)",
    borderBottom: "1px solid rgba(255,255,255,0.15)",
    padding: "20px 0",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },

  headerContent: {
    maxWidth: "1300px",
    margin: "0 auto",
    padding: "0 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  logoIcon: {
    fontSize: "32px",
    animation: "float 3s ease-in-out infinite",
  },

  logoText: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "800",
    color: "white",
  },

  logoSubtext: {
    margin: "4px 0 0",
    fontSize: "12px",
    color: "rgba(255,255,255,0.7)",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },

  logoutBtn: {
    padding: "12px 24px",
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: "10px",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
  },

  // Hero Section
  heroSection: {
    maxWidth: "1300px",
    margin: "0 auto",
    padding: "60px 40px",
    position: "relative",
    zIndex: 1,
  },

  heroContent: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "80px",
    alignItems: "center",
  },

  heroText: {
    color: "white",
  },

  badgeContainer: {
    marginBottom: "20px",
  },

  badge: {
    display: "inline-block",
    padding: "8px 16px",
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
    color: "rgba(255,255,255,0.9)",
    animation: "slideInUp 0.6s ease-out",
  },

  heroTitle: {
    fontSize: "48px",
    fontWeight: "800",
    margin: "0 0 20px",
    lineHeight: "1.2",
    animation: "slideInUp 0.7s ease-out 0.1s both",
  },

  heroHighlight: {
    background: "rgba(255,255,255,0.95)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  heroSubtitle: {
    fontSize: "18px",
    color: "rgba(255,255,255,0.85)",
    lineHeight: "1.6",
    margin: "0 0 40px",
    animation: "slideInUp 0.7s ease-out 0.2s both",
  },

  quickMenuGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
  },

  quickMenuBtn: {
    padding: "18px 20px",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "14px",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    animation: "slideInUp 0.6s ease-out both",
  },

  quickMenuIcon: {
    fontSize: "24px",
    display: "block",
  },

  heroImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  floatingCard: {
    width: "300px",
    height: "300px",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: "24px",
    padding: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "float 4s ease-in-out infinite",
    position: "relative",
    overflow: "hidden",
  },

  cardGlow: {
    position: "absolute",
    width: "200px",
    height: "200px",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
    borderRadius: "50%",
    animation: "pulse 4s ease-in-out infinite",
  },

  cardContent: {
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },

  cardValue: {
    fontSize: "64px",
    fontWeight: "800",
    color: "white",
    margin: 0,
    lineHeight: 1,
  },

  cardLabel: {
    fontSize: "15px",
    color: "rgba(255,255,255,0.8)",
    margin: "16px 0 0",
    fontWeight: "500",
  },

  cardProgress: {
    width: "80px",
    height: "4px",
    background: "rgba(255,255,255,0.2)",
    borderRadius: "2px",
    margin: "16px auto 0",
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    background: "rgba(255,255,255,0.8)",
    borderRadius: "2px",
    transition: "width 1s ease",
  },

  // Stats Section
  statsSection: {
    maxWidth: "1300px",
    margin: "0 auto",
    padding: "60px 40px",
    position: "relative",
    zIndex: 1,
  },

  sectionHeading: {
    fontSize: "24px",
    fontWeight: "700",
    color: "rgba(255,255,255,0.9)",
    marginBottom: "32px",
    textAlign: "center",
  },

  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
  },

  statCard: {
    background: "rgba(255,255,255,0.95)",
    borderRadius: "18px",
    padding: "32px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
    position: "relative",
    overflow: "hidden",
    animation: "slideInUp 0.6s ease-out both",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    cursor: "pointer",
  },

  statCardGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "radial-gradient(circle at top right, rgba(102, 126, 234, 0.1) 0%, transparent 70%)",
    pointerEvents: "none",
  },

  statHoverGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "radial-gradient(circle, rgba(102, 126, 234, 0.05) 0%, transparent 70%)",
    animation: "glow 2s ease-in-out infinite",
  },

  statIcon: {
    fontSize: "40px",
    marginBottom: "16px",
  },

  statLabel: {
    fontSize: "13px",
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    margin: "0 0 12px",
    fontWeight: "600",
  },

  statValue: {
    fontSize: "36px",
    fontWeight: "800",
    margin: 0,
  },

  // Tabs Section
  tabsSection: {
    maxWidth: "1300px",
    margin: "0 auto",
    padding: "40px 40px 80px",
    position: "relative",
    zIndex: 1,
  },

  tabsContainer: {
    background: "rgba(255,255,255,0.95)",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 30px 80px rgba(0,0,0,0.15)",
    animation: "slideInUp 0.7s ease-out 0.3s both",
  },

  tabButtons: {
    display: "flex",
    borderBottom: "2px solid #f3f4f6",
    background: "#f9fafb",
  },

  tabBtn: {
    flex: 1,
    padding: "20px 24px",
    background: "transparent",
    border: "none",
    color: "#9ca3af",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },

  tabBtnActive: {
    color: "#667eea",
    background: "white",
    borderBottom: "3px solid #667eea",
  },

  tabIcon: {
    fontSize: "18px",
  },

  tabContent: {
    padding: "40px",
  },

  tabPane: {
    animation: "slideInUp 0.3s ease-out",
  },

  tabPaneHeader: {
    marginBottom: "32px",
  },

  tabTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1a1a2e",
    margin: "0 0 8px",
  },

  tabSubtitle: {
    fontSize: "14px",
    color: "#999",
    margin: 0,
  },

  emptyState: {
    textAlign: "center",
    padding: "80px 40px",
  },

  emptyIcon: {
    fontSize: "80px",
    marginBottom: "20px",
    display: "block",
  },

  emptyText: {
    fontSize: "16px",
    color: "#999",
    margin: 0,
  },

  chartContainer: {
    background: "#f9fafb",
    borderRadius: "16px",
    padding: "32px",
    border: "1px solid #e5e7eb",
  },

  tooltipStyle: {
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "16px",
  },

  questionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: "24px",
    marginBottom: "40px",
  },

  questionCard: {
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "24px",
    position: "relative",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },

  questionNumber: {
    position: "absolute",
    top: "-14px",
    left: "24px",
    width: "40px",
    height: "40px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
    color: "white",
    fontSize: "16px",
    boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
  },

  questionText: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#1a1a2e",
    marginBottom: "16px",
    marginTop: "12px",
    lineHeight: "1.5",
  },

  questionTextarea: {
    width: "100%",
    minHeight: "110px",
    padding: "12px 16px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    fontSize: "14px",
    fontFamily: "sans-serif",
    color: "#374151",
    resize: "vertical",
    transition: "all 0.3s ease",
  },

  submitBtnContainer: {
    display: "flex",
    justifyContent: "center",
  },

  submitBtn: {
    padding: "16px 48px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    boxShadow: "0 15px 40px rgba(102, 126, 234, 0.3)",
  },

  historyList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  historyCard: {
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    padding: "24px",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },

  historyHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  historyInfo: {
    flex: 1,
  },

  historyNumber: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#667eea",
    margin: "0 0 8px",
  },

  historyDate: {
    fontSize: "13px",
    color: "#999",
    margin: 0,
  },

  historyRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  scoreBadge: {
    padding: "12px 20px",
    borderRadius: "10px",
    color: "white",
    fontWeight: "700",
    fontSize: "16px",
    minWidth: "80px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
  },

  viewResultBtn: {
    padding: "12px 24px",
    background: "rgba(102, 126, 234, 0.1)",
    border: "1px solid rgba(102, 126, 234, 0.3)",
    borderRadius: "8px",
    color: "#667eea",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  footer: {
    textAlign: "center",
    padding: "40px 20px",
    color: "rgba(255,255,255,0.8)",
    position: "relative",
    zIndex: 1,
  },

  footerText: {
    margin: 0,
    fontSize: "15px",
    fontWeight: "500",
  },

  error: {
    color: "red",
    textAlign: "center",
    padding: "20px",
  },
  skeletonHeader: {
    height: "80px",
    background: "rgba(255,255,255,0.1)",
    marginBottom: "40px",
    animation: "pulse 1.5s infinite",
  },
  skeletonHero: {
    height: "300px",
    maxWidth: "1300px",
    margin: "0 auto 40px",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "20px",
    animation: "pulse 1.5s infinite",
  },
  skeletonCard: {
    height: "150px",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "20px",
    animation: "pulse 1.5s infinite",
  },

  loading: {
    textAlign: "center",
    padding: "40px 20px",
    color: "white",
  }
};

export default Dashboard;
