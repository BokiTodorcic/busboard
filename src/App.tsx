import { useState } from "react";
import { getLatestArrivals } from "../backend/fetchArrivals";
import type { BusArrivalInformation } from "./types";

function App() {
  const [latestArrivalsData, setlatestArrivalsData] = useState<
    BusArrivalInformation[] | null
  >();

  function handleSearch(searchData: any): void {
    const query: string = searchData.get("busStopID");
    handleLatestArrivals(query);
  }

  async function handleLatestArrivals(stopID: string) {
    const busStopData: BusArrivalInformation[] | string =
      await getLatestArrivals(stopID);
    console.log(busStopData);
    setlatestArrivalsData(busStopData);
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline text-center text-cyan-600 m-4">
        BusBoard
      </h1>
      <form action={handleSearch}>
        <textarea
          name="busStopID"
          id="busStopID"
          placeholder={"Bus Stop ID"}
          value="490008660N"
        ></textarea>
        <button type="submit">Search</button>
      </form>
      <div>
        <table>
          <tr>
            <th>Bus Number</th>
            <th>Destination</th>
            <th>Arrival Time</th>
          </tr>
          {latestArrivalsData?.map((bus, index) => {
            return (
              <tr key={index}>
                <td>{bus.route}</td>
                <td>{bus.destination}</td>
                <td>{bus.arrivalTime}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
}

export default App;
