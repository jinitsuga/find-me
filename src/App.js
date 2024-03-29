import React from "react";
import RouteSwitch from "./Components/RouteSwitch";
import Nav from "./Components/Nav.js";
import Selector from "./Components/Selector";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
 
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./Components/firebase-config";
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default function App() {
  const [uniques, setUniques] = React.useState([]);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [percentCoords, setPercentCoords] = React.useState({ x: 0, y: 0 });
  const [showSelector, setShowSelector] = React.useState(false);
  const [timerStart, setTimerStart] = React.useState(false);
  const [gameStarted, setGameStarted] = React.useState(false);
  // eslint-disable-next-line
  const [isGameWon, setIsGameWon] = React.useState(false);
  const [timer, setTimer] = React.useState({
    mins: 0,
    seconds: 0,
  });
  const [didPlayerRegister, setDidPlayerRegister] = React.useState(false);

 

  // Adding player name + player time to leaderboard
  async function addToLeaderboards(name, time) {
    // eslint-disable-next-line
    const docRef = await addDoc(collection(database, "leaderboards"), {
      name: name,
      time: time,
    });
  }

  // Getting the top 20 from the leaderboards
  async function getLeaderboard() {
    const query = await getDocs(collection(database, "leaderboards"));
    const leadersList = query.docs.map((doc) => doc.data());
    return leadersList;
  }

  // random number
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  // Getting the items to find from the DB
  
  React.useEffect(() => {
    async function getItems(database) {
      const listOfItems = collection(database, "items");
      const itemsSnap = await getDocs(listOfItems);
      const itemList = itemsSnap.docs.map((doc) => doc.data());
  
      let randomizedItems = [];
  
      for (let i = 0; i < 3; i++) {
        const random = getRandomInt(itemList.length);
        randomizedItems.push(itemList[random]);
        itemList.splice(random, 1);
      }
  
      return randomizedItems;
    }
    getItems(database).then(setUniques);
    localStorage.setItem("gameWon", false);
  }, []);

  // ---------------- !! ----------------------
  // Saving game status in localStorage to avoid resets through page refresh

  // COMMENT OUT THE LINE BELOW TO PREVENT REFRESH RESTART + add condition to timer start btn in Home component

  function registerPlayer() {
    setDidPlayerRegister(true);
  }
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
      setItemToFound(item);
    } else {
      console.log("try again lol");
    }
  }

  function setItemToFound(item) {
    setUniques((oldUniques) =>
      oldUniques.map((unique) =>
        unique.name !== item.name ? unique : { ...unique, found: true }
      )
    );

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
  }, []);


  function checkForWin() {
    if (uniques.every((item) => item.found === true)) {
      localStorage.setItem("time", timer.seconds);
     
      setTimerStart(false);
      setGameStarted(false);
      setIsGameWon(true);
      localStorage.setItem("gameWon", true);
      localStorage.setItem("playerTime", timer.seconds);
    }
  }
  function savePlayerTime() {
    console.log(timer.seconds);
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
        timer={timer}
        addToLeaderboards={addToLeaderboards}
        savePlayerTime={savePlayerTime}
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
        getLeaderboard={getLeaderboard}
        didPlayerRegister={didPlayerRegister}
        registerPlayer={registerPlayer}
      />
    </div>
  );
}
