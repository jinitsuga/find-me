import React from "react";

export default function Selector(props) {
  console.log("selector lol", "lmao");

  const selectorStyle = {
    color: "white",
    position: "absolute",
    top: props.coords.y + "px",
    left: props.coords.x + "px",
  };

  return (
    <div className="selector" style={selectorStyle}>
      <ul className="select-list">
        <li className="select-option1">Skullhelm</li>
        <li className="select-option2">Tabula Rasa</li>
        <li className="select-option3">Clayshaper</li>
      </ul>
    </div>
  );
}
