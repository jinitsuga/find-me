import React from "react";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./Game";
import About from "./About";
import Home from "./Home";

export default function RouteSwitch(props) {
  return (
    <React.Fragment>
      <Routes>
        {/* Any route leads to Home if the clock hasn't started (to prevent looking at img before timer starts) */}
        <Route
          path="/"
          element={
            <Home
              startClock={props.startClock}
              timer={props.timer}
              addToLeaderboards={props.addToLeaderboards}
            />
          }
        />
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
                checkForWin={props.checkForWin}
              />
            }
          />
        )}

        <Route path="/about" element={<About />} />

        {/* Making it so any route that isn't specified, leads to Home */}
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </React.Fragment>
  );
}
