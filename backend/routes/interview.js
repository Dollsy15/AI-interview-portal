const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    let combinedAnswers = "";

    questions.forEach((q) => {
      combinedAnswers += "Question: " + q.question + "\n";
      combinedAnswers += "Answer: " + (answers[q._id] || "No answer") + "\n\n";
    });

    const prompt =
      "You are an interview evaluator.\nGive feedback:\n1. Overall\n2. Strengths\n3. Weaknesses\n4. Improvements\n\n" +
      combinedAnswers;

    let feedback = "No feedback";

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      feedback = response.text();
    } catch (err) {
      console.log(err);
    }

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
