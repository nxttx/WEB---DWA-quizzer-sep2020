import React from "react";

export default function Contact (props) {
    return(
      <section className="hero is-medium has-background-primary has-text-light" id="contact">
      <section className="hero-body">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column is-2">
            </div>
            <div className="column">
              <h1 className="title is-2 has-text-light has-text-left">Contact</h1>
              <p className="subtitle is-4 has-text-light has-text-left">Vragen of wil je gewoon even iets zeggen? Neem dan contact met ons op!</p>
              <p className="has-text-left ">
                Mail: <a className="has-text-light" href=" mailto:vragen@Quizzerpubquizes.nl">vragen@Quizzerpubquizes.nl</a>
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