import React from "react";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./Game";
import About from "./About";
import Home from "./Home";

export default function RouteSwitch(props) {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home startClock={props.startClock} />} />
        {props.timerStart && (
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
                startClock={props.startClock}
                setTimerStart={props.setTimerStart}
                timerStart={props.timerStart}
              />
            }
          />
        )}

        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </React.Fragment>
  );
}
