import React from "react";

export default function EndPage(props) {

    return (
        <section className="hero is-success is-fullheight is-bold">
            <img src="/logov2.png" alt="Quizzer logo" style={{ maxWidth: 150 + "px" }}></img>
            <div className="hero-body">
                <div className="container has-text-centered">
                    <br />
                    <h1 className="title">Jullie hebben {props.score} punten behaald!</h1><br />
                    <h1 className="title">Goed gespeeld! <br /> Bekijk voor meer info het scherm </h1>
                </div>
            </div>
        </section>
    );
}
