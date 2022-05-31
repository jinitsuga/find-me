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
  const [gameStarted, setGameStarted] = React.useState(false);
  const [isGameWon, setIsGameWon] = React.useState(false);
  const [timer, setTimer] = React.useState({
    mins: 0,
    seconds: 0,
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
      // Changes item's "found" prop to 'true'
      setItemToFound(item);
    } else {
      console.log("try again lol");
    }
  }
  // Probably overly-complex function to change item's 'found' prop to true.
  function setItemToFound(item) {
    setUniques((oldUniques) =>
      oldUniques.map((unique) =>
        unique.name !== item.name ? unique : { ...unique, found: true }
      )
    );
    console.log(uniques.every((item) => item.found == true));
    // win condition - stopping and resetting timer.
    checkForWin();
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

  // clock starting functionality
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

  // React.useEffect(() => {
  //   if (Number(localStorage.getItem("time")) > 0) {
  //     setGameStarted(true);
  //   }
  // });
  function checkForWin() {
    if (uniques.every((item) => item.found == true)) {
      setTimer({ minutes: 0, seconds: 0 });
      setTimerStart(false);
      setGameStarted(false);
      setIsGameWon(true);
      console.log("grats gamer");
    }
  }

  updateTimer();

  return (
    <div className="App">
      <Nav
        uniques={uniques}
        timerStart={timerStart}
        timer={timer}
        setTimer={setTimer}
        gameStarted={gameStarted}
      />
      <RouteSwitch
        startClock={startClock}
        coords={coords}
        selector={<Selector coords={coords} />}
        getCoords={getCoords}
        getPercentCoords={getPercentCoords}
        showSelector={showSelector}
        changeSelector={changeSelector}
        logItem={logItem}
        uniques={uniques}
        setTimerStart={setTimerStart}
        timerStart={timerStart}
        checkForWin={checkForWin}
      />
    </div>
  );
}
