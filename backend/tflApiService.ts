import axios from "axios";
import { type BusArrivalInformation } from "../src/types";

const api_key: string | undefined = import.meta.env.API_KEY;

export async function getLatestArrivals(busStopID: string) {
  try {
    const response = await axios.get(
      `https://api.tfl.gov.uk/StopPoint/${busStopID}/Arrivals?api_key=${api_key}`
    );
    const allArrivals: BusArrivalInformation[] = response.data;
    return allArrivals;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getBusStopsWithinRadius(
  latitude: number,
  longitude: number
) {
  try {
    const response = await axios.get(
      `https://api.tfl.gov.uk/StopPoint/?lat=${latitude.toString()}&lon=${longitude.toString()}&stopTypes=NaptanPublicBusCoachTram&modes=bus`
    );
    const busStops = response.data.stopPoints;
    return busStops
  } catch (error) {
    console.error(error)
  }
}
