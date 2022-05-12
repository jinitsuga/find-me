import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section>
      <p className="home-text">
        When you're ready to start, click the button. A timer will start. Try to
        find the listed items in the lowest amount of time possible!{" "}
      </p>
      <Link to="/game">
        <button className="start-btn">Start</button>
      </Link>
    </section>
  );
}