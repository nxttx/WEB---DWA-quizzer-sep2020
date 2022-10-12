import React, {useState} from "react";
import { useParams } from "react-router-dom";

export default function QuestionWaitPage(props) {
  let { gamepin } = useParams();
  if(props.stateGamePin !== gamepin){
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
        <figure className="image is-128x128" style={{ left: "calc( 50% - 50%/2)", width: "50%" }}> {/* left: calc(50% - width/2) */}
            <img
              className="is-rounded"
              alt="loading gif"
              src="\Wedges-5.3s-800px.gif"
              ></img>
          </figure>
        <form className="column" onSubmit={handleSubmit}>
            <label className="title is-5">{props.question} </label>
            <br/>
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
