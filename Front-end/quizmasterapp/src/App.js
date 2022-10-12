import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { openWebSocket, getWebSocket } from './serverCommunication';
import Home from "./Home";
import Acceptteams from "./Acceptteams";
import NotFound from "./NotFound";
import SelectCategory from './SelectCategory';
import SelectQuestion from './SelectQuestion';
import AwaitAwnsers from './AwaitAwnsers';
import Awnsers from './Awnsers';
import EndGame from './EndGame';
import Scoreboard from './Scoreboard';


export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gamePin: null,
      quizmaster: null,
      teams: [],
      categories: [],
      currentCategory: null,
      questions: [],
      currentQuestion: {},
      gamestate: { question: 11, round: 1 },
      amountOfAwnsers: 0,
      teamsWithPoints: [],
    }

    this.createGame = this.createGame.bind(this);
    this.removeTeam = this.removeTeam.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
    this.selectQuestion = this.selectQuestion.bind(this);
    this.endQuestion = this.endQuestion.bind(this);
    this.handleAwnserChange = this.handleAwnserChange.bind(this)
    this.getNewQuestions = this.getNewQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleNewRoud = this.handleNewRoud.bind(this);
    this.handleGameEnd = this.handleGameEnd.bind(this);
  }

  setRedirect(to) {
    this.setState({ redirect: to });
  }

  async createGame(name) {
    let data;
    try {
      const response = await fetch('http://localhost:4000/quizzer/creategame/' + name);
      data = await response.json()
      console.log(data);

      //now set the state, websocket and rederect
      this.setState({ gamePin: data.Gamepin, quizmaster: data.Quizmaster })
      let ws = getWebSocket();
      ws.send(JSON.stringify({ type: "handshake", username: "Quizmaster" + this.state.gamePin }));
      this.setState({ redirect: '/' + this.state.gamePin + '/acceptteams' });


      //Get categories
      const categories = await fetch('http://localhost:4000/questionDB/categories');
      let categoriesData = await categories.json()
      this.setState({ categories: categoriesData });
    }
    catch (err) {
      console.log(err)
      alert("Er is iets mis gegaan. Probeer het later opnieuw.")
    }
  }

  async removeTeam(teamName) {
    console.log(teamName)
    console.log(this.state.teams)
    try {
      await fetch('http://localhost:4000/quizzer/' + this.state.gamePin + '/teams/' + teamName, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      });

      //now Remove team from state

      let removeIndex = this.state.teams.findIndex(obj => {
        return obj.teamName === teamName
      })
      if (removeIndex !== -1) {
        console.log(this.state.teams.splice(removeIndex, 1));
      }
      this.setState({ teams: [...this.state.teams] })
    }
    catch (err) {
      console.log(err)
      alert("Er is iets mis gegaan. Probeer het later opnieuw.")
    }
  }

  async selectCategory(cat) {
    try {
      this.setState({ currentCategory: cat })
      //put cat in database:
      await fetch('http://localhost:4000/quizzer/' + this.state.gamePin + '/category/' + cat, {
        method: 'put',
      })

      // get question
      this.getNewQuestions()

      this.setRedirect("/" + this.state.gamePin + "/selectQuestion")
    } catch (err) {
      alert("something went wrong")
    }
  }

  async getNewQuestions() {
    // get question
    const question = await fetch('http://localhost:4000/quizzer/' + this.state.gamePin + '/questions/' + this.state.currentCategory);
    let questionData = await question.json()
    this.setState({ questions: questionData });
  }

  async selectQuestion(questionObject) {
    try {
      this.setState({ currentQuestion: questionObject })
      //put current question in database:
      await fetch('http://localhost:4000/quizzer/' + this.state.gamePin + '/chosenquestion/', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify([questionObject, this.state.gamestate]),
      })

      // Set every answer to an empty string:
      // this is dirty but somehow it works :?
      this.state.teams.map(obj => obj.awnser = "")

      // reset count awnser:
      this.setState({ amountOfAwnsers: 0 });

      this.setRedirect("/" + this.state.gamePin + "/awaitawnsers")
    } catch (err) {
      alert("Something went wrong.")
    }
  }

  async endQuestion() {

    try {
      //put current question in database:
      await fetch('http://localhost:4000/quizzer/' + this.state.gamePin + '/question/closed/', {
        method: 'put',
      })

      this.setRedirect("/" + this.state.gamePin + "/awnsers")
    } catch (err) {
      alert("Something went wrong.")
    }

  }

  async handleAwnserChange(teamName, isBoolean) {
    try {

      //change team isCorrect
      let oldTeamObject = null;

      let removeIndex = this.state.teams.findIndex(obj => {
        return obj.teamName === teamName
      })
      if (removeIndex !== -1) {
        console.log(removeIndex)
        oldTeamObject = this.state.teams[removeIndex];
        console.log(this.state.teams.splice(removeIndex, 1));
      }
      oldTeamObject.isCorrect = isBoolean
      this.setState({ teams: [oldTeamObject, ...this.state.teams] })

      const object = {
        _id: this.state.currentQuestion._id,
        question: this.state.currentQuestion.question,
        answer: this.state.currentQuestion.answer,
        isCorrect: isBoolean,
        teamAnswer : oldTeamObject.awnser,
      }
      await fetch('http://localhost:4000/quizzer/' + this.state.gamePin + '/teams/' + teamName + '/isCorrect/', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(object),
      })



    } catch (err) {
      alert("Something went wrong.")
    }
  }

  async nextQuestion() {
    this.setState({
      gamestate: {
        question: this.state.gamestate.question + 1, round: this.state.gamestate.round
      }
    })
    this.getNewQuestions()
    this.setRedirect("/" + this.state.gamePin + "/selectQuestion")
  }

  async handleNewRoud() {
    const response = await fetch('http://localhost:4000/quizzer/' + this.state.gamePin + "/nextround", {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    });
    console.log(response.status);
    this.setState({
      gamestate: {
        question: 1, round: this.state.gamestate.round + 1
      }
    })

    let toRemoveIndex = this.state.categories.findIndex(obj => {
      return obj === this.state.currentCategory
    })
    if (toRemoveIndex !== -1) {
      this.state.categories.splice(toRemoveIndex, 1);
    }

    this.setRedirect("/" + this.state.gamePin + "/selectcat")
  }

  async handleGameEnd() {
    // Create fetch for ending the game.
    // fetch points of players. 
    const response = await fetch('http://localhost:4000/quizzer/' + this.state.gamePin + '/closed', {
      method: 'put',
    })
    console.log(response.status);
    let teamPointsData = await response.json()
    this.setState({ teamsWithPoints: teamPointsData });

    // rederect
    this.setRedirect("/" + this.state.gamePin + "/end")
  }

  async componentDidMount() {
    console.log("Open new webSocket");
    let ws = openWebSocket();
    ws.onerror = () => {
      console.log('WebSocket error');
      this.setState({ webSocketConnection: false })
    }
    ws.onopen = () => {
      console.log('WebSocket connection established');
    }
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    }
    ws.onmessage = (msg) => { //this processes the incomming message
      let message = JSON.parse(msg.data);
      switch (message.type) {
        case "handshake":
          console.log(message.body);
          break;
        case "quizMaster-newTeam":
          console.log(message.teamName + " has Enterd.")
          //Check if team is allready loaded. If so remove that team and add the new value. 
          let removeIndex = this.state.teams.findIndex(obj => {
            return obj.teamName === message.teamName
          })
          if (removeIndex !== -1) {
            this.state.teams.splice(removeIndex, 1);
          }
          this.setState({
            teams: [{
              teamName: message.teamName,
              awnser: null,
              isCorrect: false,
            }, ...this.state.teams]
          })
          break;
        case "quizMaster-newAnswer":
          console.log(message.teamName + " has answerd.")
          //Check if team is allready loaded. If so remove that team and add the new value. 

          let toRemoveIndex = this.state.teams.findIndex(obj => {
            return obj.teamName === message.teamName
          })
          if (toRemoveIndex !== -1) {
            this.state.teams.splice(toRemoveIndex, 1);
          }
          this.setState({
            teams: [{
              teamName: message.teamName,
              awnser: message.answer,
              isCorrect: false,
            }, ...this.state.teams]
          })

          // count amout of awnsers

          let count = 0;
          this.state.teams.forEach((v) => (v.awnser !== "" && count++));
          this.setState({ amountOfAwnsers: count });


          break;
        default:
          break;
      }
    }
  }



  render() {
    if (this.state.redirect) {
      let redirect = this.state.redirect
      this.setState({ redirect: null })
      return <Router><Redirect to={redirect} /></Router>
    }

    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => (
            <Home createGame={this.createGame.bind(this)} />
          )} />

          <Route exact path="/:gamepin/acceptteams" render={() => (
            <Acceptteams
              teams={this.state.teams}
              removeTeam={this.removeTeam.bind(this)}
              setRedirect={this.setRedirect.bind(this)}
            />
          )} />

          <Route exact path="/:gamepin/selectcat" render={() => (
            <SelectCategory
              categories={this.state.categories}
              selectCategory={this.selectCategory.bind(this)}
              gamestate={this.state.gamestate}
            />
          )} />

          <Route exact path="/:gamepin/selectQuestion" render={() => (
            <SelectQuestion
              questions={this.state.questions}
              selectQuestion={this.selectQuestion.bind(this)}
              gamestate={this.state.gamestate}
            />
          )} />

          <Route exact path="/:gamepin/awaitawnsers" render={() => (
            <AwaitAwnsers
              amountOfTeams={this.state.teams.length}
              amountOfAwnsers={this.state.amountOfAwnsers}
              currentQuestion={this.state.currentQuestion.question}
              endQuestion={this.endQuestion.bind(this)}
              gamestate={this.state.gamestate}
            />
          )} />
          <Route exact path="/:gamepin/awnsers" render={() => (
            <Awnsers
              Awnsers={this.state.teams}
              currentQuestion={this.state.currentQuestion}
              handleAwnserChange={this.handleAwnserChange.bind(this)}
              gamestate={this.state.gamestate}
              nextQuestion={this.nextQuestion.bind(this)}
              setRedirect={this.setRedirect.bind(this)}
            />
          )} />
          <Route exact path="/:gamepin/endgame" render={() => (
            <EndGame
              gamestate={this.state.gamestate}
              nextRound={this.handleNewRoud.bind(this)}
              handleGameEnd={this.handleGameEnd.bind(this)}
            />
          )} />
          <Route exact path="/:gamepin/end" render={() => (
            <Scoreboard
              teamsWithPoints={this.state.teamsWithPoints}
            />
          )} />

          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
