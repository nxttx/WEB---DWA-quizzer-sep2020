import React from "react";

export default function Footer(props) {
  return (
    <footer className="footer has-background-dark has-text-light">
      <div className="container">
        <div className="columns ">
          <div className="column is-3" />
          <div className="column has-text-centered">
            <div className="footer-column">
              <div className="footer-header">
                <h3>Quizzer uses:</h3>
              </div>
              <ul className="link-list">
                <li><a className="has-text-primary" href="https://reactjs.org/">React</a></li>
                <li><a className="has-text-primary" href="https://nodejs.org/en/">NodeJS</a></li>
                <li><a className="has-text-primary" href="https://expressjs.com/">Expressjs</a></li>
                <li><a className="has-text-primary" href="https://bulma.io"> bulma</a></li>
              </ul>
            </div>
          </div>
          <div className="column has-text-centered">
            <div className="footer-colum">
              <div className="footer-header">
                <h3>Contact:</h3>
              </div>
              <ul className="link-list">
                <li><a className="has-text-primary" href="mailto:vragen@Quizzerpubquizes">Mail</a></li>
              </ul>
              <br />
              <div className="footer-header">
                <h3>Copyright 2020-2021</h3>
              </div>
              <ul className="link-list">
                <li><a className="has-text-primary" href="https://github.com/GlennHulscher">G. Hulscher</a></li>
                <li><a className="has-text-primary" href="https://robertboudewijn.nl/">R. Boudewijn</a></li>
              </ul>
            </div>
          </div>
          <div className="column has-text-centered">
            <div className="footer-column">
              <div className="footer-header">
                <h3>Build by:</h3>
              </div>
              <ul className="link-list">
                <li><a className="has-text-primary" href="https://github.com/GlennHulscher"> Glenn Hulscher </a></li>
                <li><a className="has-text-primary" href="https://robertboudewijn.nl/">Robert Boudewijn</a></li>
              </ul>

            </div>
          </div>
          <div className="column is-3" />
        </div>
      </div>
    </footer>
  )
}