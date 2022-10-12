import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { openWebSocket, getWebSocket } from './serverCommunication';
import Home from "./Home";
import NotFound from "./NotFound";
import WaitPage from "./WaitPage";
import QuestionPage from "./QuestionPage";
import QuestionWaitPage from "./QuestionWaitPage";
import EndPage from './EndPage';


export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gamePin: null,
      redirect: null,
      gameState: { questions: 1, round: 1 },
      teamName: "",
      question: "",
      awnser: "",
    }
    this.setGamePin = this.setGamePin.bind(this);

    this.joinGame = this.joinGame.bind(this);
    this.sendAwnser = this.sendAwnser.bind(this);
  }

  setGamePin(newPin) {
    this.setState({ gamePin: newPin });
  }
  setRedirect(to) {
    this.setState({ redirect: to });
  }

  async joinGame(gamePin, name) {
    console.log(gamePin, name);

    try {
      const response = await fetch('http://localhost:4000/quizzer/' + gamePin + "/teams/" + name, {
        method: 'put',
      });
      console.log(response.status);
      switch (response.status) {
        case 201:
          //now set the state, websocket and rederect
          this.setState({ gamePin: gamePin, teamName: name });
          let ws = getWebSocket();
          ws.send(JSON.stringify({ type: "handshake", username: "Team" + this.state.gamePin }));
          this.setState({ redirect: '/' + this.state.gamePin + '/waitpage' });
          break;
        case 409:
          alert(name + " is al in gebruik. Kies een andere naam");
          break;
        case 404:
          alert(gamePin + " bestaat niet.");
          break;
        default:
          alert("Er is iets mis gegaan. Probeer het later opnieuw.");
          break;
      }


    }
    catch (err) {
      console.log(err)
      alert("Er is iets mis gegaan. Probeer het later opnieuw.");
    }

  }

  async sendAwnser(awnser) {
    try {
      const response = await fetch('http://localhost:4000/quizzer/' + this.state.gamePin + "/teams/" + this.state.teamName + "/answers/" + awnser, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      });
      console.log(response.status);
      this.setState({
        awnser: awnser,
        redirect: '/' + this.state.gamePin + '/questionWaitPage'
      });
    }
    catch (err) {
      console.log(err)
      alert("Er is iets mis gegaan. Probeer het later opnieuw.");
    }
  }


  componentDidMount() {
    console.log("Open new webSocket");
    let ws = openWebSocket();
    ws.onerror = () => {
      console.log('WebSocket error');
      this.setState({ webSocketConnection: false });
    }
    ws.onopen = () => {
      console.log('WebSocket connection established');

    }
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    }
    ws.onmessage = (msg) => { //this processes the incomming message
      let message = JSON.parse(msg.data);
      console.log(message);
      switch (message.type) {
        case "handshake":
          console.log(message.body);
          break;
        case "TEAM-Removed":
          if (message.teamName === this.state.teamName) {
            this.setState({
              gamePin: null,
              redirect: '/',
              gameState: { questions: 1, round: 1 },
              teamName: "",
            })
          }
          break;
        case "TEAM-quizStart":
          console.log(message);
          this.setState({
            question: message.Question,
            redirect: '/' + this.state.gamePin + '/question',
            sendAnswer: "",
          })
          break;
        case "TEAM-quizDone":
          console.log(message.score);
          console.log(message.score.length);
          let score = message.score.teams;
          for(let i = 0; i< score.length; i++){
            console.log(this.state.teamName + ' === '+  score[i].name)
            if(this.state.teamName === score[i].name)
            this.setState({
              redirect: '/end',
              score: score[i].points
            })
          }
          this.setState({
            redirect: '/end',
          })

          break;
        case "TEAM-questionClosed":
          this.setState({ redirect: '/' + this.state.gamePin + '/waitpage' });
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
            <Home joinGame={this.joinGame} />
          )} />
          <Route exact path="/:gamepin/waitpage" render={() => (
            <WaitPage
              setRedirect={this.setRedirect.bind(this)}
              stateGamePin={this.state.gamePin}
              question={this.state.question}
            />
          )} />
          <Route exact path="/:gamepin/question" render={() => (
            <QuestionPage
              setRedirect={this.setRedirect.bind(this)}
              stateGamePin={this.state.gamePin}
              question={this.state.question}
              sendAwnser={this.sendAwnser.bind(this)}
            />
          )} />
          <Route exact path="/:gamepin/questionWaitPage" render={() => (
            <QuestionWaitPage
              setRedirect={this.setRedirect.bind(this)}
              stateGamePin={this.state.gamePin}
              question={this.state.question}
              sendAwnser={this.sendAwnser.bind(this)}
              canSendAnswer={this.canSendAnswer}
            />
          )} />
          <Route exact path="/end" render={() => (
            <EndPage
              score={this.state.score}
            />
          )} />

          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
