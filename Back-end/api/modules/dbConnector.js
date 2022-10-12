const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://Admin-Glenn:CooleQuiz1@quizzer-shard-00-00.v53vf.azure.mongodb.net:27017,quizzer-shard-00-01.v53vf.azure.mongodb.net:27017,quizzer-shard-00-02.v53vf.azure.mongodb.net:27017/quizzer?ssl=true&replicaSet=atlas-htocgr-shard-0&authSource=admin&retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connection established");
});
