import axios from "axios";
import {
  type BusArrivalInformation,
} from "../src/types";

const api_key: string | undefined = import.meta.env.API_KEY;

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

function parseBusData(data: BusArrivalInformation[]) {
  const allParesedBusses: BusArrivalInformation[] = [];
  data.map((bus: BusArrivalInformation) => {
    const arrivalInMins: number = Math.floor(bus.timeToStation / 60)
    const busInformation: BusArrivalInformation = {
      lineName: bus.lineName,
      destinationName: bus.destinationName,
      timeToStation: arrivalInMins
    };
    allParesedBusses.push(busInformation);
  });
  return allParesedBusses;
}
