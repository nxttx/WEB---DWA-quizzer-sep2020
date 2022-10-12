import React from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

export default function SelectCategory(props) {
  let { gamepin } = useParams();

  let categoryList = props.categories.map(cat => displayCat(cat))

  function displayCat(cat) {
    return (<div
      className="notification is-info is-light is-vcentered"
      onClick={() => {
        props.selectCategory(cat)
      }}
      key={"category:" + cat}
    >{cat}</div>
    )
  }

  return (<div>
    <Header gamepin={gamepin} gamestate={props.gamestate}/>
    <section className="hero is-info is-fullheight-with-navbar">
      <div className="container has-text-centered">
        <br />
        <h1 className="title"> Selecteer een categorie. </h1>
        <br />
        {categoryList}
      </div>
    </section>
  </div>)

}