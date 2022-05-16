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

    if (
      percentCoords.x <= item.xMax &&
      percentCoords.x >= item.xMin &&
      percentCoords.y <= item.yMax &&
      percentCoords.y >= item.yMin
    ) {
      console.log(item.name);
    } else {
      console.log("try again lol");
    }
  }

  function changeSelector() {
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
    setPercentCoords({ x: xPercent, y: yPercent });
  }

  return (
    <div className="App">
      <Nav uniques={uniques} />
      <RouteSwitch
        coords={coords}
        selector={<Selector coords={coords} />}
        getCoords={getCoords}
        getPercentCoords={getPercentCoords}
        showSelector={showSelector}
        changeSelector={changeSelector}
        logItem={logItem}
        uniques={uniques}
      />
    </div>
  );
}
