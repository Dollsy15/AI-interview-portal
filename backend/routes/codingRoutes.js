const express = require("express");
const axios = require("axios");
const router = express.Router();

// SIMPLE TEST CASES
const testCases = [
  { input: 2, expected: 4 },
  { input: 3, expected: 9 },
];

router.post("/run", async (req, res) => {
  try {
    let { code } = req.body;
    let passed = 0;

    const testCases = [
      { input: 2, expected: 4 },
      { input: 3, expected: 9 },
    ];

    // Build the code to execute. We append the test cases execution to the user's code.
    const testCode = `
      ${code}
      
      const testCases = [
        { input: 2, expected: 4 },
        { input: 3, expected: 9 }
      ];
      
      let passed = 0;
      testCases.forEach(tc => {
        try {
          // We assume the user's code defines a function. 
          // We'll try to find the first function defined or assume a default name if not specified.
          // Since the original code used eval(code) and then userFunc(tc.input), the code must have evaluated to a function.
          const userFunc = eval(${JSON.stringify(code)});
          if (userFunc(tc.input) === tc.expected) {
            passed++;
          }
        } catch(e) {}
      });
      console.log(passed);
    `;

    const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
      language: "javascript",
      version: "18.15.0",
      files: [
        {
          content: testCode
        }
      ]
    });

    const output = response.data.run.stdout.trim();
    passed = parseInt(output) || 0;

    res.json({
      passed,
      total: testCases.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
