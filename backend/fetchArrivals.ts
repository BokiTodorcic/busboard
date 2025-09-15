import axios from "axios";
import {
  type BusArrivalInformation,
  type BusArrivalRawData,
} from "../src/types";

const api_key: string | undefined = import.meta.env.API_KEY;
// const stopID: string = "490008660N";

export async function getLatestArrivals(busStopID: string) {
  try {
    const response = await axios.get(
      `https://api.tfl.gov.uk/StopPoint/${busStopID}/Arrivals?api_key=${api_key}`
    );
    const latestArrivals: BusArrivalInformation[] = parseBusData(response.data);
    console.log(response.data);
    return latestArrivals;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function parseBusData(data: BusArrivalRawData[]) {
  const allParesedBusses: BusArrivalInformation[] = [];
  data.map((bus: BusArrivalRawData) => {
    const busInformation: BusArrivalInformation = {
      route: bus.lineName,
      destination: bus.destinationName,
      arrivalTime: bus.expectedArrival,
    };
    allParesedBusses.push(busInformation);
  });
  return allParesedBusses;
}
