const express = require("express");
const multer = require("multer");
const fs = require("fs");
const Groq = require("groq-sdk");

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const upload = multer({ dest: "uploads/" });

router.post("/analyze-resume", upload.single("resume"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);

    const pdfParseLib = require("pdf-parse");
    const pdfParse = pdfParseLib.default || pdfParseLib;
    const pdfData = await pdfParse(dataBuffer);
    const resumeText = pdfData.text;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a professional resume reviewer. Always respond with valid JSON only, no extra text.",
        },
        {
          role: "user",
          content: `
Analyze this resume and return ONLY JSON in this exact format:

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

    const text = response.choices[0].message.content;
    const cleanText = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleanText);

    res.json({ analysis: JSON.stringify(parsed) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
