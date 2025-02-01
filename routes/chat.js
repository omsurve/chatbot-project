const express = require('express');
const router = express.Router();


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


module.exports = router;
