import React from "react";
import RouteSwitch from "./Components/RouteSwitch";
import Nav from "./Components/Nav.js";
import { BrowserRouter, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Nav />
      <RouteSwitch />
    </div>
  );
}
