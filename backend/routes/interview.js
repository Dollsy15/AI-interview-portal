const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

// ===================== SUBMIT ANSWERS =====================
router.post("/submit-answers", authMiddleware, async (req, res) => {
  try {
    const answers = req.body.answers;
    const userId = req.user.userId;

    const questions = await Question.find();

    if (!questions.length) {
      return res.status(404).json({ message: "No questions found" });
    }

    let score = 0;

    questions.forEach((q) => {
      const userAnswer = answers[q._id];

      if (
        userAnswer &&
        q.correctAnswer &&
        userAnswer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()
      ) {
        score++;
      }
    });

    const totalQuestions = questions.length;
    const percentageScore = Math.round((score / totalQuestions) * 100);

    // ===================== SIMPLE FEEDBACK (NO AI) =====================
    let feedback = `
Overall Score: ${percentageScore}%

Great effort! Keep practicing.

Strengths:
- Attempted all questions

Weaknesses:
- Need more accuracy

Improvements:
- Practice DSA and fundamentals daily
    `;

    // ===================== UPDATE USER STATS =====================
    const user = await User.findById(userId);

    if (user) {
      user.stats = user.stats || {
        interviewsTaken: 0,
        avgScore: 0,
        questionsPracticed: 0,
      };

      const prev = user.stats.interviewsTaken;
      const newInterviews = prev + 1;

      const newAvg =
        (user.stats.avgScore * prev + percentageScore) / newInterviews;

      user.stats.interviewsTaken = newInterviews;
      user.stats.avgScore = Math.round(newAvg);
      user.stats.questionsPracticed += totalQuestions;

      await user.save();
    }

    res.json({
      score: percentageScore,
      totalQuestions,
      feedback,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;