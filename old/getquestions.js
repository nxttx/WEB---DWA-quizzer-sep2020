expressApp.get("/quizzer/:gamepin/:category", async (req, res) => {
  let randomQuestions = [];
  Questions.countDocuments({ category: req.params.category }).exec(function (
    err,
    count
  ) {
    for (let i = 0; i < 1; i++) {
      var random = Math.floor(Math.random() * count);
      Questions.findOne()
        .skip(random)
        .exec(function (err, result) {
          if (randomQuestions[result]) {
            i--;
            console.log("bestaat al");
          } else {
            randomQuestions.push(result);
          }
        });
    }
  });
  console.log(randomQuestions);
  await Quiz.updateOne(
    { gamepin: req.params.gamepin },
    { $push: { questions: randomQuestions } }
  );
  res.send("done");
});
