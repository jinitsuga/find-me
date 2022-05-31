import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import uniqid from "uniqid";
import Clock from "./Clock";
export default function Nav(props) {
  // Auto rendering item names on the Nav from the DB
  const items = props.uniques.map((item) => (
    <span className={`findme-nav ${item.found ? "found" : ""}`} key={uniqid()}>
      {item.name}
    </span>
  ));

  return (
    <nav className="main-nav">
      <div className="logo-container">Find me</div>
      <div className="find-these-nav">{items}</div>
      <div className="nav-clock">
        <Clock
          timerStart={props.timerStart}
          timer={props.timer}
          setTimer={props.setTimer}
          uniques={props.uniques}
          gameStarted={props.gameStarted}
        />
      </div>
      <ul className="nav-list">
        <Link to="/">
          <li>Home</li>
        </Link>
        {/* <Link to="/game">
          <li>Game</li>
        </Link> */}
        <Link to="/about">
          <li>About</li>
        </Link>
      </ul>
    </nav>
  );
}
