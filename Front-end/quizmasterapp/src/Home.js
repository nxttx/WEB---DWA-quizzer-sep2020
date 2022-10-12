import React, { useState } from "react";


export default function Home(props) {
  const [name, setName] = useState("");


  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleSubmit(e) {
    props.createGame(name)
    e.preventDefault();
  }

  return (
    <section className="hero is-success is-fullheight is-bold">
      <img src="/logov2.png" alt="Quizzer logo" style={{ maxWidth: 150 + "px" }}></img>
      <div className="hero-body">
        <div className="container has-text-centered columns">
          <div className="column" />
          <form className="column" onSubmit={handleSubmit}>
            <label className="title is-1">Uw naam:</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="name"
                placeholder="Uw naam"
                onChange={handleNameChange}
                value={name}
              />
            </div>
            <br />
            <label>
              <input type="submit" value="Start een game" className="button is-link" />
            </label>
          </form>
          <div className="column" />
        </div>
      </div>
    </section>
  );
}
