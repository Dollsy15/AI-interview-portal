const express = require("express");
const router = express.Router();

// SIMPLE TEST CASES
const testCases = [
  { input: 2, expected: 4 },
  { input: 3, expected: 9 },
];

// ⚠️ ONLY FOR JS (safe basic version)
router.post("/run", (req, res) => {
  try {
    let { code } = req.body;

    let passed = 0;

    const testCases = [
      { input: 2, expected: 4 },
      { input: 3, expected: 9 },
    ];

    let userFunc;

    try {
      userFunc = eval(code); // SAFE only for project demo
    } catch (err) {
      return res.json({
        error: "Invalid function format",
      });
    }

    testCases.forEach((tc) => {
      try {
        const output = userFunc(tc.input);
        if (output === tc.expected) passed++;
      } catch (err) {}
    });

    res.json({
      passed,
      total: testCases.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
