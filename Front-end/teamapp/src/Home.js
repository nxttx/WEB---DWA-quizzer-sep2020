import React, {useState} from "react";

export default function Home(props) {
    const [gamePin, setGamePin] = useState("");

    const [name, setName] = useState("");


    function handleGamePinChange(e) {
      setGamePin(e.target.value);
    }

    function handleNameChange(e) {
      setName(e.target.value);
    }
    function handleSubmit(e) {
      props.joinGame(gamePin, name)
      e.preventDefault();
    }


  return (
<section className="hero is-success is-fullheight is-bold">
      <img src="/logov2.png" alt="Quizzer logo" style={{ maxWidth: 150 + "px" }}></img>
      <div className="hero-body">
        <div className="container has-text-centered">
        <form className="column" onSubmit={handleSubmit}>
        <label className="title is-1">Gamepin:</label>
            <div className="control">
              <input
                className="input"
                type="number"
                name="gamepin"
                placeholder="#000000"
                onChange={handleGamePinChange}
                value={gamePin}
              />
            </div>
            <br/>
            <label className="title is-1">Teamnaam:</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="name"
                placeholder="Team naam"
                onChange={handleNameChange}
                value={name}
              />
            </div>
            <br />
            <label>
              <input type="submit" value="JOIN" className="button is-link" />
            </label>
          </form>

        </div>
      </div>
    </section>
  );
}
