const express = require("express");
const router = express.Router();

const Question = require("../models/Question");
const User = require("../models/User");
const Interview = require("../models/Interview");
const authMiddleware = require("../middleware/auth");

// ===================== SUBMIT INTERVIEW =====================
router.post("/submit", authMiddleware, async (req, res) => {
  try {
    const { answers, questions } = req.body;
    const userId = req.user.userId;

    if (!answers || !questions) {
      return res.status(400).json({
        message: "Answers and questions are required",
      });
    }

    let score = 0;
    let feedbackArray = [];

    // ================= SCORE + FEEDBACK =================
    questions.forEach((q, i) => {
      const ans = answers[i]?.answer || "";

      if (ans.trim().length > 20) {
        score++;
        feedbackArray.push({
          question: q.question,
          remark: "Good answer",
        });
      } else {
        feedbackArray.push({
          question: q.question,
          remark: "Too short, improve explanation",
        });
      }
    });

    const percentage =
      questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

    // ================= SAVE TO DB =================
    const newInterview = new Interview({
      userId,
      score: percentage,
      questions: questions.map((q) => q.question),
      answers: answers.map((a) => a?.answer || ""),
    });

    await newInterview.save();

    // ================= OPTIONAL: UPDATE USER STATS =================
    const user = await User.findById(userId);

    if (user) {
      user.stats = user.stats || {
        interviewsTaken: 0,
        avgScore: 0,
        questionsPracticed: 0,
      };

      const prev = user.stats.interviewsTaken || 0;
      const newInterviews = prev + 1;

      const newAvg = (user.stats.avgScore * prev + percentage) / newInterviews;

      user.stats.interviewsTaken = newInterviews;
      user.stats.avgScore = Math.round(newAvg);
      user.stats.questionsPracticed += questions.length;

      await user.save();
    }

    // ================= RESPONSE =================
    res.json({
      data: {
        score: percentage,
        feedbackArray,
      },
    });
  } catch (err) {
    console.log("SUBMIT ERROR:", err);
    res.status(500).json({
      message: "Error in submit route",
      error: err.message,
    });
  }
});

module.exports = router;
