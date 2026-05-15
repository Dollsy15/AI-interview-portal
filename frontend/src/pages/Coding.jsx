import React, { useState } from "react";
import axios from "axios";

const Coding = () => {
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [language, setLanguage] = useState("javascript");

  const questions = [
    {
      title: "Two Sum",
      description:
        "Find indices of two numbers such that they add up to target.",
      example:
        "Input: nums = [2,7,11,15], target = 9 → Output: [0,1]",
      tag: "Array",
      level: "Easy",

      starterCode: {
        javascript: `function twoSum(nums, target) {
  
}`,

        java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`,

        cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,

        python: `class Solution:
    def twoSum(self, nums, target):
        pass`,
      },
    },

    {
      title: "Valid Parentheses",
      description:
        "Check if brackets are balanced using stack.",
      example:
        'Input: "()[]{}" → Output: true',
      tag: "Stack",
      level: "Medium",

      starterCode: {
        javascript: `function isValid(s) {
  
}`,

        java: `class Solution {
    public boolean isValid(String s) {
        
    }
}`,

        cpp: `class Solution {
public:
    bool isValid(string s) {
        
    }
};`,

        python: `class Solution:
    def isValid(self, s):
        pass`,
      },
    },

    {
      title: "Maximum Depth of Binary Tree",
      description:
        "Find the maximum depth of a binary tree.",
      example:
        "Input: root = [3,9,20,null,null,15,7] → Output: 3",
      tag: "Trees",
      level: "Easy",

      starterCode: {
        javascript: `function maxDepth(root) {
  
}`,

        java: `class Solution {
    public int maxDepth(TreeNode root) {
        
    }
}`,

        cpp: `class Solution {
public:
    int maxDepth(TreeNode* root) {
        
    }
};`,

        python: `class Solution:
    def maxDepth(self, root):
        pass`,
      },
    },

    {
      title: "Climbing Stairs",
      description:
        "Count distinct ways to reach the top.",
      example:
        "Input: n = 5 → Output: 8",
      tag: "DP",
      level: "Easy",

      starterCode: {
        javascript: `function climbStairs(n) {
  
}`,

        java: `class Solution {
    public int climbStairs(int n) {
        
    }
}`,

        cpp: `class Solution {
public:
    int climbStairs(int n) {
        
    }
};`,

        python: `class Solution:
    def climbStairs(self, n):
        pass`,
      },
    },

    {
      title: "Number of Islands",
      description:
        "Count the number of islands in a grid.",
      example:
        'Input: grid = [["1","1","0"],["0","1","0"]] → Output: 1',
      tag: "Graphs",
      level: "Medium",

      starterCode: {
        javascript: `function numIslands(grid) {
  
}`,

        java: `class Solution {
    public int numIslands(char[][] grid) {
        
    }
}`,

        cpp: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        
    }
};`,

        python: `class Solution:
    def numIslands(self, grid):
        pass`,
      },
    },

    {
      title: "Reverse Linked List",
      description:
        "Reverse a singly linked list.",
      example:
        "Input: 1->2->3->4 → Output: 4->3->2->1",
      tag: "Linked List",
      level: "Easy",

      starterCode: {
        javascript: `function reverseList(head) {
  
}`,

        java: `class Solution {
    public ListNode reverseList(ListNode head) {
        
    }
}`,

        cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        
    }
};`,

        python: `class Solution:
    def reverseList(self, head):
        pass`,
      },
    },

    {
      title: "Longest Increasing Subsequence",
      description:
        "Find length of longest increasing subsequence.",
      example:
        "Input: [10,9,2,5,3,7,101,18] → Output: 4",
      tag: "DP",
      level: "Hard",

      starterCode: {
        javascript: `function lengthOfLIS(nums) {
  
}`,

        java: `class Solution {
    public int lengthOfLIS(int[] nums) {
        
    }
}`,

        cpp: `class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        
    }
};`,

        python: `class Solution:
    def lengthOfLIS(self, nums):
        pass`,
      },
    },

    {
      title: "Binary Tree Level Order Traversal",
      description:
        "Return level order traversal of binary tree.",
      example:
        "Input: [3,9,20,null,null,15,7] → Output: [[3],[9,20],[15,7]]",
      tag: "Trees",
      level: "Medium",

      starterCode: {
        javascript: `function levelOrder(root) {
  
}`,

        java: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        
    }
}`,

        cpp: `class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        
    }
};`,

        python: `class Solution:
    def levelOrder(self, root):
        pass`,
      },
    },

    {
      title: "Detect Cycle in Graph",
      description:
        "Detect if a graph contains a cycle.",
      example:
        "Input: Graph edges → Output: true/false",
      tag: "Graphs",
      level: "Hard",

      starterCode: {
        javascript: `function hasCycle(graph) {
  
}`,

        java: `class Solution {
    public boolean hasCycle(int V, ArrayList<ArrayList<Integer>> adj) {
        
    }
}`,

        cpp: `class Solution {
public:
    bool hasCycle(int V, vector<int> adj[]) {
        
    }
};`,

        python: `class Solution:
    def hasCycle(self, graph):
        pass`,
      },
    },

    {
      title: "Coin Change",
      description:
        "Find minimum coins required to make amount.",
      example:
        "Input: coins = [1,2,5], amount = 11 → Output: 3",
      tag: "DP",
      level: "Medium",

      starterCode: {
        javascript: `function coinChange(coins, amount) {
  
}`,

        java: `class Solution {
    public int coinChange(int[] coins, int amount) {
        
    }
}`,

        cpp: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        
    }
};`,

        python: `class Solution:
    def coinChange(self, coins, amount):
        pass`,
      },
    },
  ];

  const answeredCount = questions.filter((_, i) => 
    Object.keys(answers).some(k => k.startsWith(`${i}-`) && answers[k]?.trim() !== "")
  ).length;

  const progress =
    ((currentIndex + 1) / questions.length) * 100;

  const isLast =
    currentIndex === questions.length - 1;

  const q = questions[currentIndex];

  const runCode = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/code/run",
        {
          code: answers[`${currentIndex}-${language}`] ?? questions[currentIndex].starterCode[language],
          language,
        },
      );

      setRunResult(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const levelColors = {
    Easy: {
      bg: "#dcfce7",
      color: "#15803d",
    },

    Medium: {
      bg: "#fef3c7",
      color: "#b45309",
    },

    Hard: {
      bg: "#fee2e2",
      color: "#b91c1c",
    },
  };

  const tagColors = {
    Array: {
      bg: "#eff6ff",
      color: "#1d4ed8",
    },

    Stack: {
      bg: "#fff7ed",
      color: "#c2410c",
    },

    Trees: {
      bg: "#ecfeff",
      color: "#0f766e",
    },

    DP: {
      bg: "#f3e8ff",
      color: "#7e22ce",
    },

    Graphs: {
      bg: "#fef2f2",
      color: "#dc2626",
    },

    "Linked List": {
      bg: "#f0fdf4",
      color: "#15803d",
    },
  };

  // ================= SUBMIT SCREEN =================
  const getAnswerForQuestion = (i) => {
    if (answers[`${i}-${language}`]?.trim()) return answers[`${i}-${language}`];
    for (const lang of ["javascript", "java", "cpp", "python"]) {
      if (answers[`${i}-${lang}`]?.trim()) return answers[`${i}-${lang}`];
    }
    return null;
  };

  if (submitted) {
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
            maxWidth: "850px",
            width: "100%",
            background: "var(--bg-card)",
            borderRadius: "24px",
            padding: "40px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
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
            🎉 Coding Round Submitted
          </h1>

          <p
            style={{
              textAlign: "center",
              color: "#6b7280",
              marginBottom: "30px",
            }}
          >
            {answeredCount} / {questions.length} attempted
          </p>

          {questions.map((question, i) => {
            const ans = getAnswerForQuestion(i);
            return (
            <div
              key={i}
              style={{
                padding: "18px",
                borderRadius: "16px",
                marginBottom: "16px",
                background: ans
                  ? "rgba(34, 197, 94, 0.1)"
                  : "rgba(239, 68, 68, 0.1)",
                borderLeft: `5px solid ${ans
                  ? "#22c55e"
                  : "#ef4444"
                  }`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  flexWrap: "wrap",
                  marginBottom: "10px",
                }}
              >
                <strong style={{ color: "var(--text-primary)" }}>
                  {ans
                    ? "✅"
                    : "❌"}{" "}
                  {question.title}
                </strong>

                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "999px",
                    background:
                      levelColors[question.level].bg,
                    color:
                      levelColors[question.level].color,
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  {question.level}
                </span>
              </div>

              {ans && (
                <pre
                  style={{
                    background: "#0f172a",
                    color: "#e2e8f0",
                    padding: "16px",
                    borderRadius: "10px",
                    overflow: "auto",
                    fontSize: "13px",
                    fontFamily: "monospace",
                  }}
                >
                  {ans.slice(0, 300)}
                  {ans.length > 300
                    ? "..."
                    : ""}
                </pre>
              )}
            </div>
          )})}

          <button
            onClick={() => {
              setAnswers({});
              setSubmitted(false);
              setCurrentIndex(0);
              setRunResult(null);
            }}
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg,#4f46e5,#7c3aed)",
              color: "white",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Restart Challenge 🔄
          </button>
        </div>
      </div>
    );
  }

  // ================= MAIN PAGE =================
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
          .coding-title { font-size: 26px !important; }
          .main-card { border-radius: 16px !important; }
          .editor-textarea { height: 250px !important; }
          .coding-btn-row { flex-direction: column; }
          .coding-btn-row button { width: 100% !important; margin-bottom: 10px; }
        }
      `}</style>
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "white",
          }}
        >
          <h1
            className="coding-title"
            style={{
              fontSize: "34px",
              marginBottom: "10px",
              fontWeight: "800",
            }}
          >
            💻 Coding Practice Arena
          </h1>

          <p>
            {answeredCount} of {questions.length} attempted
          </p>
        </div>

        {/* Progress */}
        <div
          style={{
            height: "8px",
            background: "rgba(255,255,255,0.2)",
            borderRadius: "999px",
            overflow: "hidden",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background:
                "linear-gradient(90deg,#22c55e,#06b6d4)",
            }}
          />
        </div>

        {/* Question Numbers */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          {questions.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentIndex(i)}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background:
                  i === currentIndex
                    ? "#667eea"
                    : Object.keys(answers).some(k => k.startsWith(`${i}-`) && answers[k]?.trim() !== "")
                      ? "rgba(255,255,255,0.4)"
                      : "rgba(255,255,255,0.1)",
                color:
                  i === currentIndex
                    ? "white"
                    : "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Main Card */}
        <div
          className="main-card"
          style={{
            background: "var(--bg-card)",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            border: "1px solid var(--border-color)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "28px",
              borderBottom: "1px solid var(--border-color)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "14px",
              }}
            >
              <span
                style={{
                  padding: "5px 12px",
                  borderRadius: "999px",
                  background: tagColors[q.tag].bg,
                  color: tagColors[q.tag].color,
                  fontSize: "12px",
                  fontWeight: "700",
                }}
              >
                {q.tag}
              </span>

              <span
                style={{
                  padding: "5px 12px",
                  borderRadius: "999px",
                  background:
                    levelColors[q.level].bg,
                  color:
                    levelColors[q.level].color,
                  fontSize: "12px",
                  fontWeight: "700",
                }}
              >
                {q.level}
              </span>
            </div>

            <h2
              style={{
                marginBottom: "10px",
                color: "var(--text-primary)",
                fontSize: "24px",
              }}
            >
              {q.title}
            </h2>

            <p
              style={{
                color: "var(--text-secondary)",
                marginBottom: "14px",
                fontSize: "15px",
                lineHeight: "1.6",
              }}
            >
              {q.description}
            </p>

            <div
              style={{
                background: "rgba(102, 126, 234, 0.1)",
                padding: "16px",
                borderRadius: "12px",
                fontFamily: "monospace",
                fontSize: "14px",
                color: "var(--text-primary)",
                border: "1px solid rgba(102, 126, 234, 0.2)",
              }}
            >
              {q.example}
            </div>
          </div>

          {/* Language Selector */}
          <div
            style={{
              padding: "16px 24px",
              borderBottom: "1px solid var(--border-color)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(0,0,0,0.02)",
            }}
          >
            <label
              style={{
                fontWeight: "600",
                color: "var(--text-secondary)",
              }}
            >
              Select Language:
            </label>

            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
              }}
              style={{
                padding: "10px 14px",
                borderRadius: "10px",
                border: "1px solid var(--border-color)",
                outline: "none",
                cursor: "pointer",
                background: "var(--bg-card)",
                color: "var(--text-primary)",
                fontWeight: "500",
              }}
            >
              <option value="javascript">
                JavaScript
              </option>

              <option value="java">Java</option>

              <option value="cpp">C++</option>

              <option value="python">Python</option>
            </select>
          </div>

          {/* Editor */}
          <textarea
            className="editor-textarea"
            value={
              answers[`${currentIndex}-${language}`] ??
              questions[currentIndex].starterCode[language]
            }
            onChange={(e) =>
              setAnswers({
                ...answers,
                [`${currentIndex}-${language}`]: e.target.value,
              })
            }
            style={{
              width: "100%",
              height: "340px",
              background: "#0f172a",
              color: "#e2e8f0",
              border: "none",
              outline: "none",
              padding: "24px",
              fontFamily: "monospace",
              fontSize: "15px",
              lineHeight: "1.7",
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />

          {/* Run Result */}
          {runResult && (
            <div
              style={{
                padding: "14px 20px",
                background: "#111827",
                color: "white",
              }}
            >
              ✅ Passed: {runResult.passed} /{" "}
              {runResult.total}
            </div>
          )}

          {/* Buttons */}
          <div
            className="coding-btn-row"
            style={{
              display: "flex",
              gap: "14px",
              padding: "24px",
              borderTop: "1px solid var(--border-color)",
              background: "rgba(0,0,0,0.02)",
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
                cursor:
                  currentIndex === 0
                    ? "not-allowed"
                    : "pointer",
                opacity:
                  currentIndex === 0 ? 0.5 : 1,
              }}
            >
              ← Previous
            </button>

            <button
              onClick={runCode}
              style={{
                flex: 1,
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                background:
                  "linear-gradient(135deg,#f59e0b,#d97706)",
                color: "white",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Run Code ▶️
            </button>

            {isLast ? (
              <button
                onClick={() => setSubmitted(true)}
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
                }}
              >
                Submit 🚀
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
                    "linear-gradient(135deg,#4f46e5,#7c3aed)",
                  color: "white",
                  fontWeight: "700",
                  cursor: "pointer",
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
            marginTop: "18px",
            fontSize: "13px",
          }}
        >
          Click any question number above to jump
          directly
        </p>
      </div>
    </div>
  );
};

export default Coding;