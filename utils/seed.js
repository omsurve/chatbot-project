const mongoose = require('mongoose');
const FAQ = require('../models/faq');
mongoose.connect('mongodb://127.0.0.1:27017/chatbot');

const seedFAQs = async () => {
  await FAQ.deleteMany({});
  await FAQ.create([
    { question: 'What is the admission fee?', answer: '$500 per semester.' },
    { question: 'How to apply?', answer: 'Visit the college website and fill the form.' },
  ]);
  console.log('FAQs seeded');
  mongoose.connection.close();
};

seedFAQs();
