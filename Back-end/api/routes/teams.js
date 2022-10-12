const Quiz = require("../models/databaseSchema");
const clients = require("../modules/clients");
let lookup = clients.lookup;

module.exports = function (expressApp) {
  /**
   * @type ExpressSocket.
   * @description Adds a new team to the game and into the DB
   * @param gamepin, teamname
   * @body empty
   * @returns websocket message to quizmaster with the teamname
   * @async
   * @memberof app
   */
  expressApp.put("/quizzer/:gamepin/teams/:name", async (req, res) => {
    if (!(await Quiz.exists({ gamepin: req.params.gamepin }))) {
      res.sendStatus(404);
    } else if (
      await Quiz.exists({
        $and: [{ gamepin: req.params.gamepin }, { closed: true }],
      })
    ) {
      res.sendStatus(404);
    } else if (
      await Quiz.exists({
        $and: [
          { gamepin: req.params.gamepin },
          { teams: { $elemMatch: { name: req.params.name } } },
        ],
      })
    ) {
      res.sendStatus(409);
    } else {
      await Quiz.updateOne(
        { gamepin: req.params.gamepin },
        { $push: { teams: { name: req.params.name } } }
      );
      res.sendStatus(201);
      lookup[clients.findWs(req, "Quizmaster")].send(
        JSON.stringify({
          type: "quizMaster-newTeam",
          teamName: req.params.name,
        })
      );
    }
  });

  /**
   * @type ExpressSocket.
   * @description Deletes an existing team from the DB
   * @param gamepin, teamname
   * @body empty
   * @returns websocket connection to the removed client letting it know that it got removed
   * @async
   * @memberof app
   */
  expressApp.delete("/quizzer/:gamepin/teams/:name", async (req, res) => {
    await Quiz.updateOne(
      { gamepin: req.params.gamepin },
      { $pull: { teams: { name: req.params.name } } }
    );
    res.sendStatus(200);
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
            type: "TEAM-Removed",
            teamName: req.params.name,
          })
        );
      }
    }
  });

  /**
   * @type ExpressSocket.
   * @description Send a websocket connection when a team submits an answer
   * @param gamepin, teamname, answer
   * @body {_id, question, answer, category}
   * @returns websocket connection to quizmaster with teamname and the teams answer
   * @async
   * @memberof app
   */
  expressApp.put(
    "/quizzer/:gamepin/teams/:name/answers/:answer",
    async (req, res) => {
      lookup[clients.findWs(req, "Quizmaster")].send(
        JSON.stringify({
          type: "quizMaster-newAnswer",
          teamName: req.params.name,
          answer: req.params.answer,
        })
      );

      let allScores = await Quiz.findOne(
        {
          gamepin: req.params.gamepin,
          teams: { $elemMatch: { name: req.params.name } },
        },
        { "teams.points": 1, "teams.name": 1 }
      );
      let specificScore = allScores.teams.find(
        (allScores) => allScores.name === req.params.name
      );
      res.sendStatus(200);
      lookup[clients.findWs(req, "Scoreboard")].send(
        JSON.stringify({
          type: "Scoreboard-teamSubmit",
          teamName: req.params.name,
          teamPoints: specificScore,
          answerIsCorrect: false,
        })
      );
    }
  );
};
