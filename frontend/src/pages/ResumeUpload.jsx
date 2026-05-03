import React, { useState } from "react";
import axios from "axios";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("resume", file);

    const res = await axios.post(
      "http://localhost:5000/analyze-resume",
      formData,
    );

    // 👇 PARSE JSON FROM BACKEND
    const parsed = JSON.parse(res.data.analysis);
    setAnalysis(parsed);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Upload Resume</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br />
      <br />

      <button onClick={handleUpload}>Analyze Resume</button>

      {/* 👇 UI DISPLAY */}
      {analysis && (
        <div className="card" style={{ marginTop: "30px" }}>
          <h3>📊 Score</h3>
          <p>{analysis.score}</p>

          <h3>✅ Strengths</h3>
          <ul>
            {analysis.strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <h3>❌ Weaknesses</h3>
          <ul>
            {analysis.weaknesses.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>

          <h3>💡 Suggestions</h3>
          <ul>
            {analysis.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
