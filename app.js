const express = require('express');
const app = express();

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser'); // Import body-parser if installed
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
  
// Middleware to parse JSON data
app.use(express.json());
// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

  
// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => res.render('chat'));

app.use('/chat', chatRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
