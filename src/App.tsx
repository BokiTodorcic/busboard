import { useState } from "react";
import { handleLatestArrivalsRequest } from "../backend/busArrivalsService";
import { handlePostcodeRequest } from "../backend/locationService";
import type { StationInformation } from "./types";
import ArrivalsTable from "./Table";

function App() {
  const [stationInformation, setStationInformation] = useState<
    StationInformation[]
  >([]);

  async function handleSearch(searchData: string): Promise<void> {
    const busStopRegex = /[a-z0-9]{9,}/i;
    const postcodeRegex = /[A-Z]{1,2}[0-9]{1,2}\s?\d[A-Z]{2}/i;

    const isValidBusStop: boolean = busStopRegex.test(searchData);
    const isValidPostCode: boolean = postcodeRegex.test(searchData);

    if (isValidBusStop) {
      await handleLatestArrivals(searchData);
    } else if (isValidPostCode) {
      await handleArrivalsFromPostcode(searchData);
    } else {
      alert(
        "Attention: Please enter a valid Bus Stop ID or Postcode into the input field."
      );
    }
  }

  async function handleArrivalsFromPostcode(postcode: string): Promise<void> {
    const busStopData: StationInformation[] = await handlePostcodeRequest(
      postcode
    );
    if (busStopData.length === 0) {
      alert("No stations available for that postcode.");
    } else {
      setStationInformation(busStopData);
    }
  }

  async function handleLatestArrivals(stopId: string): Promise<void> {
    const busStopData: StationInformation = await handleLatestArrivalsRequest(
      stopId
    );
    setStationInformation([busStopData]);
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline text-center text-cyan-600 m-4">
        BusBoard
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            busstopId: { value: string };
          };
          const stopId = target.busstopId.value;
          handleSearch(stopId);
        }}
      >
        <input
          type="text"
          name="busstopId"
          id="busstopId"
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
