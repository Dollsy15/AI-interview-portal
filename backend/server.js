require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const interviewRoutes = require("./routes/interview");
const auth = require("./middleware/auth");
const questionRoutes = require("./routes/questionRoutes");
const authRoutes = require("./routes/authRoutes");
const User = require("./models/User");

// ===================== APP =====================
const app = express();

// ===================== MIDDLEWARE =====================
app.use(cors());
app.use(express.json());

// ===================== ROUTES =====================
app.use("/api/questions", questionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", interviewRoutes);

// ===================== MONGODB =====================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB error:", err);
    process.exit(1);
  });

  app.post("/api/interview/submit", (req, res) => {
  try {
    const { answers } = req.body;

    console.log("Received answers:", answers);

    if (!answers || answers.length === 0) {
      return res.status(400).json({ message: "No answers provided" });
    }

    const score = answers.filter(a => a.answer.trim() !== "").length * 10;

    res.status(200).json({
      data: {
        score
      }
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

// ===================== SIGNUP =====================
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Fill all fields" });

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ===================== LOGIN =====================
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({
      message: "Login successful",
      token,
      user,
    });
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
