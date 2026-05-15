import React, { useEffect, useState } from "react";

const Mcqs = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // 2 min timer per question
  const QUESTION_TIME = 120;
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);

  const questions = [
    // ================= JAVA =================
    {
      category: "Java",
      question: "Which of these is not a Java keyword?",
      options: ["class", "int", "include", "static"],
      correct: "include",
      explanation:
        "'include' is used in C/C++, not Java. Java uses import keyword instead.",
    },
    {
      category: "Java",
      question: "Which method is the entry point of a Java program?",
      options: [
        "start()",
        "main()",
        "run()",
        "execute()",
      ],
      correct: "main()",
      explanation:
        "The JVM starts execution from the main() method.",
    },
    {
      category: "Java",
      question: "Which package contains Scanner class?",
      options: [
        "java.io",
        "java.util",
        "java.lang",
        "java.net",
      ],
      correct: "java.util",
      explanation:
        "Scanner class belongs to java.util package.",
    },
    {
      category: "Java",
      question: "What is the size of int in Java?",
      options: ["2 bytes", "4 bytes", "8 bytes", "Depends on OS"],
      correct: "4 bytes",
      explanation: "In Java, an int always occupies 4 bytes (32 bits) of memory, regardless of the operating system.",
    },
    {
      category: "Java",
      question: "Which of the following is a superclass of every class in Java?",
      options: ["String", "System", "Object", "Class"],
      correct: "Object",
      explanation: "The Object class is the root of the class hierarchy in Java.",
    },

    // ================= OOPS =================
    {
      category: "OOPS",
      question: "Which OOPS concept allows code reusability?",
      options: [
        "Encapsulation",
        "Abstraction",
        "Inheritance",
        "Polymorphism",
      ],
      correct: "Inheritance",
      explanation:
        "Inheritance allows one class to acquire properties and methods of another class.",
    },
    {
      category: "OOPS",
      question: "Method overloading is an example of?",
      options: [
        "Runtime Polymorphism",
        "Compile-time Polymorphism",
        "Inheritance",
        "Abstraction",
      ],
      correct: "Compile-time Polymorphism",
      explanation:
        "Method overloading is resolved during compilation.",
    },
    {
      category: "OOPS",
      question: "Which principle hides implementation details?",
      options: [
        "Inheritance",
        "Encapsulation",
        "Abstraction",
        "Polymorphism",
      ],
      correct: "Abstraction",
      explanation:
        "Abstraction hides internal implementation and shows only essential details.",
    },
    {
      category: "OOPS",
      question: "What is it called when a child class provides a specific implementation of a method already provided by its parent class?",
      options: ["Method Overloading", "Method Overriding", "Abstraction", "Interface"],
      correct: "Method Overriding",
      explanation: "Method Overriding occurs when a subclass has the same method signature as a method in its superclass.",
    },
    {
      category: "OOPS",
      question: "Which access modifier restricts access to the class itself?",
      options: ["public", "protected", "default", "private"],
      correct: "private",
      explanation: "The private modifier restricts access to the defining class only.",
    },

    // ================= JAVASCRIPT =================
    {
      category: "JavaScript",
      question: "Which is not a JavaScript datatype?",
      options: ["String", "Boolean", "Float", "Undefined"],
      correct: "Float",
      explanation:
        "JavaScript does not have a separate Float datatype. Numbers are represented using Number type.",
    },
    {
      category: "JavaScript",
      question: "Which method adds an element to an array?",
      options: ["push()", "pop()", "shift()", "filter()"],
      correct: "push()",
      explanation:
        "push() adds an element at the end of the array.",
    },
    {
      category: "JavaScript",
      question: "Which keyword declares a constant?",
      options: ["let", "var", "const", "define"],
      correct: "const",
      explanation:
        "const is used to declare variables whose values cannot be reassigned.",
    },
    {
      category: "JavaScript",
      question: "Which function converts JSON into object?",
      options: [
        "JSON.parse()",
        "JSON.stringify()",
        "JSON.convert()",
        "JSON.object()",
      ],
      correct: "JSON.parse()",
      explanation:
        "JSON.parse() converts JSON string into JavaScript object.",
    },
    {
      category: "JavaScript",
      question: "What does `typeof null` return in JavaScript?",
      options: ["null", "undefined", "object", "string"],
      correct: "object",
      explanation: "Due to a historical bug in JavaScript, typeof null returns 'object'.",
    },

    // ================= REACT =================
    {
      category: "React",
      question: "Which hook is used for state management?",
      options: [
        "useEffect",
        "useState",
        "useRef",
        "useMemo",
      ],
      correct: "useState",
      explanation:
        "useState hook is used to manage state in functional components.",
    },
    {
      category: "React",
      question: "Which hook is used for side effects?",
      options: [
        "useEffect",
        "useState",
        "useReducer",
        "useRef",
      ],
      correct: "useEffect",
      explanation:
        "useEffect handles side effects like API calls, timers, etc.",
    },
    {
      category: "React",
      question: "JSX stands for?",
      options: [
        "Java Syntax Extension",
        "JavaScript XML",
        "Java Source XML",
        "JSON XML",
      ],
      correct: "JavaScript XML",
      explanation:
        "JSX stands for JavaScript XML and is used to write UI in React.",
    },
    {
      category: "React",
      question: "What is the Virtual DOM?",
      options: ["A direct copy of the HTML DOM", "An in-memory representation of the real DOM", "A browser plugin", "A backend database"],
      correct: "An in-memory representation of the real DOM",
      explanation: "React uses a Virtual DOM to optimize updates before applying them to the actual DOM.",
    },
    {
      category: "React",
      question: "How do you pass data from a parent to a child component?",
      options: ["State", "Redux", "Props", "Context"],
      correct: "Props",
      explanation: "Props (short for properties) are used to pass data downwards from a parent to a child.",
    },

    // ================= DSA =================
    {
      category: "DSA",
      question: "Which data structure follows FIFO?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      correct: "Queue",
      explanation:
        "Queue follows First In First Out order.",
    },
    {
      category: "DSA",
      question: "Binary Search works on?",
      options: [
        "Sorted Array",
        "Linked List",
        "Graph",
        "Tree",
      ],
      correct: "Sorted Array",
      explanation:
        "Binary Search requires sorted data to work efficiently.",
    },
    {
      category: "DSA",
      question: "Time Complexity of Binary Search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correct: "O(log n)",
      explanation:
        "Binary Search halves the search space every step.",
    },
    {
      category: "DSA",
      question: "What is the worst-case time complexity of QuickSort?",
      options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"],
      correct: "O(n²)",
      explanation: "In the worst case (e.g., when the array is already sorted and the pivot is chosen poorly), QuickSort takes O(n²).",
    },
    {
      category: "DSA",
      question: "Which data structure is typically used to implement an LRU cache?",
      options: ["Array", "Hash Map + Doubly Linked List", "Binary Search Tree", "Stack"],
      correct: "Hash Map + Doubly Linked List",
      explanation: "A Hash Map provides O(1) access, while a Doubly Linked List allows O(1) removal and insertion to keep track of least recently used elements.",
    },

    // ================= SYSTEM DESIGN =================
    {
      category: "System Design",
      question: "Which database is best for relational data?",
      options: [
        "MongoDB",
        "MySQL",
        "Redis",
        "Cassandra",
      ],
      correct: "MySQL",
      explanation:
        "MySQL is a relational database management system.",
    },
    {
      category: "System Design",
      question: "What is caching mainly used for?",
      options: [
        "Increase latency",
        "Improve speed",
        "Delete data",
        "Compress files",
      ],
      correct: "Improve speed",
      explanation:
        "Caching stores frequently used data for faster access.",
    },
    {
      category: "System Design",
      question: "Which tool is commonly used as a message queue?",
      options: [
        "RabbitMQ",
        "React",
        "Node.js",
        "Docker",
      ],
      correct: "RabbitMQ",
      explanation:
        "RabbitMQ is a popular message broker.",
    },
    {
      category: "System Design",
      question: "What does CAP theorem stand for?",
      options: ["Consistency, Availability, Partition Tolerance", "Capacity, Application, Performance", "Caching, Availability, Proxy", "Consistency, Accuracy, Partitioning"],
      correct: "Consistency, Availability, Partition Tolerance",
      explanation: "The CAP theorem states that a distributed data store can only simultaneously provide two of these three guarantees.",
    },
    {
      category: "System Design",
      question: "Which load balancing algorithm directs requests to the server with the fewest active connections?",
      options: ["Round Robin", "IP Hash", "Least Connections", "Random"],
      correct: "Least Connections",
      explanation: "Least Connections assigns incoming requests to the server with the fewest active connections.",
    },
  ];

  // TIMER
  useEffect(() => {
    if (submitted) return;

    if (timeLeft === 0) {
      if (currentIndex === questions.length - 1) {
        handleSubmit();
      } else {
        setCurrentIndex((prev) => prev + 1);
        setTimeLeft(QUESTION_TIME);
      }
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, currentIndex, submitted]);

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(QUESTION_TIME);
  }, [currentIndex]);

  const handleSubmit = () => {
    let correct = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.correct) {
        correct++;
      }
    });

    const finalScore = Math.round(
      (correct / questions.length) * 100
    );

    setScore(finalScore);
    setSubmitted(true);
  };

  const progress =
    ((currentIndex + 1) / questions.length) * 100;

  const answeredCount = Object.keys(answers).length;

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;

    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // ================= RESULT PAGE =================
  if (submitted) {
    const correctAnswers = questions.filter(
      (q, i) => answers[i] === q.correct
    ).length;

    const wrongAnswers =
      questions.length - correctAnswers;

    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg-gradient)",
          padding: "40px 20px",
          fontFamily: "'Inter', sans-serif",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            width: "100%",
            background: "var(--bg-card)",
            borderRadius: "24px",
            padding: "40px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
            border: "1px solid var(--border-color)",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              marginBottom: "10px",
              color: "var(--text-primary)",
            }}
          >
            🤖 AI Evaluation Report
          </h1>

          <h2
            style={{
              textAlign: "center",
              color:
                score >= 80
                  ? "#22c55e"
                  : score >= 50
                    ? "#f59e0b"
                    : "#ef4444",
              fontSize: "50px",
              margin: "10px 0",
            }}
          >
            {score}%
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "30px 0",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div
              style={{
                background: "rgba(34, 197, 94, 0.1)",
                padding: "20px",
                borderRadius: "16px",
                minWidth: "200px",
                textAlign: "center",
                border: "1px solid rgba(34, 197, 94, 0.2)",
              }}
            >
              <h2 style={{ color: "#22c55e", margin: "0 0 10px" }}>
                ✅ Correct
              </h2>
              <p style={{ fontSize: "30px", margin: 0, color: "var(--text-primary)", fontWeight: "700" }}>
                {correctAnswers}
              </p>
            </div>

            <div
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                padding: "20px",
                borderRadius: "16px",
                minWidth: "200px",
                textAlign: "center",
                border: "1px solid rgba(239, 68, 68, 0.2)",
              }}
            >
              <h2 style={{ color: "#ef4444", margin: "0 0 10px" }}>
                ❌ Incorrect
              </h2>
              <p style={{ fontSize: "30px", margin: 0, color: "var(--text-primary)", fontWeight: "700" }}>
                {wrongAnswers}
              </p>
            </div>
          </div>

          {/* AI Review */}
          {wrongAnswers > 0 && (
          <div style={{ marginTop: "40px" }}>
            <h2
              style={{
                marginBottom: "20px",
                color: "var(--text-primary)",
                borderBottom: "1px solid var(--border-color)",
                paddingBottom: "10px",
              }}
            >
              🧠 Areas for Improvement (Incorrect Answers)
            </h2>

            {questions.map((q, i) => {
              const isCorrect = answers[i] === q.correct;
              if (isCorrect) return null; // Only show incorrect questions

              return (
                <div
                  key={i}
                  style={{
                    marginBottom: "20px",
                    padding: "24px",
                    borderRadius: "16px",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    borderLeft: `6px solid #ef4444`,
                    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "700",
                      marginBottom: "12px",
                      color: "var(--text-primary)",
                      fontSize: "16px",
                    }}
                  >
                    Q{i + 1}. {q.question}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                    <div style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                      <span style={{ color: "#ef4444", fontWeight: "600" }}>Your Answer:</span>{" "}
                      {answers[i] || "Not Attempted"}
                    </div>
                    <div style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                      <span style={{ color: "#22c55e", fontWeight: "600" }}>Correct Answer:</span>{" "}
                      {q.correct}
                    </div>
                  </div>

                  <div
                    style={{
                      background: "rgba(102, 126, 234, 0.1)",
                      padding: "16px",
                      borderRadius: "10px",
                      color: "var(--text-primary)",
                      fontSize: "14px",
                      lineHeight: "1.6",
                      border: "1px solid rgba(102, 126, 234, 0.2)"
                    }}
                  >
                    <span style={{ fontWeight: "700", color: "#667eea" }}>💡 Explanation:</span>{" "}
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
          )}

          <button
            onClick={() => {
              setAnswers({});
              setScore(null);
              setSubmitted(false);
              setCurrentIndex(0);
              setTimeLeft(QUESTION_TIME);
            }}
            style={{
              marginTop: "30px",
              width: "100%",
              padding: "16px",
              border: "none",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              color: "white",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 10px 20px rgba(102, 126, 234, 0.2)",
            }}
          >
            🔄 Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentIndex];

  // ================= QUIZ PAGE =================
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-gradient)",
        padding: "40px 20px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .mcq-title { font-size: 26px !important; }
          .mcq-card { padding: 24px !important; }
          .mcq-options { padding: 12px !important; font-size: 14px; }
          .mcq-btn-row { flex-direction: column; }
          .mcq-btn-row button { width: 100% !important; margin-bottom: 10px; }
        }
      `}</style>
      <div
        style={{
          maxWidth: "750px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            color: "white",
            marginBottom: "24px",
          }}
        >
          <h1 className="mcq-title" style={{ fontSize: "32px", marginBottom: "8px", fontWeight: "800" }}>🚀 Technical MCQ Quiz</h1>

          <p style={{ opacity: 0.9, fontSize: "15px" }}>
            Question {currentIndex + 1} of{" "}
            {questions.length}
          </p>

          <div
            style={{
              display: "inline-block",
              background: timeLeft <= 20 ? "rgba(239, 68, 68, 0.2)" : "rgba(255, 255, 255, 0.1)",
              padding: "10px 20px",
              borderRadius: "999px",
              marginTop: "16px",
              border: timeLeft <= 20 ? "1px solid rgba(239, 68, 68, 0.5)" : "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <h2
              style={{
                color: timeLeft <= 20 ? "#ff8a8a" : "white",
                margin: 0,
                fontSize: "24px",
              }}
            >
              ⏳ {formatTime(timeLeft)}
            </h2>
          </div>
        </div>

        {/* Progress */}
        <div
          style={{
            background: "rgba(255,255,255,0.2)",
            height: "8px",
            borderRadius: "999px",
            overflow: "hidden",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "linear-gradient(90deg, #34d399, #10b981)",
              transition: "0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </div>

        {/* Card */}
        <div
          className="mcq-card"
          style={{
            background: "var(--bg-card)",
            borderRadius: "24px",
            padding: "40px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            border: "1px solid var(--border-color)",
          }}
        >
          <div
            style={{
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg,#667eea,#764ba2)",
                color: "white",
                padding: "6px 14px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: "700",
                boxShadow: "0 4px 10px rgba(102, 126, 234, 0.3)",
              }}
            >
              {q.category}
            </span>
          </div>

          <h2
            style={{
              marginBottom: "32px",
              color: "var(--text-primary)",
              fontSize: "22px",
              lineHeight: "1.4",
            }}
          >
            {q.question}
          </h2>

          {/* Options */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {q.options.map((opt, i) => {
              const selected =
                answers[currentIndex] === opt;

              return (
                <div
                  key={i}
                  className="mcq-options"
                  onClick={() =>
                    setAnswers({
                      ...answers,
                      [currentIndex]: opt,
                    })
                  }
                  style={{
                    padding: "16px 20px",
                    borderRadius: "14px",
                    border: `2px solid ${selected
                        ? "#667eea"
                        : "var(--border-color)"
                      }`,
                    cursor: "pointer",
                    background: selected
                      ? "rgba(102,126,234,0.1)"
                      : "transparent",
                    color: "var(--text-primary)",
                    transition: "all 0.2s",
                    fontWeight: selected
                      ? "600"
                      : "400",
                  }}
                  onMouseEnter={(e) => {
                    if (!selected) e.currentTarget.style.background = "var(--border-color)";
                  }}
                  onMouseLeave={(e) => {
                    if (!selected) e.currentTarget.style.background = "transparent";
                  }}
                >
                  {opt}
                </div>
              );
            })}
          </div>

          {/* Buttons */}
          <div
            className="mcq-btn-row"
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "40px",
            }}
          >
            <button
              disabled={currentIndex === 0}
              onClick={() =>
                setCurrentIndex((prev) => prev - 1)
              }
              style={{
                flex: 1,
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid var(--border-color)",
                background: "transparent",
                color: "var(--text-primary)",
                fontWeight: "600",
                cursor: currentIndex === 0 ? "not-allowed" : "pointer",
                opacity: currentIndex === 0 ? 0.5 : 1,
                transition: "all 0.2s",
              }}
            >
              ← Previous
            </button>

            {currentIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: "12px",
                  border: "none",
                  background:
                    "linear-gradient(135deg,#22c55e,#16a34a)",
                  color: "white",
                  fontWeight: "700",
                  cursor: "pointer",
                  boxShadow: "0 10px 20px rgba(34, 197, 94, 0.3)",
                }}
              >
                Submit & Analyze 🚀
              </button>
            ) : (
              <button
                onClick={() =>
                  setCurrentIndex((prev) => prev + 1)
                }
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: "12px",
                  border: "none",
                  background:
                    "linear-gradient(135deg,#667eea,#764ba2)",
                  color: "white",
                  fontWeight: "700",
                  cursor: "pointer",
                  boxShadow: "0 10px 20px rgba(102, 126, 234, 0.3)",
                }}
              >
                Next →
              </button>
            )}
          </div>
        </div>

        <p
          style={{
            textAlign: "center",
            color: "rgba(255,255,255,0.7)",
            marginTop: "20px",
            fontSize: "14px",
          }}
        >
          Answered {answeredCount} / {questions.length} questions
        </p>
      </div>
    </div>
  );
};

export default Mcqs;