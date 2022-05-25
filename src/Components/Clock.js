import React from "react";
import "./Clock.css";
export default function Clock(props) {
  const minutes = Math.floor(props.timer.seconds / 60);
  const seconds = props.timer.seconds % 60;
  React.useEffect(() => {
    //let interval = null;

    if (props.timerStart) {
      setInterval(updateSeconds, 1000);
      // setInterval(updateMinutes, 60000);
    }
  }, [props.timerStart]);

  function updateSeconds() {
    props.setTimer((oldTimer) => {
      return { ...oldTimer, seconds: oldTimer.seconds + 1 };
    });
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
