import React from "react";
import "./Leaderboard.css";
export default function Leaderboard(props) {
  const [leaders, setLeaders] = React.useState([]);

 

  React.useEffect(() => {
    const properties = {...props}
    properties.getLeaderboard().then(setLeaders);
      
  // eslint-disable-next-line
  }, []);

  // time formatting pending and some style on these spans
  const sortedLeaders = leaders.sort((a, b) => a.time - b.time);
  let topTwenty = [];

  if (sortedLeaders.length >= 20) {
    topTwenty = sortedLeaders.slice(0, 20);
  } else {
    topTwenty = sortedLeaders;
  }

  const leadersList = topTwenty.map((leader) => {
    const minutes = Math.floor(leader.time / 60);
    const seconds = leader.time % 60;
    return (
      <div className="leader" key={topTwenty.indexOf(leader)}>
        <span className="rank"> {topTwenty.indexOf(leader) + 1}. </span>{" "}
        {leader.name} {minutes}m {seconds}s
      </div>
    );
  });

  return (
    <div className="leaderboard">
      <h3> Showing top 20</h3>
      <div className="leaders-container">{leadersList}</div>
    </div>
  );
}
