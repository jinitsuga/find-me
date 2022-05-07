import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./Game";
import About from "./About";

export default function RouteSwitch() {
  return (
    <Routes>
      <Route path="/game" element={<Game />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
