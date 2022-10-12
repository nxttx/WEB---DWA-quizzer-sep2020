const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
  gamepin: Number,
  quizmaster: String,
  teams: [
    {
      name: String,
      points: { type: Number, default: 0 },
      correct: {type: Number, default: 0},
      processed: {type: Boolean, default: false},
      answers: [
        {
          _id: String,
          question: String,
          answer: String,
          givenAnswer: String,
          isCorrect: { type: Boolean, default: false },
        },
      ],
    },
  ],
  categories: [],
  questions: [],
  date: { type: Date, default: Date.now },
  closed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Quiz", quizSchema);
