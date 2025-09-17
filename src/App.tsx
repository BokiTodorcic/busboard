import { useState } from "react";
import { handleLatestArrivalsRequest } from "../backend/busArrivalsService";
import { handlePostcodeRequest } from "../backend/locationService";
import type { BusArrivalInformation } from "./types";

function App() {
  const [latestArrivalsData, setlatestArrivalsData] = useState<
    BusArrivalInformation[] | null
  >(null);

  async function handleSearch(searchData: FormData): Promise<void> {
    const query: FormDataEntryValue | null = searchData.get("busStopID");
    if (typeof query === "string") {
      const busStopRegex = /[a-z0-9]{9,}/i;
      const postcodeRegex = /[A-Z]{1,2}[0-9]{1,2}\s?\d[A-Z]{2}/;
      const isValidBusStop: boolean = busStopRegex.test(query);
      const isValidPostCode: boolean = postcodeRegex.test(query);
      if (isValidBusStop) {
        await handleLatestArrivals(query);
      } else if (isValidPostCode) {
        await handleArrivalsFromPostcode(query);
      } else {
        alert(
          "Attention: Please enter a valid Bus Stop ID or Postcode into the input field."
        );
      }
    } else {
      alert("Attention: Please enter valid data into the input field.");
    }
  }

  async function handleArrivalsFromPostcode(postcode: string): Promise<void> {
    const busStopData: BusArrivalInformation[] =
      await handlePostcodeRequest(postcode);
      setlatestArrivalsData(busStopData);
      console.log(busStopData);
  }
  async function handleLatestArrivals(stopID: string): Promise<void> {
    const busStopData: BusArrivalInformation[] =
      await handleLatestArrivalsRequest(stopID);
    setlatestArrivalsData(busStopData);
      console.log(busStopData);

  }



  return (
    <>
      <h1 className="text-3xl font-bold underline text-center text-cyan-600 m-4">
        BusBoard
      </h1>
      <form action={handleSearch}>
        {/* Currently the bus ID is hard coded for testing the API*/}
        <input
          type="text"
          name="busStopID"
          id="busStopID"
          placeholder={"Bus Stop ID:"}
          // defaultValue="490008660N"
        ></input>
        <button type="submit">Search</button>
      </form>
      <div>
        <table>
          <tr>
            <th>Bus Stop Name</th>
            <th>Bus Number</th>
            <th>Destination</th>
            <th>Arrival Time</th>
          </tr>
          {latestArrivalsData?.map((bus, index) => {
            return (
              <tr key={index}>
                <td>{bus.stationName}</td>
                <td>{bus.lineName}</td>
                <td>{bus.destinationName}</td>
                <td>{bus.timeToStation} mins</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
}

export default App;
