import axios from "axios";
import { type BusArrivalInformation, type LocalBusStopInformation } from "../src/types";

const api_key: string | undefined = import.meta.env.VITE_API_KEY;

export async function getLatestArrivals(busstopId: string): Promise<BusArrivalInformation[]> {
  try {
    const response = await axios.get(
      `https://api.tfl.gov.uk/StopPoint/${busstopId}/Arrivals?app_key=${api_key}`
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
): Promise<LocalBusStopInformation[]> {
  try {
    const response = await axios.get(
      `https://api.tfl.gov.uk/StopPoint/?lat=${latitude.toString()}&lon=${longitude.toString()}&stopTypes=NaptanPublicBusCoachTram&modes=bus&app_key=${api_key}`
    );
    const busStops = response.data.stopPoints;
    console.log(busStops, "bus stops");
    return busStops;
  } catch (error) {
    console.error(error);
  }
}
