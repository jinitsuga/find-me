import { render } from "@testing-library/react";
import React from "react";
import "./Game.css";
import poeitems from "./images/poeitems.jpg";
import Selector from "./Selector";

export default function Game(props) {
  console.log(props.coords);
  return (
    <main className="main-section">
      {props.showSelector && <Selector coords={props.coords} />}
      <div
        className="img-div"
        onClick={function (e) {
          props.getCoords(e);
          props.changeSelector();
        }}
      >
        <img className="poe-img" src={poeitems} alt="poe uniques"></img>
      </div>
    </main>
  );
}
