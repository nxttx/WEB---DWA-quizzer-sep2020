import React from "react";
import { useParams } from "react-router-dom";
import TeamsComp from "./Team";

export default function Acceptteams(props) {
  let { gamepin } = useParams();

  let teams = props.teams.map(team => <TeamsComp team={team} removeTeam={props.removeTeam} key={"accept-Team-" + team.teamName} />)


  return (<div>
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-menu">
        <div className="navbar-start">
          <h1 className="navbar-item title">
            {gamepin}
          </h1>
        </div>
      </div>
    </nav>
    <section className="hero is-info is-fullheight-with-navbar is-bold">
      <div className="container has-text-centered">
        <br />
        <h1 className="title"> De volgende teams zijn spelen mee: </h1>
        <br />
        {teams}
        <button className="button" onClick={() => props.setRedirect("/" + gamepin + "/selectcat")}>Kies categorieën</button>
      </div>
    </section>
  </div>
  );
}
