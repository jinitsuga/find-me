import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import uniqid from "uniqid";
import Clock from "./Clock";
export default function Nav(props) {
  // Feels like dirty code - couldn't think of a better way for conditionally styling these.
  // IDEA - GIVE NAV Its own State to track uniques, so I can remove them only from the nav list
  // this way it won't affect the Selector list
  const items = props.uniques.map((item) => (
    <span className="findme-nav" key={uniqid()}>
      {item.name}
    </span>
  ));

  return (
    <nav className="main-nav">
      <div className="logo-container">Find me</div>
      <div className="find-these-nav">{items}</div>
      <div className="nav-clock">
        <Clock timerStart={props.timerStart} />
      </div>
      <ul className="nav-list">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/game">
          <li>Game</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
      </ul>
    </nav>
  );
}
