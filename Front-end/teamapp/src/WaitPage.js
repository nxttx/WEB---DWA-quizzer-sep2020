import React from "react";
import { useParams } from "react-router-dom";

export default function WaitPage(props) {
  let { gamepin } = useParams();
  if (props.stateGamePin !== gamepin) {
    props.setRedirect("/");
  }
  let title = "Wacht hier even totdat de quizmaster de game start!";

  if (props.question !== '') {
    title = "Wacht hier even op de volgende vraag";
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
          <br />
          <h1 className="title">{title}</h1>

        </div>
      </div>
    </section>
  );
}
