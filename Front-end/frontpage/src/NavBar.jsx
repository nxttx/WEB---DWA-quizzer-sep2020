import React, { useState } from "react";

export default function NavBar(props) {

  const [gamePin, setGamepin] = useState("");


  function handleGamePinChange(e) {
    setGamepin(e.target.value);
  }

  return (
    <nav className="navbar is-transparent is-fixed-top">
      <div className="container is-fluid">
        <div className="navbar-brand">
          <h1 className="navbar-item title">
            Quizzer
            </h1>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <a className="navbar-item" href="#home">Home</a>
            <a className="navbar-item" href="#about">Over ons</a> {/* eslint-disable-next-line */}
            <a className="navbar-item" href="http://localhost:3000/#" target="_blank" >Team app</a>
            <div className="navbar-item has-dropdown is-hoverable">
              <p className="navbar-link ">Scoreboard </p>
              <div className="navbar-dropdown">
                <input
                  className="input navbar-item"
                  type="text"
                  name="name"
                  placeholder="#000000"
                  onInput={handleGamePinChange}
                  value={gamePin}
                />
                <div className="navbar-item "></div>{/* eslint-disable-next-line */}
                <a className="navbar-item button is-primary" href={"http://localhost:1000/" + gamePin} target="_blank">Gaan</a>

              </div>
            </div>
            <div className="buttons">{/* eslint-disable-next-line */}
              <a className="button is-primary" href="http://localhost:2000/#" target="_blank">
                <strong>Start Now!</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}