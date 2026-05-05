import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [qLoading, setQLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      alert("Pehle file select karo!");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", file);
      const res = await axios.post(
        "http://localhost:5000/api/resume/analyze-resume",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      const parsed = JSON.parse(res.data.analysis);
      setAnalysis(parsed);
    } catch (err) {
      alert(err.response?.data?.error || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateQuestions = async () => {
    if (!file) {
      alert("Pehle file select karo!");
      return;
    }
    try {
      setQLoading(true);
      const formData = new FormData();
      formData.append("resume", file);
      const res = await axios.post(
        "http://localhost:5000/api/resume/generate-questions",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      navigate("/resume-interview", { state: { data: res.data } });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to generate questions");
    } finally {
      setQLoading(false);
    }
  };

  const scoreNum = analysis ? parseInt(analysis.score.split("/")[0]) : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "40px 20px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1
            style={{
              color: "white",
              fontSize: "36px",
              fontWeight: "700",
              margin: "0 0 8px",
            }}
          >
            AI Resume Analyzer
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "16px",
              margin: 0,
            }}
          >
            Upload your resume and get instant AI-powered feedback
          </p>
        </div>

        {/* Upload Card */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "40px",
            marginBottom: "24px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          }}
        >
          <div
            style={{
              border: "2px dashed #667eea",
              borderRadius: "12px",
              padding: "40px",
              textAlign: "center",
              background: "#f8f7ff",
              marginBottom: "24px",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>📄</div>
            <p
              style={{
                color: "#667eea",
                fontWeight: "600",
                fontSize: "16px",
                margin: "0 0 8px",
              }}
            >
              {file ? file.name : "Choose your PDF resume"}
            </p>
            <p style={{ color: "#999", fontSize: "13px", margin: "0 0 16px" }}>
              PDF files only
            </p>
            <label
              style={{
                background: "#667eea",
                color: "white",
                padding: "10px 24px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Browse File
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </label>
          </div>

          <button
            onClick={handleUpload}
            disabled={loading || !file}
            style={{
              width: "100%",
              padding: "14px",
              background:
                loading || !file
                  ? "#ccc"
                  : "linear-gradient(135deg, #667eea, #764ba2)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: loading || !file ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "⏳ Analyzing your resume..." : "🚀 Analyze Resume"}
          </button>
        </div>

        {/* Results */}
        {analysis && (
          <div>
            {/* Score Card */}
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "30px",
                marginBottom: "20px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: "#999",
                  fontSize: "14px",
                  margin: "0 0 8px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Resume Score
              </p>
              <div
                style={{
                  fontSize: "72px",
                  fontWeight: "800",
                  lineHeight: 1,
                  margin: "0 0 8px",
                  color:
                    scoreNum >= 7
                      ? "#22c55e"
                      : scoreNum >= 5
                        ? "#f59e0b"
                        : "#ef4444",
                }}
              >
                {analysis.score}
              </div>
              <p
                style={{ color: "#999", fontSize: "14px", margin: "0 0 20px" }}
              >
                {scoreNum >= 7
                  ? "Great resume! Minor improvements needed."
                  : scoreNum >= 5
                    ? "Good start! Several areas to improve."
                    : "Needs significant improvements."}
              </p>

              {/* Level + Skills */}
              {analysis.level && (
                <div style={{ marginBottom: "16px" }}>
                  <span
                    style={{
                      background:
                        analysis.level === "advanced"
                          ? "#dcfce7"
                          : analysis.level === "intermediate"
                            ? "#fef9c3"
                            : "#fee2e2",
                      color:
                        analysis.level === "advanced"
                          ? "#16a34a"
                          : analysis.level === "intermediate"
                            ? "#ca8a04"
                            : "#dc2626",
                      padding: "6px 16px",
                      borderRadius: "999px",
                      fontSize: "13px",
                      fontWeight: "700",
                    }}
                  >
                    {analysis.level?.toUpperCase()} LEVEL
                  </span>
                </div>
              )}

              {analysis.skills && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    justifyContent: "center",
                    marginBottom: "8px",
                  }}
                >
                  {analysis.skills.map((skill, i) => (
                    <span
                      key={i}
                      style={{
                        background: "#eff6ff",
                        color: "#1d4ed8",
                        padding: "4px 12px",
                        borderRadius: "999px",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* 3 Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "16px",
              }}
            >
              <div
                style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "24px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                  borderLeft: "5px solid #22c55e",
                }}
              >
                <h3
                  style={{
                    color: "#16a34a",
                    fontSize: "18px",
                    fontWeight: "700",
                    margin: "0 0 16px",
                  }}
                >
                  ✅ Strengths
                </h3>
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                  {analysis.strengths.map((s, i) => (
                    <li
                      key={i}
                      style={{
                        color: "#374151",
                        fontSize: "15px",
                        marginBottom: "8px",
                        lineHeight: "1.5",
                      }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "24px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                  borderLeft: "5px solid #ef4444",
                }}
              >
                <h3
                  style={{
                    color: "#dc2626",
                    fontSize: "18px",
                    fontWeight: "700",
                    margin: "0 0 16px",
                  }}
                >
                  ❌ Weaknesses
                </h3>
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                  {analysis.weaknesses.map((w, i) => (
                    <li
                      key={i}
                      style={{
                        color: "#374151",
                        fontSize: "15px",
                        marginBottom: "8px",
                        lineHeight: "1.5",
                      }}
                    >
                      {w}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "24px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                  borderLeft: "5px solid #667eea",
                }}
              >
                <h3
                  style={{
                    color: "#667eea",
                    fontSize: "18px",
                    fontWeight: "700",
                    margin: "0 0 16px",
                  }}
                >
                  💡 Suggestions
                </h3>
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                  {analysis.suggestions.map((s, i) => (
                    <li
                      key={i}
                      style={{
                        color: "#374151",
                        fontSize: "15px",
                        marginBottom: "8px",
                        lineHeight: "1.5",
                      }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Missing Skills */}
              {analysis.missingSkills && analysis.missingSkills.length > 0 && (
                <div
                  style={{
                    background: "white",
                    borderRadius: "16px",
                    padding: "24px",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                    borderLeft: "5px solid #f59e0b",
                  }}
                >
                  <h3
                    style={{
                      color: "#d97706",
                      fontSize: "18px",
                      fontWeight: "700",
                      margin: "0 0 16px",
                    }}
                  >
                    🎯 Missing Skills
                  </h3>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                  >
                    {analysis.missingSkills.map((skill, i) => (
                      <span
                        key={i}
                        style={{
                          background: "#fef3c7",
                          color: "#92400e",
                          padding: "4px 12px",
                          borderRadius: "999px",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Generate Questions Button */}
            <div style={{ marginTop: "24px" }}>
              <button
                onClick={handleGenerateQuestions}
                disabled={qLoading}
                style={{
                  width: "100%",
                  padding: "16px",
                  background: qLoading
                    ? "#ccc"
                    : "linear-gradient(135deg, #f59e0b, #d97706)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "18px",
                  fontWeight: "700",
                  cursor: qLoading ? "not-allowed" : "pointer",
                  boxShadow: "0 8px 24px rgba(245,158,11,0.3)",
                }}
              >
                {qLoading
                  ? "⏳ Generating questions..."
                  : "🎯 Start Personalized Interview"}
              </button>
              <p
                style={{
                  textAlign: "center",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "13px",
                  marginTop: "8px",
                }}
              >
                AI will generate interview questions based on your resume
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;
