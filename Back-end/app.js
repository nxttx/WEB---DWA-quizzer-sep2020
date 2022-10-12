const express = require("express");
const ws = require("ws");
const cors = require("cors");
const http = require("http");
const path = require("path");
const Quiz = require("./api/models/databaseSchema");
const logger = require("./api/modules/logger");
const clients = require("./api/modules/clients");
const Questions = require("./api/models/questionsSchema");
const database = require("./api/modules/dbConnector");
const fs = require("fs");

// Init servers
const expressApp = express();
const httpServer = http.createServer();
const webSocketServer = new ws.Server({
  server: httpServer,
});

// Init CORS
expressApp.use(cors());

// Init middleware
expressApp.use(logger);

// Set static folder
expressApp.use(express.static(path.join(__dirname, "client-side")));

// Init all express routing files
function recursiveRoutes(folderName) {
  fs.readdirSync(folderName).forEach(function (file) {
    let fullName = path.join(folderName, file);
    let stat = fs.lstatSync(fullName);

    if (stat.isDirectory()) {
      recursiveRoutes(fullName);
    } else if (file.toLowerCase().indexOf(".js")) {
      require("./" + fullName)(expressApp);
      console.log("require('" + fullName + "')");
    }
  });
}
recursiveRoutes("api/routes");

// Development Routes
expressApp.get("/dev/all/", async (req, res) => {
  res.json(await Quiz.find({}));
});
expressApp.get("/dev/all/:gamepin", async (req, res) => {
  res.json(await Quiz.find({ gamepin: req.params.gamepin }));
});
// End of Development routes

// htdocs route
/**
 * @type ExpressSocket.
 * @description Redirects to selection page
 * @param empty or a or ab or abc or abcd 
 * @body empty
 * @returns HTML wegpage
 * @async
 * @memberof app
 */
expressApp.get("/", async (req, res) => {
  res.sendFile(__dirname + "/htdocs/index.html");
});

expressApp.get("/:a/", async (req, res) => {
  res.sendFile(__dirname + "/htdocs/"+req.params.a);
});

expressApp.get("/:a/:b/", async (req, res) => {
  res.sendFile(__dirname + "/htdocs/"+req.params.a+"/"+req.params.b);
});
expressApp.get("/:a/:b/:c/", async (req, res) => {
  res.sendFile(__dirname + "/htdocs/"+req.params.a+"/"+req.params.b+"/"+req.params.c);
});

expressApp.get("/:a/:b/:c/:d/", async (req, res) => {
  res.sendFile(__dirname + "/htdocs/"+req.params.a+"/"+req.params.b+"/"+req.params.c+"/"+req.params.d);
});

// End of htdocs route

// Code to setup the websockets
webSocketServer.on("connection", (websocket) => {
  let lookup = clients.lookup;
  console.log("WEBSOCKET CONNECTION CREATED");
  websocket.on("message", (message) => {
    message = JSON.parse(message);
    console.log(message);
    switch (message.type) {
      case "handshake":
        websocket.userName = message.username;
        lookup.push(websocket);
        websocket.send(
          JSON.stringify({
            type: "handshake",
            body: "Handshake accepted. Welcome " + websocket.userName + "!",
          })
        );
        break;
    }
  });

  websocket.on("close", () => {
    console.log("CONNECTION FOR " + websocket.userName + " CLOSED.");
    if (websocket.timeoutObject) {
      clearTimeout(websocket.timeoutObject);
    }
  });
});

// Connect the Express App to all incoming requests on the HTTP server
httpServer.on("request", expressApp);
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () =>
  console.log(`The Server is listening on port ${PORT}.`)
);
