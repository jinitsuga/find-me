import React from "react";
import "./Game.css";
import poeitems from "./images/poeitems.jpg";
import Selector from "./Selector";

// "Descomentar" el selector para deployearlo de nuevo (solo checkeando coords para agregar items a la db)
export default function Game(props) {
  return (
    <main className="main-section">
      {props.showSelector && (
        <Selector
          coords={props.coords}
          logItem={props.logItem}
          uniques={props.uniques}
          checkForWin={props.checkForWin}
        />
      )}
      <div
        className="img-div"
        onClick={function (e) {
          props.getCoords(e);
          props.getPercentCoords(e);
          props.changeSelector();
        }}
      >
        <img className="poe-img" src={poeitems} alt="poe uniques"></img>
      </div>
    </main>
  );
}
