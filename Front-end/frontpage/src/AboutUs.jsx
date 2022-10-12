import React from "react";

export default function AboutUs (props) {
    return(
      <section className="hero is-medium has-background-info has-text-light" id="about">
      <section className="hero-body">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column is-2">
            </div>
            <div className="column">
              <h1 className="title is-2 has-text-light has-text-left">Over ons</h1>
              <p className="subtitle is-4 has-text-light has-text-left">Wie zijn wij?</p>
              <p className="has-text-left">
                Wij zijn twee studenten van de HAN University of Applied Sciences. Eén van onze semesters was Develop A Webapplication (DWA)
                tijdens dit semester hebben we alles geleerd van back-end en front-end javaScript. Waaronder werken met websockets, React, Express en nog veel meer. 
                Als eindopdracht voor dit vak hebben we deze web app gebouwt. Een pub quiz. Waarbij er minimaal 3 schermen zijn. Een scorebord, een quizmaster en 1+ team apps.
              </p>
            </div>
            <div className="column is-2">
            </div>
          </div>
        </div>
      </section>
    </section>
    )
}