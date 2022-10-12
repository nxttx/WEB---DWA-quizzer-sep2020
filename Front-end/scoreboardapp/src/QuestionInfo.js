import React from "react";
import teamIndex from "./teamIndex"

export default function QuestionInfo(props) {

  let answerIsCorrect=null;

  let teams = props.teams;
  let teamlist= teams.map(team => {
    if (team.answerIsCorrect) {
      answerIsCorrect=        
        <h3 className="subtitle is-2">
          {props.question.answer}
        </h3>;
    }
    return (teamIndex(team))
  })
  console.log(props.question);

  

  return (<div>
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <h1 className="navbar-item title">
          Question: {props.gameState.question} / 12
        </h1>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">
          <h1 className="navbar-item title">
            Round: {props.gameState.round} / 3
        </h1>
        </div>
      </div>
    </nav>
    <section className="hero is-info is-fullheight-with-navbar">
      <div className="container has-text-centered">
        <br /><br />
        <h2 className="subtitle is-2">
          {props.question.cat}
        </h2>
        <h1 className="title is-1">
          {props.question.question}
        </h1>
        {answerIsCorrect}
        <br/>
        {teamlist}


      </div>
    </section>
  </div>
  );
}
