require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const interviewRoutes = require("./routes/interview");
const auth = require("./middleware/auth");
const questionRoutes = require("./routes/questionRoutes");
const authRoutes = require("./routes/authRoutes");
const User = require("./models/User");
const Interview = require("./models/Interview");
const resumeRoutes = require("./routes/resume");

// ===================== APP =====================
const app = express();

// ===================== MIDDLEWARE =====================
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// 🔥 DEBUG 1: REQUEST LOGGER
app.use((req, res, next) => {
  console.log("➡️ API HIT:", req.method, req.url);
  next();
});

// 🔥 DEBUG 2: BODY LOGGER
app.use((req, res, next) => {
  console.log("📦 BODY:", req.body);
  next();
});

// 🔥 DEBUG 3: EXTRA CORS HEADERS SAFETY
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// ===================== ROUTES =====================
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api", interviewRoutes);
app.use("/", resumeRoutes);

// ===================== MONGODB =====================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB error:", err);
  });

// ===================== INTERVIEW SUBMIT =====================
app.post("/api/interview/submit", async (req, res) => {
  try {
    const { answers, questions } = req.body;

    const score = answers.filter((a) => a.answer.trim() !== "").length * 10;

    const questionList = questions.map((q) => q.question);
    const answerList = answers.map((a) => a.answer);

    const newInterview = await Interview.create({
      score,
      questions: questionList,
      answers: answerList,
    });

    res.status(200).json({
      data: {
        score,
        interviewId: newInterview._id,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ===================== DASHBOARD =====================
app.get("/dashboard", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      message: "Welcome to your dashboard!",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ===================== HISTORY =====================
app.get("/api/interview/history", async (req, res) => {
  try {
    const interviews = await Interview.find().sort({ createdAt: -1 });
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ===================== ROOT =====================
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// ===================== START SERVER =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
