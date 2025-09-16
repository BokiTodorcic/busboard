import { useState } from "react";
import { getLatestArrivals } from "../backend/fetchArrivals";
import type { BusArrivalInformation } from "./types";

function App() {
  const [latestArrivalsData, setlatestArrivalsData] = useState<
    BusArrivalInformation[] | null
  >();

  function handleSearch(searchData: FormData): void {
    const query: FormDataEntryValue | null = searchData.get("busStopID");
    if (query) {
      handleLatestArrivals(query);
    } else {
      console.log("No bus stop entered");
    }
  }

  async function handleLatestArrivals(stopID: FormDataEntryValue) {
    const busStopData: BusArrivalInformation[] | string =
      await getLatestArrivals(stopID);
    setlatestArrivalsData(busStopData);
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline text-center text-cyan-600 m-4">
        BusBoard
      </h1>
      <form action={handleSearch}>
        {/* Currently the bus ID is hard coded for testing the API*/}
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
                <td>{bus.lineName}</td>
                <td>{bus.destinationName}</td>
                <td>{bus.timeToStation}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
}

export default App;
