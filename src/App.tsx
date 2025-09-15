import { useState } from "react";
import { getBusArrivals } from "../backend/fetchArrivals";

function App() {
  const [arrivalsData, setArrivalsData] = useState<string>();

  async function handleClick() {
    const arrivalData: string = await getBusArrivals();
    setArrivalsData(arrivalData);
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline text-center text-cyan-600 m-4">
        BusBoard
      </h1>
      <button onClick={() => handleClick()}>Click Me!</button>
      <div>{arrivalsData}</div>
    </>
  );
}

export default App;
