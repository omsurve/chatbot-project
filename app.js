require('dotenv').config();
const axios = require('axios');
const express = require('express');
const app = express();
const path = require('path');



const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser'); // Import body-parser if installed
app.use(bodyParser.json());
 
const seed = require('./utils/seed');


const chatRoutes = require('./routes/chat');
dotenv.config(); // Load environment variables from .env

console.log('MongoDB URI:', process.env.DB_URI);
//Connecting with Database for First time
try
{
  mongoose
  .connect(process.env.DB_URI, {
  })
  console.log("Database is connnected!")
}catch(error){
  console.log("Database is failed to connect!")
}
  

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

  
// Middleware
// app.set('view engine', 'ejs');
app.use(express.json());
// Serve static files from the public folder
app.use('/public', express.static(path.join(__dirname, 'public')));
// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'chat.html'));
});
app.use(chatRoutes);

// Route for handling chatbot questions
const router = express.Router();

const GEMINI_API_KEY = 'AIzaSyDCpGJmDZhTWZarLSliuC7johJicllNVs4';

app.post('/chat/ask', async (req, res) => {
  try {
      const userMessage = req.body.message;

      if (!userMessage) {
          console.error("🚨 No message received in request body");
          return res.status(400).json({ error: "No message provided" });
      }

      // Gemini API call
      const geminiResponse = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
            contents: [{ parts: [{ text: userMessage }] }]
        },
        {
            headers: { 'Content-Type': 'application/json' }
        }
      );

      // Extracting response correctly
      const botReply = geminiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text || "No valid response.";
      
      res.json({ reply: botReply, options: [] }); // options can be dynamically added if needed

  } catch (error) {
      console.error("🔥 Gemini API Error:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to fetch response from Gemini API" });
  }
});



module.exports = router;



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
