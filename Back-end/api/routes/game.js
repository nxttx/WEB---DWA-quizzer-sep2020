const { DocumentProvider } = require("mongoose");
const Quiz = require("../models/databaseSchema");
const clients = require("../modules/clients");
let lookup = clients.lookup;

module.exports = function (expressApp) {

  /**
   * @type ExpressSocket.
   * @description Creates a new game
   * @param quizmastername
   * @body empty
   * @returns {Object} - Gamepin, Quizmaster
   * @async
   * @memberof app
   */
  expressApp.get("/quizzer/creategame/:quizmaster", async (req, res) => {
    let quizPin = 000000;
    console.log();
    while (quizPin == 000000 || (await Quiz.exists({ gamepin: quizPin }))) {
      quizPin = Math.floor(100000 + Math.random() * 900000);
    }
    res.json({ Gamepin: quizPin, Quizmaster: req.params.quizmaster });

    const quiz = new Quiz({
      gamepin: quizPin,
      quizmaster: req.params.quizmaster,
    });
    quiz.save();
  });

  /**
   * @type ExpressSocket.
   * @description Puts the game into the next round and calculates the score
   * @param gamepin
   * @body empty
   * @returns [{teamName, points}]  - points DESC
   * @async
   * @memberof app
   */
  expressApp.put("/quizzer/:gamepin/nextround", async (req, res) => {
    let gamepin = Number(req.params.gamepin);
    let amountofTeams = (
      await Quiz.distinct("teams.name", { gamepin: gamepin })
    ).length;
    let pointcounter = 0;
    let pointAllocation = 4;
    for (let i = 0; i < amountofTeams; i++) {
      if (pointcounter == 1) {
        pointAllocation = 2;
      } else if (pointcounter == 2) {
        pointAllocation = 1;
      } else if (pointcounter >= 3) {
        pointAllocation = 0.1;
      }
      pointcounter++;
      await Quiz.updateMany(
        { gamepin: gamepin, "teams.processed": false },
        { $push: { teams: { $each: [], $sort: { correct: 1 } } } }
      );
      await Quiz.updateOne(
        { gamepin: gamepin, "teams.processed": false },
        {
          $inc: { "teams.$.points": pointAllocation },
          $set: { "teams.$.correct": 0, "teams.$.processed": true },
        }
      );
    }
    res.json(
      await Quiz.find(
        { gamepin: gamepin },
        { _id: 0, "teams.name": 1, "teams.points": 1 }
      )
    );
  });

  /**
   * @type ExpressSocket.
   * @description Sets the current game to closed
   * @param gamepin
   * @body empty
   * @returns [{teamName, points}]  - points DESC
   * @returns websocket connection to all clients that the quiz is over
   * @async
   * @memberof app
   */
  expressApp.put("/quizzer/:gamepin/closed", async (req, res) => {
    let gamepin = Number(req.params.gamepin);
    let amountofTeams = (
      await Quiz.distinct("teams.name", { gamepin: gamepin })
    ).length;
    let pointcounter = 0;
    let pointAllocation = 4;
    for (let i = 0; i < amountofTeams; i++) {
      if (pointcounter == 1) {
        pointAllocation = 2;
      } else if (pointcounter == 2) {
        pointAllocation = 1;
      } else if (pointcounter >= 3) {
        pointAllocation = 0.1;
      }
      pointcounter++;
      await Quiz.updateMany(
        { gamepin: gamepin, "teams.processed": false },
        { $push: { teams: { $each: [], $sort: { correct: 1 } } } }
      );
      await Quiz.updateOne(
        { gamepin: gamepin, "teams.processed": false },
        {
          $inc: { "teams.$.points": pointAllocation },
          $set: {
            closed: true,
            "teams.$.correct": 0,
            "teams.$.processed": true,
          },
        }
      );
    }
    await Quiz.updateMany(
      { gamepin: gamepin },
      { $push: { teams: { $each: [], $sort: { points: 1 } } } }
    );
    let quizPoints = await Quiz.findOne(
      { gamepin: gamepin },
      { _id: 0, "teams.name": 1, "teams.points": 1 }
    );
    res.json(quizPoints);

    lookup[clients.findWs(req, "Scoreboard")].send(
      JSON.stringify({
        type: "Scoreboard-QuestionFinished",
        score: quizPoints,
      })
    );
    // send closed to teams:
    let searchMultiple = lookup.map((obj, indx) => {
      if (obj.userName === "Team" + req.params.gamepin) {
        return indx;
      }
    });
    for (let i = 0; i < searchMultiple.length; i++) {
      if (searchMultiple[i] !== undefined) {
        lookup[searchMultiple[i]].send(
          JSON.stringify({
            type: "TEAM-quizDone",
            score: quizPoints,
          })
        );
      }
    }
  });
};
