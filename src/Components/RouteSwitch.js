import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./Game";
import About from "./About";

export default function RouteSwitch(props) {
  return (
    <Routes>
      <Route
        path="/game"
        element={
          <Game
            selector={props.selector}
            getCoords={props.getCoords}
            coords={props.coords}
            showSelector={props.showSelector}
            changeSelector={props.changeSelector}
          />
        }
      />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
