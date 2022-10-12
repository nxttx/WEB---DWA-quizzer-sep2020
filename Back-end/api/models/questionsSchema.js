const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  question: String,
  answer: String,
  category: String,
});

module.exports = mongoose.model("Questions", questionSchema, "QuestionDB");
