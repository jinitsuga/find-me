import React from "react";
import "./Selector.css";

export default function Selector(props) {
  // automate the arrangement of selector options according to the items in 'uniques' state.
  const items = props.uniques.map((item) => <span>{item.name}</span>);
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
          {items[0]}
        </li>
        <li className="select-option2" onClick={props.logItem}>
          {items[1]}
        </li>
        <li className="select-option3" onClick={props.logItem}>
          {items[2]}
        </li>
      </ul>
    </div>
  );
}
