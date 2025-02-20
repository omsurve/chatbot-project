const mongoose = require('mongoose');
const FAQ = require('../models/faq');
const Question = require('../models/Question.js');

const seedQuestions = async () => {
  await Question.deleteMany(); // Clears old data

  const q1 = await Question.create({
    questionText: "Welcome to the chatbot! What do you need help with?",
    options: [
      { text: "Admission Process", nextQuestionId: null },
      { text: "Course Details", nextQuestionId: null },
      { text: "Fees Structure", nextQuestionId: null },
    ]
  });
  const q2 = await Question.create({
    questionText: "Which course are you interested in?",
    options: [
      { text: "B.Tech", nextQuestionId: null },
      { text: "MBA", nextQuestionId: null },
      { text: "Pharmacy", nextQuestionId: null },
    ]
  });
  q1.options[0].nextQuestionId = q2._id; // "Admission Process" leads to q2
  await q1.save();

  console.log("Database Seeded!");
  mongoose.connection.close();
};
// const seedFAQs = async () => {
//   await FAQ.deleteMany({});
//   await FAQ.create([
//     { question: 'What is the admission fee?', answer: '$500 per semester.' },
//     { question: 'How to apply?', answer: 'Visit the college website and fill the form.' },
//   ]);
//   console.log('FAQs seeded');
//   mongoose.connecxtion.close();
// };

// seedFAQs();
seedQuestions();  

