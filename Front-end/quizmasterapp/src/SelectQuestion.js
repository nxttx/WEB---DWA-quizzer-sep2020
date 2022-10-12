import React from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

export default function SelectQuestion(props) {
  let { gamepin } = useParams();

  let questionList = props.questions.map(question => displayQuestion(question))

  function displayQuestion(question) {
    console.log()
    return (<div
      className="notification is-info is-light is-vcentered"
      onClick={() => {
        props.selectQuestion(question)
      }}
      key={"question:" + question.question}
    >{question.question}</div>
    )
  }


  return (<div>
    <Header gamepin={gamepin} gamestate={props.gamestate} />
    <section className="hero is-info is-fullheight-with-navbar">
      <div className="container has-text-centered">
        <br />
        <h1 className="title"> Kies een vraag </h1>
        <br />
        {questionList}
      </div>
    </section>
  </div>);
}