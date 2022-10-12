import React from "react";

export default function AboQAndA (props) {
    return(
      <section className="hero is-medium has-background-light " id="q&a">
      <section className="hero-body">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column is-2">
            </div>
            <div className="column">
              <h1 className="title is-2 has-text-left">Questions and answers</h1>
              <p className="subtitle is-4 has-text-left">Wat is Quizzer nou precies?</p>
              <p className="has-text-left">
                Quizzer is een applicatie om bij allerlei activiteiten een interactief onderdeel toe te voegen. Namelijk een quiz! 
                Quizzer kan gebruikt worden bij feesten, in de kroeg, op school, maar ook tijdens een avond met de familie of voor ouderen in woongroepen.
              </p><br />
              <p className="subtitle is-4 has-text-left">Hoe ie Quizzer ontstaan?</p>
              <p className="has-text-left">
                Quizzer is voortgekomen uit een project voor de minor Develop Web Applications op de HAN in Arnhem. Quizzer is gemaakt door Robert Boudewijn en Glenn Hulscher.
              </p><br />
              <p className="subtitle is-4 has-text-left">Kan ik bij Quizzer ook mijn eigen vragen opgeven?</p>
              <p className="has-text-left">
                Op dit moment is dit nog geen functionaliteit, echter staat dit wel op de roadmap van Quizzer om binnekort toegevoegd te worden.
              </p><br />
              <p className="subtitle is-4 has-text-left">Kan ik Quizzer zomaar op school of voor een publiek gebruiken?</p>
              <p className="has-text-left">
                Jazeker, daar is het juist voor bedoeld! Bij Quizzer staan we ervoor dat jong en oud plezier kunnen hebben met elkaar, Quizzer is hiervoor een middel.
              </p><br />
            </div>
            <div className="column is-2">
            </div>
          </div>
        </div>
      </section>
    </section>
    )
}