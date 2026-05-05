const express = require("express");
const multer = require("multer");
const fs = require("fs");
const Groq = require("groq-sdk");

const router = express.Router();

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

console.log("✅ Groq API Key initialized:", !!process.env.GROQ_API_KEY);

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" });

// ===================== ANALYZE RESUME =====================
router.post("/analyze-resume", upload.single("resume"), async (req, res) => {
  try {
    console.log("📄 Analyzing resume...");

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);

    const pdfParseLib = require("pdf-parse");
    const pdfParse = pdfParseLib.default || pdfParseLib;
    const pdfData = await pdfParse(dataBuffer);
    const resumeText = pdfData.text;

    // Store resume text for later use
    req.app.locals.lastResumeText = resumeText;

    console.log("🤖 Calling Groq API for resume analysis...");

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
  "suggestions": ["..."],
  "skills": ["React", "Node.js", "..."],
  "level": "beginner or intermediate or advanced",
  "missingSkills": ["Docker", "AWS", "..."]
}

Resume:
${resumeText}
`,
        },
      ],
    });

    const text = response.choices[0].message.content;
    console.log("✅ Groq response received for analysis");

    const cleanText = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleanText);

    console.log("✅ Analysis completed successfully");
    res.json({ analysis: JSON.stringify(parsed) });
  } catch (error) {
    console.error("❌ Analyze Resume Error:", error.message);
    console.error("Full error:", error);
    res.status(500).json({ error: error.message || "Resume analysis failed" });
  }
});

// ===================== INTERVIEW FEEDBACK =====================
router.post("/interview-feedback", async (req, res) => {
  try {
    console.log("\n📝 ===== INTERVIEW FEEDBACK REQUEST =====");
    console.log("Received data:", req.body);

    const { question, topic, difficulty, level, answer } = req.body;

    // Validate required fields
    if (!question || !answer) {
      console.error("❌ Validation failed: Missing required fields");
      return res.status(400).json({
        error: "Missing required fields: question and answer",
      });
    }

    console.log("✅ Validation passed");
    console.log("🔑 Groq API Key exists:", !!process.env.GROQ_API_KEY);
    console.log("🤖 Calling Groq API for feedback evaluation...");

    const groqResponse = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are an expert technical interviewer. Always respond with valid JSON only, no extra text. No markdown, no code blocks.",
        },
        {
          role: "user",
          content: `
Evaluate this interview answer STRICTLY and return ONLY JSON (no markdown, no backticks):

{
  "feedback": "2-3 sentence constructive feedback on the answer",
  "score": 4
}

Score must be 1-5 (integer only).

Question: ${question}
Topic: ${topic}
Difficulty: ${difficulty}
Candidate Level: ${level}
Answer: ${answer}
`,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    console.log("✅ Groq API responded successfully");

    const text = groqResponse.choices[0].message.content;
    console.log("📋 Raw response from Groq:", text);

    // Clean the response - remove markdown code blocks if present
    const clean = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("🧹 Cleaned response:", clean);

    // Parse JSON
    const parsed = JSON.parse(clean);

    // Validate parsed response
    if (!parsed.feedback || !parsed.score) {
      throw new Error("Invalid response format: missing feedback or score");
    }

    // Ensure score is a number between 1-5
    parsed.score = Math.min(5, Math.max(1, parseInt(parsed.score) || 3));

    console.log("✅ Parsed and validated feedback:", parsed);
    console.log("===== END FEEDBACK REQUEST =====\n");

    res.json(parsed);
  } catch (error) {
    console.error("\n❌ ===== FEEDBACK ERROR =====");
    console.error("Error message:", error.message);
    console.error("Error type:", error.constructor.name);
    console.error("Full error:", error);
    console.error("===== END ERROR =====\n");

    res.status(500).json({
      error: error.message || "Feedback generation failed",
    });
  }
});

// ===================== GENERATE PERSONALIZED QUESTIONS =====================
router.post(
  "/generate-questions",
  upload.single("resume"),
  async (req, res) => {
    try {
      console.log("📋 Generating personalized questions...");

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const filePath = req.file.path;
      const dataBuffer = fs.readFileSync(filePath);

      const pdfParseLib = require("pdf-parse");
      const pdfParse = pdfParseLib.default || pdfParseLib;
      const pdfData = await pdfParse(dataBuffer);
      const resumeText = pdfData.text;

      console.log("🤖 Calling Groq API to generate questions...");

      const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are an expert technical interviewer. Always respond with valid JSON only, no extra text. No markdown code blocks.",
          },
          {
            role: "user",
            content: `
Based on this resume, generate 8 personalized interview questions.
Focus on the skills, projects, and experience mentioned in the resume.

Return ONLY JSON (no markdown) in this exact format:
{
  "name": "candidate name or Unknown",
  "level": "beginner or intermediate or advanced",
  "skills": ["skill1", "skill2"],
  "questions": [
    {
      "question": "...",
      "topic": "React / Node / DSA / etc",
      "difficulty": "Easy or Medium or Hard"
    }
  ]
}

Resume:
${resumeText}
`,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });

      const text = response.choices[0].message.content;
      console.log("✅ Groq response received for questions");

      const cleanText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      const parsed = JSON.parse(cleanText);

      // Ensure we have 8 questions
      if (!parsed.questions || parsed.questions.length === 0) {
        throw new Error("No questions generated");
      }

      console.log(
        `✅ Generated ${parsed.questions.length} questions successfully`,
      );
      res.json(parsed);
    } catch (error) {
      console.error("❌ Generate Questions Error:", error.message);
      console.error("Full error:", error);
      res.status(500).json({
        error: error.message || "Question generation failed",
      });
    }
  },
);

module.exports = router;
