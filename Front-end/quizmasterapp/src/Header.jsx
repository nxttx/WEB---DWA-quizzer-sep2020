import React from "react";

export default function Header(props) {


    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-menu">
                <div className="navbar-start">
                    <h1 className="navbar-item title">
                        {props.gamepin}
                    </h1>
                </div>
                <div className="navbar-end">
                    <h2 className="navbar-item title">
                        Vraag:{props.gamestate.question} &nbsp; Ronde: {props.gamestate.round}
                    </h2>
                </div>
            </div>
        </nav>
    )
}