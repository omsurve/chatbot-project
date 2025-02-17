const express = require('express');
const router = express.Router();
const Question = require('../models/Question');



router.post('/', (req, res) => {
  const { question } = req.body;

  if (!question) {
      return res.status(400).json({ error: 'Question is required' });
  }

  // Respond with some logic (e.g., AI response or FAQ)
  res.json({ answer: `You asked: ${question}` });
});

router.post('/ask', async (req, res) => {
  const { question } = req.body;
  try {
    const answer = await getBotResponse(question);
    res.json({ answer });
  } catch (error) {
    console.error('Error with chatbot response:', error);
    res.status(500).json({ answer: "Sorry, something went wrong. Please try again later." });
  }
});

// Route to get a question by ID
router.get('/question/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.json({ error: "Question not found." });
    }
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Route to get the first question
router.get('/question', async (req, res) => {
  try {
    const question = await Question.findOne(); // Get first question
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
