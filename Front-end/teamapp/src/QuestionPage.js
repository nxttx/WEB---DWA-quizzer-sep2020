import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function QuiestionPage(props) {
  let { gamepin } = useParams();
  if (props.stateGamePin !== gamepin) {
    props.setRedirect("/");
  }

  const [antwoord, setAntwoord] = useState("");

  function handleAntwoordChange(e) {
    setAntwoord(e.target.value);
  }
  function handleSubmit(e) {
    props.sendAwnser(antwoord)
    e.preventDefault();
  }



  return (
    <section className="hero is-success is-fullheight is-bold">
      <img src="/logov2.png" alt="Quizzer logo" style={{ maxWidth: 150 + "px" }}></img>
      <div className="hero-body">
        <div className="container has-text-centered">
          <form className="column" onSubmit={handleSubmit}>
            <label className="title is-3">{props.question} </label>
            <br/>
            <div className="control">
              <input
                className="input"
                type="text"
                name="antwoord"
                placeholder="antwoord"
                onChange={handleAntwoordChange}
                value={antwoord}
              />
            </div>
            <br />
            <label>
              <input type="submit" value="Verstuur" className="button is-link" />
            </label>
          </form>
        </div>
      </div>
    </section>
  );
}
