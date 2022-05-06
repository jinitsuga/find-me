import React from "react";
import "./Game.css";
export default function Game(props) {
  function logCoords(e) {
    console.log("X coord: " + e.nativeEvent.offsetX);
    console.log("Y coord: " + e.nativeEvent.offsetY);
  }

  return (
    <main className="main-section">
      <h2>Game section/img</h2>
      <div className="img-div" onClick={logCoords}></div>
    </main>
  );
}
