import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { openWebSocket } from './serverCommunication';
import Home from "./Home";
import QuestionInfo from "./QuestionInfo";
import Scoreboard from "./Scoreboard"
import NotFound from "./NotFound";


export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gamePin: null,
      redirect: null,
      question: { cat: null, question: null, answer:null },
      gameState: { question: 1, round: 1 },
      teams: []
    }
    this.setGamePin = this.setGamePin.bind(this);
  }

  setGamePin(newPin) {
    this.setState({ gamePin: newPin });
  }


  componentDidMount() {
    console.log("Open new webSocket");
    let ws = openWebSocket();
    ws.onerror = () => {
      console.log('WebSocket error');
      this.setState({ webSocketConnection: false })
    }
    ws.onopen = () => {
      console.log('WebSocket connection established');
      ws.send(JSON.stringify({ type: "handshake", username: "Scoreboard" + this.state.gamePin }));
    }
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    }
    ws.onmessage = (msg) => { //this processes the incomming message
      let message = JSON.parse(msg.data);
      console.log(message)
      switch (message.type) {
        case "handshake":
          console.log(message.body);
          break;
        case "Scoreboard-QuestionInfo":

          console.log('Lets start question: ' + message.gameState.question + ', Round: ' + message.gameState.round)
          this.setState({
            teams: [],
            question: message.question,
            gameState: message.gameState
          })
          this.forceUpdate();
          this.setState({ redirect: '/' + this.state.gamePin + '/questioninfo' });
          break;
        case "Scoreboard-teamSubmit":
          console.log(message.teamName + " has submitted.")
          //Check if team is allready loaded. If so remove that team and add the new value. 
          let removeIndex = this.state.teams.findIndex(obj => {
            return obj.teamName === message.teamName
          })
          if (removeIndex !== -1) {
            this.state.teams.splice(removeIndex, 1);
          }
          this.setState({
            teams: [{ teamName: message.teamName, teamPoints: message.teamPoints.points, answerIsCorrect: message.answerIsCorrect }, ...this.state.teams]
          })
          break;
        case "Scoreboard-QuestionFinished":
          console.log("Game is finished.")
          this.setState({ redirect: '/' + this.state.gamePin + '/questionending' });
          let score = message.score.teams
          console.log(typeof score, score)
          let newteam = [];
          for (let element of score){
            newteam.push({teamName: element.name, teamPoints: element.points})
          }
          this.setState({
            teams : newteam,
            question: null,
            gameState: null,
          })
          break;
        default:
          break;
      }
    }
  }



  render() {
    console.log(this.state);
    if (this.state.redirect) {
      let redirect = this.state.redirect
      this.setState({ redirect: null })
      return <Router><Redirect to={redirect} /></Router>
    }



    return (
      <Router>
        <Switch>
          <Route exact path="/:gamepin" render={() => (
            <Home setGamePin={this.setGamePin.bind(this)} stateGamePin={this.state.gamePin} />
          )} />

          <Route exact path="/:gamepin/questioninfo" render={() => (
            <QuestionInfo question={this.state.question} gameState={this.state.gameState} teams={this.state.teams} />
          )} />

          <Route exact path="/:gamepin/questionending" render={() => (
            <Scoreboard teams={this.state.teams} />
          )} />

          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
