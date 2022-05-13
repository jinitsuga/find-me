import React from "react";
import RouteSwitch from "./Components/RouteSwitch";
import Nav from "./Components/Nav.js";
import Selector from "./Components/Selector";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./Components/firebase-config";

export default function App() {
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [showSelector, setShowSelector] = React.useState(false);

  async function logItem(e) {
    console.log(showSelector);
    try {
      const logger = await Promise.resolve(console.log(e.target.textContent));
    } catch (error) {
      console.log(error);
    }
  }

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
    console.log("X: " + xPercent, "Y: " + yPercent);
  }

  return (
    <div className="App">
      <Nav />
      <RouteSwitch
        coords={coords}
        selector={<Selector coords={coords} />}
        getCoords={getCoords}
        getPercentCoords={getPercentCoords}
        showSelector={showSelector}
        changeSelector={changeSelector}
        logItem={logItem}
      />
    </div>
  );
}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log(db);
async function getItems(db) {
  const listOfItems = collection(db, "items");
  const itemsSnap = await getDocs(listOfItems);
  const itemList = itemsSnap.docs.map((doc) => doc.data());
  return itemList;
}
console.log(getItems(db));
