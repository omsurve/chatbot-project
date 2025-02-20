const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const axios = require('axios');
const GEMINI_API_KEY = 'AIzaSyDCpGJmDZhTWZarLSliuC7johJicllNVs4';


router.get("/generate-question", async (req, res) => {
    try {
        const question = await Question.aggregate([{ $sample: { size: 1 } }]);
        if (!question.length) return res.json({ error: "No questions found!" });

        res.json({
            text: question[0].text,
            options: question[0].options,
            answer: question[0].answer
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});
router.post('/ask', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const geminiResponse = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: userMessage }] }]
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        const botReply = geminiResponse.data.candidates[0]?.content?.parts[0]?.text || "No response from Gemini.";

        res.json({ reply: botReply, options: ["More Info", "Another Question"] });

    } catch (error) {
        console.error("🔥 Gemini API Error:", error.message);
        res.status(500).json({ error: "Failed to fetch response from Gemini API" });
    }
});


module.exports = router;
