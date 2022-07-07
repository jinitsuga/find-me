import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Registration from "./Registration";
export default function Home(props) {
  return (
    <section>
      {localStorage.getItem("gameWon") === "false" ? (
        <div className="home-section">
          <p className="home-text">
            When you're ready to begin, click the button and a timer will start.
            Try to find the listed items in{" "}
            <span className="teal-tag">teal </span>in the lowest amount of time
            possible!{" "}
          </p>
          <Link to="/game">
            <button className="start-btn" onClick={props.startClock}>
              Start
            </button>
          </Link>
        </div>
      ) : (
        <Registration
          timer={props.timer}
          addToLeaderboards={props.addToLeaderboards}
        />
      )}
    </section>
  );
}
