import axios from "axios";
import type {
  BusArrivalInformation,
  LocalStops,
  TflApiResponse,
} from "../src/types";

const api_key: string | undefined = import.meta.env.VITE_API_KEY;

export async function getLatestArrivals(
  busstopId: string
): Promise<BusArrivalInformation[]> {
  try {
    const response = await axios.get<BusArrivalInformation[]>(
      `https://api.tfl.gov.uk/StopPoint/${busstopId}/Arrivals?app_key=${api_key}`
    );
    console.log(response);
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
): Promise<TflApiResponse> {
  try {
    const response = await axios.get<LocalStops>(
      `https://api.tfl.gov.uk/StopPoint/?lat=${latitude.toString()}&lon=${longitude.toString()}&stopTypes=NaptanPublicBusCoachTram&modes=bus&app_key=${api_key}`
    );
    const busStops: TflApiResponse = {
      success: true,
      stops: response.data.stopPoints,
    };
    return busStops;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status);
      console.error(error.response);
    } else {
      console.error(error);
    }
    const busStops: TflApiResponse = {
      success: false,
      stops: [],
    };
    return busStops;
  }
}
