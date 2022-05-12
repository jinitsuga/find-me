import React from "react";
import "./Selector.css";

export default function Selector(props) {
  const selectorStyle = {
    color: "white",
    position: "absolute",
    top: props.coords.y + "px",
    left: props.coords.x + "px",
  };

  return (
    <div className="selector" style={selectorStyle}>
      <ul className="select-list">
        <li className="select-option1" onClick={props.logItem}>
          Skullhelm
        </li>
        <li className="select-option2" onClick={props.logItem}>
          Tabula Rasa
        </li>
        <li className="select-option3" onClick={props.logItem}>
          Clayshaper
        </li>
      </ul>
    </div>
  );
}
