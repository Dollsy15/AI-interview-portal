import React, { useState } from "react";

const Coding = () => {
  const [answers, setAnswers] = useState({});

  const questions = [
    "Write a function to reverse a string",
    "Find the maximum number in an array",
    "Check if a number is a palindrome"
  ];

  return (
    <div style={{ padding: "40px" }}>
      <h1>💻 Coding Practice</h1>

      {questions.map((q, index) => (
        <div key={index} style={{ marginBottom: "25px" }}>
          <p><b>Q{index + 1}:</b> {q}</p>

          <textarea
            placeholder="Write your code here..."
            style={{
              width: "100%",
              height: "120px",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc"
            }}
            value={answers[index] || ""}
            onChange={(e) =>
              setAnswers({
                ...answers,
                [index]: e.target.value
              })
            }
          />
        </div>
      ))}

      <button
        onClick={() => alert("Code submitted!")}
        style={{
          padding: "12px 25px",
          background: "#4a6cf7",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Submit Code
      </button>
    </div>
  );
};

export default Coding;