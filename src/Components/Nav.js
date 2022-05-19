import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import uniqid from "uniqid";
export default function Nav(props) {
  // Feels like dirty code - couldn't think of a better way for conditionally styling these.

  const items = props.uniques.map((item) => (
    <span className="findme-nav" key={uniqid()}>
      {item.name}
    </span>
  ));

  return (
    <nav className="main-nav">
      <div className="logo-container">Find me</div>
      <div className="find-these-nav">{items}</div>
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
