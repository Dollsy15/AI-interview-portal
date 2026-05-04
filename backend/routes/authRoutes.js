const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/* ===================== SIGNUP ===================== */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("SIGNUP HIT:", req.body);

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("USER CREATED:", user.email);

    return res.status(201).json({
      success: true,
      message: "Signup successful",
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

/* ===================== LOGIN ===================== */
router.post("/login", async (req, res) => {
  try {
    console.log("LOGIN HIT:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
