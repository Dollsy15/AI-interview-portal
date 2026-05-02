const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

// ✅ Gemini AI
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ================= SUBMIT ANSWERS =================
router.post("/submit-answers", authMiddleware, async (req, res) => {
  try {
    const { answers } = req.body;
    const userId = req.user.userId; // make sure middleware uses userId

    const questions = await Question.find();

    let score = 0;

    // ================= SCORING =================
    questions.forEach((q) => {
      const userAnswer = answers[q._id];

      if (
        userAnswer &&
        userAnswer.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()
      ) {
        score++;
      }
    });

    const totalQuestions = questions.length;

    const percentageScore = totalQuestions
      ? Math.round((score / totalQuestions) * 100)
      : 0;

    // ================= AI FEEDBACK =================
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    let combinedAnswers = "";

    questions.forEach((q) => {
      combinedAnswers += `Question: ${q.question}\n`;
      combinedAnswers += `User Answer: ${answers[q._id] || "No answer"}\n\n`;
    });

    const prompt = `

You are an interview evaluator.

Evaluate the following answers and give:

1. Overall feedback
2. Strengths
3. Weaknesses
4. Improvement suggestions

${combinedAnswers}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const feedback = response.text();

    // ================= UPDATE USER STATS =================
    const user = await User.findById(userId);

    if (user) {
      const prevInterviews = user.stats.interviewsTaken;
      const prevAvg = user.stats.avgScore;

      const newInterviews = prevInterviews + 1;

      const newAvg =
        (prevAvg * prevInterviews + percentageScore) / newInterviews;

      user.stats.interviewsTaken = newInterviews;
      user.stats.avgScore = Math.round(newAvg);
      user.stats.questionsPracticed += totalQuestions;

      await user.save();
    }

    // ================= RESPONSE =================
    res.json({
      score: percentageScore,
      totalQuestions,
      feedback,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
