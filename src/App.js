import React from "react";
import RouteSwitch from "./Components/RouteSwitch";
import Nav from "./Components/Nav.js";
import Selector from "./Components/Selector";
import { BrowserRouter, Route } from "react-router-dom";

export default function App() {
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [showSelector, setShowSelector] = React.useState(false);

  function changeSelector() {
    console.log("megalul", showSelector);
    setShowSelector(!showSelector);
  }
  function getCoords(e) {
    // const imgWidth = e.nativeEvent.target.width;
    // const imgHeight = e.nativeEvent.target.height;
    const xCoord = e.nativeEvent.offsetX;
    const yCoord = e.nativeEvent.offsetY;
    setCoords({ x: xCoord, y: yCoord });
  }

  // Turn coords into % of each measure, so it adapts to viewport size.
  function getPercentCoords(e) {
    const imgWidth = e.nativeEvent.target.width;
    const imgHeight = e.nativeEvent.target.height;
    const xCoord = e.nativeEvent.offsetX;
    const yCoord = e.nativeEvent.offsetY;

    const xPercent = Math.floor((xCoord * 100) / imgWidth);
    const yPercent = Math.floor((yCoord * 100) / imgHeight);
    console.log(xPercent, yPercent);
  }

  return (
    <div className="App">
      <Nav />
      <RouteSwitch
        coords={coords}
        selector={<Selector coords={coords} />}
        getCoords={getCoords}
        showSelector={showSelector}
        changeSelector={changeSelector}
      />
    </div>
  );
}
