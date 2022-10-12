import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

export default function AwaitAwnsers(props) {
    let { gamepin } = useParams();
    let [stopWatch, setStopWatch] = useState(0);
    let [startTime, setStartTime] = useState(Math.floor(Date.now() / 1000))
    let [entry, setEntry] = useState(true);

    if (entry) {
        setStartTime(Math.floor(Date.now() / 1000))
        setEntry(false);
    }

    setInterval(() => {
        setStopWatch(Math.floor(Date.now() / 1000) - startTime);
    }, 1000);
    console.log(stopWatch);
    return (<div>
        <Header gamepin={gamepin} gamestate={props.gamestate} />
        <section className="hero is-info is-fullheight-with-navbar">
            <div className="container has-text-centered">
                <br />
                <h1 className="title"> {props.currentQuestion} </h1>
                <h2 className="subtitle"> {props.amountOfAwnsers}/{props.amountOfTeams} teams awnserd  </h2>
                <br />
                <h2 className="subtitle"> Verstreken tijd: {stopWatch} seconde </h2>
                <br />
                <button className="button" onClick={() => { props.endQuestion(setEntry);    setEntry(true) }}> Stop antwoord ronde. </button>
            </div>
        </section>
    </div>);
}