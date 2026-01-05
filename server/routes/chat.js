// server/routes/chat.js
const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Define the system prompt (MindCare personality)
    const prompt = `
      You are MindCare, a compassionate mental health support companion. 
      Your goal is to listen, validate feelings, and offer gentle encouragement. 
      You are NOT a doctor. If a user expresses intent of self-harm, immediately provide emergency resources.
      
      User: ${message}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });

  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ message: "Error talking to AI" });
  }
});

module.exports = router;