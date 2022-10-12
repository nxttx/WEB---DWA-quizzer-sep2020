import React from "react";
import Slider from "./Slider";

export default function Header (props) {
    return(
      <section className="hero is-medium has-background-light" id="home">
      <section className="hero-body">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column is-2">
            </div>
            <div className="column">
              <p className="subtitle has-text-centered is-2">
                Pubquiz maar dan <strong>digitaal</strong>!
              </p>
            </div>
            <div className="column">
              {/* <p className="subtitle has-text-centered"> */}
                {/* <img alt="maps icon" src="images/mapsicon.png" width={250} /> */}
                <Slider/>
              {/* </p> */}
            </div>
            <div className="column is-2">
            </div>
          </div>
        </div>
      </section>
    </section>
    )
}