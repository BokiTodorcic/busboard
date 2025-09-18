import { useState } from "react";
import { handleLatestArrivalsRequest } from "../backend/busArrivalsService";
import { handlePostcodeRequest } from "../backend/locationService";
import type { StationInformation } from "./types";
import ArrivalsTable from "./Table";



function App() {
  const [stationInformation, setStationInformation] = useState<
    StationInformation[]
  >([]);

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
    const busStopData: StationInformation[] = await handlePostcodeRequest(
      postcode
    );
    setStationInformation(busStopData);
  }

  async function handleLatestArrivals(stopID: string): Promise<void> {
    const busStopData: StationInformation = await handleLatestArrivalsRequest(
      stopID
    );
    setStationInformation([busStopData]);
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline text-center text-cyan-600 m-4">
        BusBoard
      </h1>
      <form action={handleSearch}>
        <input
          type="text"
          name="busStopID"
          id="busStopID"
          placeholder={"Bus Stop ID:"}
        ></input>
        <button type="submit">Search</button>
      </form>
      <div>
        {stationInformation.map((station, index: number) => {
          return (
            <ArrivalsTable key={index} stationInfo={station}></ArrivalsTable>
          );
        })}
      </div>
    </>
  );
}

export default App;
