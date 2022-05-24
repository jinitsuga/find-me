import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./Game";
import About from "./About";
import Home from "./Home";

export default function RouteSwitch(props) {
  return (
    <Routes>
      <Route path="/" element={<Home startClock={props.startClock} />} />
      <Route
        path="/game"
        element={
          <Game
            selector={props.selector}
            getCoords={props.getCoords}
            getPercentCoords={props.getPercentCoords}
            coords={props.coords}
            showSelector={props.showSelector}
            changeSelector={props.changeSelector}
            logItem={props.logItem}
            uniques={props.uniques}
          />
        }
      />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
