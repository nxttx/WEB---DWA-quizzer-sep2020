const Quiz = require("../models/databaseSchema");
const bodyParser = require("body-parser");
const Questions = require("../models/questionsSchema");
const clients = require("../modules/clients");
let lookup = clients.lookup;

module.exports = function (expressApp) {
  /**
   * @type ExpressSocket.
   * @description Get all available categories existing in QuestionDB
   * @param empty
   * @body empty
   * @returns {Object} - categories
   * @async
   * @memberof app
   */
  expressApp.get("/questionDB/categories", async (req, res) => {
    let categories = await Questions.distinct("category");
    res.json(categories);
  });

  /**
   * @type ExpressSocket.
   * @description Puts the chosen category into the game
   * @param gamepin
   * @body empty
   * @returns
   * @async
   * @memberof app
   */
  expressApp.put(
    "/quizzer/:gamepin/category",
    bodyParser.json(),
    async (req, res) => {
      await Quiz.updateOne(
        { gamepin: req.params.gamepin },
        { $push: { categories: req.body } }
      );
      res.sendStatus(201);
    }
  );

  /**
   * @type ExpressSocket.
   * @description Retrieves 5 random questions from QuestionDB with specific category
   * @param gamepin, category
   * @body empty
   * @returns [{question},{question},{question},{question},{question}] - _id, question, answer, category
   * @async
   * @memberof app
   */
  expressApp.get("/quizzer/:gamepin/questions/:category", async (req, res) => {
    let randomQuestions = [];
    let total = await Questions.countDocuments({
      category: req.params.category,
    });
    for (let i = 0; i < 5; i++) {
      let random = Math.floor(Math.random() * total);
      question = await Questions.findOne({
        category: req.params.category,
      }).skip(random);
      if (
        randomQuestions.some((random) => random.question === question.question)
      ) {
        i--;
      } else if (
        await Quiz.exists({
          $and: [{ gamepin: req.params.gamepin }, { questions: question }],
        })
      ) {
        i--;
      } else {
        randomQuestions.push(question);
      }
    }
    res.json(randomQuestions);
  });

  /**
   * @type ExpressSocket.
   * @description Starts a new question the quizmaster chose
   * @param gamepin
   * @body [{_id, question, answer, category}, { questions, round: 1 }]
   * @returns websocket connection to all team clients with the chosen question
   * @async
   * @memberof app
   */
  expressApp.put(
    "/quizzer/:gamepin/chosenquestion/",
    bodyParser.json(),
    async (req, res) => {
      await Quiz.updateOne(
        { gamepin: req.params.gamepin },
        { $push: { questions: req.body[0] } }
      );
      res.sendStatus(201);
      let searchMultiple = lookup.map((obj, indx) => {
        if (obj.userName === "Team" + req.params.gamepin) {
          return indx;
        }
      });
      for (let i = 0; i < searchMultiple.length; i++) {
        if (searchMultiple[i] !== undefined) {
          lookup[searchMultiple[i]].send(
            JSON.stringify({
              type: "TEAM-quizStart",
              Question: req.body[0].question,
            })
          );
        }
      }
      lookup[clients.findWs(req, "Scoreboard")].send(
        JSON.stringify({
          type: "Scoreboard-QuestionInfo",
          question: {
            cat: req.body[0].category,
            question: req.body[0].question,
            answer: req.body[0].answer,
          },
          gameState: req.body[1],
        })
      );
    }
  );
  /**
   * @type ExpressSocket.
   * @description Quizmaster can decide if a answer is correct or not and can change his mind
   * @param gamepin, teamname
   * @body {_id, question, answer, givenAnswer, isCorrect}
   * @returns websocket connection to the scoreboard
   * @async
   * @memberof app
   */
  expressApp.put(
    "/quizzer/:gamepin/teams/:team/isCorrect/",
    bodyParser.json(),
    async (req, res) => {
      let incrementer = 0;
      let exists = await Quiz.exists({
        $and: [
          { gamepin: req.params.gamepin, "teams.name": req.params.team },
          { "teams.answers._id": req.body._id },
        ],
      });
      if (req.body.isCorrect) {
        incrementer = 1;
      } else if (exists) {
        incrementer = -1;
      }

      if (!exists) {
        await Quiz.updateOne(
          { gamepin: req.params.gamepin, "teams.name": req.params.team },
          {
            $inc: { "teams.$.correct": incrementer },
            $push: { "teams.$.answers": req.body },
            $set: { "teams.$.processed": false },
          }
        );
        res.sendStatus(201);
      } else {
        await Quiz.updateOne(
          { gamepin: req.params.gamepin, "teams.name": req.params.team },
          {
            $pull: { "teams.$.answers": { _id: req.body._id } },
          }
        );

        await Quiz.updateOne(
          { gamepin: req.params.gamepin, "teams.name": req.params.team },
          {
            $inc: { "teams.$.correct": incrementer },
            $push: { "teams.$.answers": req.body },
            $set: { "teams.$.processed": false },
          }
        );
        res.sendStatus(205);
      }

      lookup[clients.findWs(req, "Scoreboard")].send(
        JSON.stringify({
          type: "Scoreboard-teamSubmit",
          teamName: req.params.team,
          teamPoints: "DB GET TEAMPOINTS",
          answerIsCorrect: req.body.isCorrect,
        })
      );
    }
  );

  /**
   * @type ExpressSocket.
   * @description Closes a question
   * @param gamepin
   * @body
   * @returns websocket connection to all team clients
   * @async
   * @memberof app
   */
  expressApp.put(
    "/quizzer/:gamepin/question/closed/",
    bodyParser.json(),
    async (req, res) => {
      res.sendStatus(201);
      let searchMultiple = lookup.map((obj, indx) => {
        console.log(obj.userName);
        if (obj.userName === "Team" + req.params.gamepin) {
          return indx;
        }
      });
      for (let i = 0; i < searchMultiple.length; i++) {
        if (searchMultiple[i] !== undefined) {
          lookup[searchMultiple[i]].send(
            JSON.stringify({
              type: "TEAM-questionClosed",
            })
          );
        }
      }
    }
  );
};
