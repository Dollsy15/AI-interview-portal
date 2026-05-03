const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const OpenAI = require("openai");

const router = express.Router();

// 🔹 OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🔹 Multer setup
const upload = multer({ dest: "uploads/" });

// 🔹 Route
router.post("/analyze-resume", upload.single("resume"), async (req, res) => {
  try {
    const filePath = req.file.path;

    // Extract text from PDF
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const resumeText = pdfData.text;

    // 🤖 AI ANALYSIS
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional resume reviewer.",
        },
        {
          role: "user",
          content: `
Analyze this resume and return JSON in this format:

{
  "score": "8/10",
  "strengths": ["..."],
  "weaknesses": ["..."],
  "suggestions": ["..."]
}

Resume:
${resumeText}
`,
        },
      ],
    });

    // Send result to frontend
    res.json({
      analysis: aiResponse.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
