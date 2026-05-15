import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ResumeInterview = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ResumeUpload navigate karta hai: { state: { data: res.data } }
  // res.data already parsed object hai — { name, level, skills, questions }
  const data = location.state?.data;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!loading && textareaRef.current) textareaRef.current.focus();
  }, [currentIdx, loading]);

  // ── No data / redirect ──
  if (!data || !data.questions || data.questions.length === 0) {
    return (
      <div style={s.page}>
        <div style={s.emptyBox}>
          <div style={s.emptyIcon}>📄</div>
          <h2 style={s.emptyTitle}>No Interview Data Found</h2>
          <p style={s.emptySub}>
            Pehle resume upload karo aur questions generate karo.
          </p>
          <button style={s.primaryBtn} onClick={() => navigate("/")}>
            ← Resume Upload pe Jao
          </button>
        </div>
      </div>
    );
  }

  const questions = data.questions;
  const total = questions.length;
  const current = questions[currentIdx];
  const progress = done ? 100 : Math.round((currentIdx / total) * 100);

  const avgScore =
    feedbacks.length > 0
      ? (
          feedbacks.reduce((s, f) => s + (f.score || 0), 0) / feedbacks.length
        ).toFixed(1)
      : "0.0";

  // ── Submit answer ──
  const handleSubmit = async (skipped = false) => {
    const userAnswer = skipped ? "(Skipped)" : answer.trim();
    if (!skipped && !userAnswer) {
      textareaRef.current?.focus();
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/resume/interview-feedback",
        {
          question: current.question,
          topic: current.topic,
          difficulty: current.difficulty,
          level: data.level,
          answer: userAnswer,
        },
      );

      const fb = res.data;

      setFeedbacks((prev) => [
        ...prev,
        {
          question: current.question,
          answer: userAnswer,
          feedback: fb.feedback,
          score: fb.score,
          skipped,
        },
      ]);

      setAnswer("");

      if (currentIdx + 1 >= total) {
        setDone(true);
      } else {
        setCurrentIdx((i) => i + 1);
      }
    } catch (err) {
      alert(
        err.response?.data?.error ||
          "An error occurred while taking feedback. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ── Result Screen ──
  if (done) {
    const scoreNum = parseFloat(avgScore);
    const emoji = scoreNum >= 4 ? "🏆" : scoreNum >= 2.5 ? "💪" : "📚";
    const resultMsg =
      scoreNum >= 4
        ? "Excellent Performance!"
        : scoreNum >= 2.5
          ? "Good Effort!"
          : "Keep Practicing!";

    return (
      <div style={s.page}>
        <div
          style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}
        >
          {/* Result Header */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ fontSize: "64px", marginBottom: "12px" }}>
              {emoji}
            </div>
            <h1 style={s.resultTitle}>{resultMsg}</h1>
            <p style={s.resultSub}>
              {data.name || "Candidate"} · {data.level}
            </p>
          </div>

          {/* Score Box */}
          <div style={s.scoreBox}>
            <p style={s.scoreLabel}>Average Score</p>
            <div
              style={{
                ...s.bigScore,
                color:
                  scoreNum >= 4
                    ? "#22c55e"
                    : scoreNum >= 2.5
                      ? "#f59e0b"
                      : "#ef4444",
              }}
            >
              {avgScore}
              <span style={{ fontSize: "28px", opacity: 0.5 }}>/5</span>
            </div>
            <p style={s.scoreCaption}>{total} questions complete</p>
          </div>

          {/* Q&A Review */}
          <div style={{ marginBottom: "28px" }}>
            {feedbacks.map((f, i) => (
              <div key={i} style={s.qaCard}>
                <p style={s.qaQuestion}>
                  Q{i + 1}: {f.question}
                </p>
                <p style={s.qaAnswer}>
                  {f.skipped
                    ? "⏭ Skipped"
                    : `Tera answer: "${f.answer.slice(0, 120)}${f.answer.length > 120 ? "…" : ""}"`}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <Stars score={f.score} />
                  <span style={{ fontSize: "13px", color: "#999" }}>
                    {f.score}/5
                  </span>
                </div>
                <p style={s.qaFeedback}>💬 {f.feedback}</p>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              style={{ ...s.outlineBtn, flex: 1, minWidth: "140px" }}
              onClick={() => navigate("/")}
            >
              🔄 Naya Resume Try Karo
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Interview Screen ──
  return (
    <div style={s.page}>
      <style>{`
        @media (max-width: 768px) {
          .ri-container { padding: 20px 10px !important; }
          .ri-card { padding: 20px !important; }
          .ri-header { flex-direction: column; align-items: flex-start !important; }
          .ri-btn-row { flex-direction: column; }
          .ri-title { font-size: 24px !important; }
        }
      `}</style>
      <div
        className="ri-container"
        style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}
      >
        {/* Header */}
        <div className="ri-header" style={s.header}>
          <div>
            <p style={s.headerLabel}>AI Interview Portal</p>
            <h1 className="ri-title" style={s.headerTitle}>
              {data.name
                ? `Hey, ${data.name.split(" ")[0]}!`
                : "Interview Session"}
            </h1>
          </div>
          <span
            style={{
              ...s.levelBadge,
              background:
                data.level === "advanced"
                  ? "#dcfce7"
                  : data.level === "intermediate"
                    ? "#fef9c3"
                    : "#fee2e2",
              color:
                data.level === "advanced"
                  ? "#16a34a"
                  : data.level === "intermediate"
                    ? "#ca8a04"
                    : "#dc2626",
            }}
          >
            {data.level?.toUpperCase()}
          </span>
        </div>

        {/* Skills */}
        {data.skills?.length > 0 && (
          <div style={s.skillsRow}>
            {data.skills.map((sk, i) => (
              <span key={i} style={s.skillChip}>
                {sk}
              </span>
            ))}
          </div>
        )}

        {/* Progress Bar */}
        <div style={{ marginBottom: "28px" }}>
          <div style={s.progressInfo}>
            <span style={s.progressText}>
              Question {currentIdx + 1} of {total}
            </span>
            <span style={s.progressPct}>{progress}%</span>
          </div>
          <div style={s.progressTrack}>
            <div style={{ ...s.progressFill, width: `${progress}%` }} />
          </div>
        </div>

        {/* Question Card */}
        <div className="ri-card" style={s.card} key={currentIdx}>
          {/* Meta tags */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "16px",
            }}
          >
            <span style={s.qNum}>
              Q{String(currentIdx + 1).padStart(2, "0")}
            </span>
            {current.topic && <span style={s.topicTag}>{current.topic}</span>}
            {current.difficulty && (
              <span
                style={{
                  ...s.diffTag,
                  ...(current.difficulty === "Easy"
                    ? s.diffEasy
                    : current.difficulty === "Hard"
                      ? s.diffHard
                      : s.diffMedium),
                }}
              >
                {current.difficulty}
              </span>
            )}
          </div>

          {/* Question */}
          <p style={s.questionText}>{current.question}</p>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            style={s.textarea}
            placeholder="Write your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={loading}
            rows={5}
            onKeyDown={(e) => {
              if (e.ctrlKey && e.key === "Enter") handleSubmit(false);
            }}
          />

          {/* Buttons */}
          <div className="ri-btn-row" style={s.btnRow}>
            <button
              style={{
                ...s.primaryBtn,
                opacity: loading || !answer.trim() ? 0.5 : 1,
                cursor: loading || !answer.trim() ? "not-allowed" : "pointer",
              }}
              onClick={() => handleSubmit(false)}
              disabled={loading || !answer.trim()}
            >
              {loading ? "⏳ Evaluating..." : "Submit Answer →"}
            </button>
            <button
              style={s.skipBtn}
              onClick={() => handleSubmit(true)}
              disabled={loading}
            >
              Skip ⏭
            </button>
          </div>
          <p style={s.hint}>Ctrl + Enter to submit</p>
        </div>

        {/* Loading */}
        {loading && (
          <div style={s.loadingBox}>
            <div style={s.spinner} />
            AI tera answer evaluate kar raha hai...
          </div>
        )}

        {/* Feedback (shown for previous answer while on next question) */}
        {!loading &&
          feedbacks.length > 0 &&
          feedbacks.length === currentIdx && (
            <div style={s.feedbackBox}>
              <div style={s.feedbackHeader}>
                <div style={s.feedbackIcon}>🤖</div>
                <span style={s.feedbackTitle}>AI Feedback</span>
              </div>
              <p style={s.feedbackText}>
                {feedbacks[currentIdx - 1]?.feedback}
              </p>
              <div style={s.scoreRow}>
                <span style={{ fontSize: "13px", color: "#999" }}>Score:</span>
                <Stars score={feedbacks[currentIdx - 1]?.score} />
                <span style={{ fontSize: "13px", color: "#999" }}>
                  {feedbacks[currentIdx - 1]?.score}/5
                </span>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

// ── Stars Component ──
const Stars = ({ score }) => {
  const filled = Math.round(score || 0);
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          style={{ fontSize: "16px", color: i <= filled ? "#f59e0b" : "#ddd" }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

// ── Styles ──
const s = {
  page: {
    minHeight: "100vh",
    background: "var(--bg-gradient)",
    fontFamily: "'Inter', sans-serif",
    color: "var(--text-primary)",
  },
  // Header
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "12px",
  },
  headerLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "12px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    margin: "0 0 4px",
  },
  headerTitle: {
    color: "white",
    fontSize: "28px",
    fontWeight: "700",
    margin: 0,
  },
  levelBadge: {
    padding: "6px 16px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "700",
  },
  // Skills
  skillsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "20px",
  },
  skillChip: {
    background: "rgba(255,255,255,0.2)",
    color: "white",
    padding: "4px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
  },
  // Progress
  progressInfo: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  progressText: { color: "rgba(255,255,255,0.8)", fontSize: "13px" },
  progressPct: { color: "white", fontSize: "13px", fontWeight: "700" },
  progressTrack: {
    height: "6px",
    background: "rgba(255,255,255,0.2)",
    borderRadius: "999px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "white",
    borderRadius: "999px",
    transition: "width 0.4s ease",
  },
  // Card
  card: {
    background: "var(--bg-card)",
    borderRadius: "20px",
    padding: "32px",
    marginBottom: "20px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
    border: "1px solid var(--border-color)",
  },
  qNum: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#667eea",
    letterSpacing: "2px",
  },
  topicTag: {
    background: "rgba(102, 126, 234, 0.1)",
    border: "1px solid var(--border-color)",
    color: "var(--text-primary)",
    padding: "3px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
  },
  diffTag: {
    padding: "3px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
  },
  diffEasy: {
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    color: "#15803d",
  },
  diffMedium: {
    background: "#fffbeb",
    border: "1px solid #fde68a",
    color: "#b45309",
  },
  diffHard: {
    background: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#b91c1c",
  },
  questionText: {
    fontSize: "18px",
    fontWeight: "700",
    color: "var(--text-primary)",
    lineHeight: "1.5",
    marginBottom: "20px",
  },
  textarea: {
    width: "100%",
    border: "2px solid var(--border-color)",
    borderRadius: "10px",
    padding: "14px",
    fontSize: "15px",
    color: "var(--text-primary)",
    background: "transparent",
    fontFamily: "sans-serif",
    resize: "vertical",
    outline: "none",
    boxSizing: "border-box",
    lineHeight: "1.6",
  },
  btnRow: {
    display: "flex",
    gap: "12px",
    marginTop: "16px",
  },
  primaryBtn: {
    flex: 1,
    padding: "14px 20px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
  },
  skipBtn: {
    padding: "14px 20px",
    background: "transparent",
    color: "var(--text-secondary)",
    border: "1px solid var(--border-color)",
    borderRadius: "10px",
    fontSize: "14px",
    cursor: "pointer",
  },
  hint: {
    textAlign: "right",
    color: "#ccc",
    fontSize: "12px",
    marginTop: "8px",
  },
  // Loading
  loadingBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "rgba(255,255,255,0.15)",
    borderRadius: "12px",
    padding: "16px 20px",
    color: "white",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "16px",
  },
  spinner: {
    width: "18px",
    height: "18px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "white",
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
    flexShrink: 0,
  },
  // Feedback
  feedbackBox: {
    background: "var(--bg-card)",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "20px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
    borderLeft: "5px solid #667eea",
    border: "1px solid var(--border-color)",
  },
  feedbackHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "12px",
  },
  feedbackIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
  },
  feedbackTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#667eea",
  },
  feedbackText: {
    color: "var(--text-primary)",
    fontSize: "14px",
    lineHeight: "1.7",
  },
  scoreRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "12px",
    paddingTop: "12px",
    borderTop: "1px solid var(--border-color)",
  },
  // Result screen
  resultTitle: {
    color: "white",
    fontSize: "32px",
    fontWeight: "700",
    margin: "0 0 8px",
  },
  resultSub: {
    color: "rgba(255,255,255,0.8)",
    fontSize: "16px",
    margin: 0,
  },
  scoreBox: {
    background: "var(--bg-card)",
    borderRadius: "20px",
    padding: "32px",
    textAlign: "center",
    marginBottom: "24px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
    border: "1px solid var(--border-color)",
  },
  scoreLabel: {
    color: "#999",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    margin: "0 0 8px",
  },
  bigScore: {
    fontSize: "72px",
    fontWeight: "800",
    lineHeight: 1,
    margin: "0 0 8px",
  },
  scoreCaption: {
    color: "#999",
    fontSize: "14px",
    margin: 0,
  },
  qaCard: {
    background: "var(--bg-card)",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "16px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
    border: "1px solid var(--border-color)",
    borderLeft: "5px solid #667eea",
  },
  qaQuestion: {
    color: "#667eea",
    fontWeight: "700",
    fontSize: "15px",
    marginBottom: "8px",
  },
  qaAnswer: {
    color: "#6b7280",
    fontSize: "13px",
    fontStyle: "italic",
    marginBottom: "8px",
    lineHeight: "1.6",
  },
  qaFeedback: {
    color: "var(--text-primary)",
    fontSize: "13px",
    lineHeight: "1.6",
    paddingTop: "10px",
    borderTop: "1px solid var(--border-color)",
  },
  outlineBtn: {
    padding: "14px 24px",
    background: "rgba(255,255,255,0.15)",
    color: "white",
    border: "2px solid rgba(255,255,255,0.5)",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
  },
  // Empty state
  emptyBox: {
    maxWidth: "500px",
    margin: "80px auto",
    textAlign: "center",
    background: "var(--bg-card)",
    borderRadius: "20px",
    padding: "48px 32px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
    border: "1px solid var(--border-color)",
  },
  emptyIcon: { fontSize: "56px", marginBottom: "16px" },
  emptyTitle: {
    color: "var(--text-primary)",
    fontSize: "22px",
    fontWeight: "700",
    margin: "0 0 8px",
  },
  emptySub: { color: "#6b7280", fontSize: "15px", margin: "0 0 24px" },
};

// CSS animation for spinner
const styleTag = document.createElement("style");
styleTag.innerHTML = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(styleTag);

export default ResumeInterview;
