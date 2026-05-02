const express = require("express");
const router = express.Router();
const axios = require("axios");

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

    // ================= SCORE =================
    let score = 0;

    questions.forEach((q) => {
      const userAnswer = answers[q._id];

      if (
        userAnswer &&
        q.correctAnswer &&
        userAnswer.trim().toLowerCase() ===
          q.correctAnswer.trim().toLowerCase()
      ) {
        score++;
      }
    });

    const totalQuestions = questions.length;
    const percentageScore = Math.round((score / totalQuestions) * 100);

    // ================= FORMAT ANSWERS =================
    let combinedAnswers = "";

    questions.forEach((q) => {
      combinedAnswers += `Question: ${q.question}\n`;
      combinedAnswers += `Answer: ${answers[q._id] || "No answer"}\n\n`;
    });

    // ================= AI FEEDBACK (HUGGINGFACE) =================
    let feedback = "";

    try {
      const prompt = `
You are an interview evaluator.

Evaluate the candidate:

${combinedAnswers}

Give:
1. Overall Feedback
2. Strengths
3. Weaknesses
4. Improvements
`;

      const response = await axios.post(
        "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct",
        { inputs: prompt }
      );

      feedback =
        response.data?.[0]?.generated_text ||
        "Feedback not available";
    } catch (err) {
      console.log("AI ERROR:", err.message);
      feedback = "AI feedback temporarily unavailable";
    }

    // ================= UPDATE USER STATS =================
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
        (user.stats.avgScore * prev + percentageScore) /
        newInterviews;

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