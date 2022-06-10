import React from "react";
import "./Registration.css";

export default function Registration(props) {
  const [playerName, setPlayerName] = React.useState("");

  const seconds = localStorage.getItem("playerTime");
  function handleChange(event) {
    setPlayerName(event.target.value);
    console.log(playerName);
  }
  return (
    <form>
      <h3>Congrats gamer!</h3>
      <p>Save your time and check the leaderboards!</p>{" "}
      <span className="time">
        Your time: {Math.floor(seconds / 60)}m {Math.floor(seconds % 60)}s{" "}
      </span>
      <input
        className="player-name"
        placeholder="Enter your name"
        onChange={handleChange}
      ></input>
      <button
        type="button"
        onClick={() => {
          console.log(props.timer.seconds, playerName);
        }}
      >
        Save time{" "}
      </button>
    </form>
  );
}
