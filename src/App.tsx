import { useState } from "react";
import { handleLatestArrivalsRequest } from "../backend/busArrivalsService";
import { handlePostcodeRequest } from "../backend/locationService";
import type { StationArrivalsResponse, StationInformation } from "./types";
import ArrivalsTable from "./Table";
import NoArrivalsTable from "./NoArrivalsTable";
import { BUS_STOP_REGEX, POSTCODE_REGEX } from "./constants";

function App() {
  const [stationInformation, setStationInformation] = useState<
    StationInformation[]
  >([]);

  async function handleSearch(searchData: string): Promise<void> {
    const isValidBusStop: boolean = BUS_STOP_REGEX.test(searchData);
    const isValidPostCode: boolean = POSTCODE_REGEX.test(searchData);

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
    const busStopData: StationArrivalsResponse = await handlePostcodeRequest(
      postcode
    );
    if (!busStopData.data || !busStopData.success) {
      alert(`Error: ${busStopData.message}`);
    } else {
      setStationInformation(busStopData.data);
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
      <div className="m-4 mt-10 mb-10 ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              busStopId: { value: string };
            };
            const stopId = target.busStopId.value;
            handleSearch(stopId);
          }}
        >
          <label className="text-lg text-cyan-700 mb-2 mr-10 block">
            Search by Bus Stop or Postcode:
          </label>
          <input
            type="text"
            name="busStopId"
            id="busStopId"
            className="rounded-md p-3 bg-zinc-100"
          ></input>
          <button
            type="submit"
            className="rounded-md p-3 bg-cyan-600 text-white hover:border-transparent hover:bg-cyan-700 hover:text-white"
          >
            Search
          </button>
        </form>
      </div>
      <div>
        {stationInformation.map((station, index: number) => {
          if (station.arrivalsInfo.length > 0) {
            return (
              <ArrivalsTable key={index} stationInfo={station}></ArrivalsTable>
            );
          } else {
            return (
              <NoArrivalsTable
                key={index}
                stationInfo={station}
              ></NoArrivalsTable>
            );
          }
        })}
      </div>
    </>
  );
}

export default App;
