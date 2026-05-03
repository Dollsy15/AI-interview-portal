import React, { useState } from "react";

const Mcqs = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const questions = [
    {
      question: "Which is not a JavaScript datatype?",
      options: ["String", "Boolean", "Float", "Undefined"],
      correct: "Float"
    },
    {
      question: "Which method adds element to array?",
      options: ["push()", "pop()", "shift()", "filter()"],
      correct: "push()"
    },
    {
      question: "Which keyword declares a constant?",
      options: ["let", "var", "const", "define"],
      correct: "const"
    }
  ];

  const handleSubmit = () => {
    let correct = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.correct) {
        correct++;
      }
    });

    const finalScore = Math.round((correct / questions.length) * 100);
    setScore(finalScore);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>❓ MCQ Practice</h1>

      {questions.map((q, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <p><b>{q.question}</b></p>

          {q.options.map((opt, i) => (
            <div key={i}>
              <input
                type="radio"
                name={`q-${index}`}
                value={opt}
                onChange={() =>
                  setAnswers({
                    ...answers,
                    [index]: opt
                  })
                }
              />
              {opt}
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        style={{
          padding: "12px 25px",
          background: "#4a6cf7",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Submit MCQs
      </button>

      {score !== null && (
        <h3 style={{ marginTop: "20px" }}>
          Your Score: {score}%
        </h3>
      )}
    </div>
  );
};

export default Mcqs;