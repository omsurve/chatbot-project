const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [
    {
      text: String,        // The option text
      nextQuestionId: mongoose.Schema.Types.ObjectId, // The next question reference
    }
  ]
});

module.exports = mongoose.model('Question', questionSchema);
