import React from "react";
import RouteSwitch from "./Components/RouteSwitch";
import Nav from "./Components/Nav.js";
import Selector from "./Components/Selector";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./Components/firebase-config";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default function App() {
  const [uniques, setUniques] = React.useState([]);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [percentCoords, setPercentCoords] = React.useState({ x: 0, y: 0 });
  const [showSelector, setShowSelector] = React.useState(false);
  const [timerStart, setTimerStart] = React.useState(false);
  const [timer, setTimer] = React.useState({
    mins: 0,
    seconds: localStorage.getItem("time"),
  });
  // Firebase interaction -  extracting the list of items to find and their coordinates on the image.
  // only on app start through useEffect hook

  async function getItems(database) {
    const listOfItems = collection(database, "items");
    const itemsSnap = await getDocs(listOfItems);
    const itemList = itemsSnap.docs.map((doc) => doc.data());
    return itemList;
  }
  React.useEffect(() => {
    getItems(database).then(setUniques);
  }, []);

  // ---------------- !! ----------------------

  function logItem(e) {
    const item = uniques.find(
      (element) => element.name === e.target.textContent
    );
    if (item === undefined) return;
    if (
      percentCoords.x <= item.xMax &&
      percentCoords.x >= item.xMin &&
      percentCoords.y <= item.yMax &&
      percentCoords.y >= item.yMin
    ) {
      // Changes item's "found" prop to 'true' + removes item from the navbar(and state)
      setItemToFound(item);
    } else {
      console.log("try again lol");
    }
  }
  // Probably overly-complex function to change item's 'found' prop to true.
  function setItemToFound(item) {
    const index = uniques.findIndex((unique) => unique.name === item.name);
    const myUniques = uniques.slice();
    myUniques[index].found = true;
    myUniques.splice(index, 1);
    setUniques(myUniques);
    // win condition - stopping and resetting timer.
    if (uniques.length <= 1) {
      localStorage.setItem("time", 0);
      setTimer({ minutes: 0, seconds: 0 });
      setTimerStart(false);
      alert(
        "You won in " + timer.mins + " minutes " + timer.seconds + " seconds"
      );
    }
  }
  function changeSelector() {
    setShowSelector(!showSelector);
  }
  function getCoords(e) {
    const xCoord = e.nativeEvent.offsetX;
    const yCoord = e.nativeEvent.offsetY;
    setCoords({ x: xCoord, y: yCoord });
  }

  // Turn coords into % of each measure, adapting to viewport size.
  function getPercentCoords(e) {
    const imgWidth = e.nativeEvent.target.width;
    const imgHeight = e.nativeEvent.target.height;
    const xCoord = e.nativeEvent.offsetX;
    const yCoord = e.nativeEvent.offsetY;

    const xPercent = Math.floor((xCoord * 100) / imgWidth);
    const yPercent = Math.floor((yCoord * 100) / imgHeight);
    setPercentCoords({ x: xPercent, y: yPercent });
  }

  // clock starting func
  function startClock() {
    setTimerStart(true);
  }
  // Local storage interaction -- maintaing timer on page refresh
  function updateTimer() {
    localStorage.setItem("time", timer.seconds);
  }
  React.useEffect(() => {
    setTimer((oldTimer) => {
      return { ...oldTimer, seconds: Number(localStorage.getItem("time")) };
    });
    console.log(timer);
  }, []);

  function testStorage() {
    let previousTime = localStorage.getItem("time");
    setTimer((oldTimer) => {
      return { ...oldTimer, seconds: previousTime };
    });
    console.log(localStorage.getItem("time"));
  }
  updateTimer();
  return (
    <div className="App">
      <Nav
        uniques={uniques}
        timerStart={timerStart}
        timer={timer}
        setTimer={setTimer}
      />
      <RouteSwitch
        coords={coords}
        selector={<Selector coords={coords} />}
        getCoords={getCoords}
        getPercentCoords={getPercentCoords}
        showSelector={showSelector}
        changeSelector={changeSelector}
        logItem={logItem}
        uniques={uniques}
        startClock={startClock}
      />
    </div>
  );
}
