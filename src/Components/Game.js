import React from "react";
import "./Game.css";
import poeitems from "./images/poeitems.jpg";

export default function Game(props) {
  function logCoords(e) {
    const imgWidth = e.nativeEvent.target.width;
    const imgHeight = e.nativeEvent.target.height;
    const xCoord = e.nativeEvent.offsetX;
    const yCoord = e.nativeEvent.offsetY;

    const xPercent = Math.floor((xCoord * 100) / imgWidth);
    const yPercent = Math.floor((yCoord * 100) / imgHeight);
    console.log(xPercent, yPercent);
  }

  return (
    <main className="main-section">
      <h2>Game section/img</h2>
      <div className="img-div" onClick={logCoords}>
        <img className="poe-img" src={poeitems} alt="poe uniques"></img>
      </div>
    </main>
  );
}
