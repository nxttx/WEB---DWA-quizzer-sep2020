import React from "react";
import { useParams } from "react-router-dom";
import TeamsComp from "./Team"
import Header from "./Header";

export default function Awnsers(props) {
    let { gamepin } = useParams();
    let button = <button
        className="button"
        onClick={() => props.nextQuestion()}
    > Volgende vraag. </button>

    let Awnsers = props.Awnsers.map(team =>
        <TeamsComp team={team}
            handleAwnserChange={props.handleAwnserChange}
            key={"accept-Team-" + team.teamName}
        />
    )

    if (props.gamestate.question >= 12) {
        button = <button className="button" onClick={() => props.setRedirect("/" + gamepin + "/endgame")}> Volgende vraag. </button>
    }

    return (<div>
        <Header gamepin={gamepin} gamestate={props.gamestate} />
        <section className="hero is-info is-fullheight-with-navbar">
            <div className="container has-text-centered">
                <br />
                <h1 className="title"> {props.currentQuestion.question} </h1>
                <h2 className="subtitle"> <strong>Antwoord: </strong>{props.currentQuestion.answer} </h2>
                <br />
                <h1 className="title"> Antwoorden  </h1>
                <br />
                {Awnsers}
                <br />
                {button}
            </div>
        </section>
    </div>);
}