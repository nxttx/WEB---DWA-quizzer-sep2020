import React from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

export default function EndGame(props) {
    let { gamepin } = useParams();

    return (<div>
        <Header gamepin={gamepin} gamestate={props.gamestate} />
        <section className="hero is-info is-fullheight-with-navbar is-bold">
            <div className="container has-text-centered">
                <h1 className="title">Einde ronde {props.gamestate.round}</h1>
                <h2 className="subtitle">Vraag: {props.gamestate.question} / 12</h2><br />

                <button className="button" onClick={() => props.handleGameEnd()}>Beëindig spel</button><br /><br />
                <button className="button" onClick={() => props.nextRound()}>Volgende ronde</button><br />
            </div>
        </section>
    </div>
    );
}
