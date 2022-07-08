import React from "react";
import "./Leaderboard.css";
export default function Leaderboard(props) {
  const [leaders, setLeaders] = React.useState([]);

  React.useEffect(() => {
    props.getLeaderboard().then(setLeaders);
  }, []);

  const sortedLeaders = leaders.sort((a, b) => a.time - b.time);
  const leadersList = sortedLeaders.map((item) => (
    <span className="player-info">
      Player: {item.name} Time: {item.time}
    </span>
  ));
  console.log(sortedLeaders);
  return (
    <div className="leaderboard">
      <div className="leaders-container">{leadersList}</div>
    </div>
  );
}
