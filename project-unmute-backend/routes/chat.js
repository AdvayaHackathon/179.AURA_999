const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = process.env.GEMINI_API_KEY;

router.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: message }]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const botReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
    res.json({ reply: botReply });

  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    res.status(500).json({ reply: 'Error talking to Gemini API.' });
  }
});

module.exports = router;
