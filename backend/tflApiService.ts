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
