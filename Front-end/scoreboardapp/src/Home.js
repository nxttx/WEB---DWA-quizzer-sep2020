import React from "react";
import { useParams } from "react-router-dom";

export default function Home(props) {
  let { gamepin } = useParams();
  if (props.stateGamePin !== gamepin) {
    props.setGamePin(gamepin)
  }



  return (
    <section className="hero is-success is-fullheight is-bold">
      <img src="/logov2.png" alt="Quizzer logo" style={{ maxWidth: 150 + "px" }}></img>
      <div className="hero-body">
        <div className="container has-text-centered">

          <figure className="image is-128x128" style={{ left: "calc( 55% - 128px)" }}>
            <img
              className="is-rounded"
              alt="loading gif"
              src="https://media0.giphy.com/media/VseXvvxwowwCc/giphy.webp?cid=790b76116cbd262fe3d4449c3e3030ce9e29faa60b941f70&rid=giphy.webp"
            ></img>
          </figure>

          <br /><br /><br />
          <h1 className="title is-1">
            Game Pin:
          </h1>
          <h2 className="subtitle is-2">
            #{gamepin}
          </h2>

        </div>
      </div>
    </section>
  );
}
