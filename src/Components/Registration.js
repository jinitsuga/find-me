import React from "react";
import "./Registration.css";
import Leaderboard from "./Leaderboard";

export default function Registration(props) {
  const [playerName, setPlayerName] = React.useState("");
  const [isFormHidden, setIsFormHidden] = React.useState("false");

  const seconds = localStorage.getItem("playerTime");
  function registerPlayer() {}
  function handleChange(event) {
    setPlayerName(event.target.value);
  }
  return (
    <div className="form-container">
      <form
        className="regist-form"
        style={!isFormHidden ? { display: "none" } : { display: "flex" }}
      >
        <h3>Congrats gamer!</h3>
        <p>Save your time and check the leaderboards!</p>{" "}
        <span className="time">
          Your time: {Math.floor(seconds / 60)}m {Math.floor(seconds % 60)}s{" "}
        </span>
        <input
          style={
            props.didPlayerRegister ? { display: "none" } : { display: "block" }
          }
          className="player-name"
          placeholder="Enter your name"
          onChange={handleChange}
          pattern="^[A-Za-z0-9\\s]{2,16}$"
        ></input>
        <span className="error-msg">
          *Your name must have between 2 and 16 characters.
        </span>
        <button
          type="button"
          onClick={() => {
            if (playerName.length < 2 || playerName.length > 16) return;
            props.addToLeaderboards(playerName, props.timer.seconds);
            props.registerPlayer();
            setIsFormHidden(!isFormHidden);
          }}
        >
          Save time{" "}
        </button>
      </form>
      <div className="leaderboard-container">
        {!isFormHidden && <Leaderboard getLeaderboard={props.getLeaderboard} />}
      </div>
    </div>
  );
}
