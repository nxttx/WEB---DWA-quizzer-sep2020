import React from "react";
import teamIndex from "./teamIndex"

export default function Scoreboard(props) {

  let teams = props.teams;
  let number = 0;
  let teamlist= teams.map(team => {
    if(number<4){number++;}
    return (teamIndex(team, number))
  })
  

  return (<div>
    <section className="hero is-info is-fullheight">
    <img src="/logov2.png" alt="Quizzer logo" style={{ maxWidth: 150 + "px" }}></img>
      <div className="container has-text-centered">
        {teamlist}
      </div>
    </section>
  </div>
  );
}
