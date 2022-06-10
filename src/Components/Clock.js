import { clear } from "@testing-library/user-event/dist/clear";
import React from "react";
import "./Clock.css";
import "./Nav.css";
export default function Clock(props) {
  const minutes = Math.floor(props.timer.seconds / 60);
  const seconds = props.timer.seconds % 60;

  let clockInterval;
  React.useEffect(() => {
    //let interval = null;

    if (
      props.timerStart === true &&
      localStorage.getItem("gameWon") === "false"
    ) {
      if (!clockInterval) {
        clockInterval = setInterval(updateSeconds, 1000);
      }
    }
  }, [props.timerStart, props.gameStarted]);

  function updateSeconds() {
    if (localStorage.getItem("gameWon") === "true") {
      clearInterval(clockInterval);
      console.log("zulul");
    } else {
      props.setTimer((oldTimer) => {
        return { ...oldTimer, seconds: oldTimer.seconds + 1 };
      });
    }
  }

  function updateMinutes() {
    props.setTimer((oldTimer) => {
      return { ...oldTimer, mins: oldTimer.mins + 1 };
    });
  }

  return (
    <div className="clock-container">
      <span className="time"> Time: </span>
      <div className="detailed-time">
        <span className="minutes">{minutes} m</span>
        <span className="seconds"> {seconds}s </span>
      </div>
    </div>
  );
}
