import { getLongLatData } from "./positionApiService";
import type {
  PostcodeApiResponse,
  LocalBusStopInformation,
  Position,
  StationArrivalsResponse,
  StationInformation,
  TflApiResponse,
} from "../src/types";
import { getBusStopsWithinRadius } from "./tflApiService";
import { handleLatestArrivalsRequest } from "./busArrivalsService";

export async function handlePostcodeRequest(
  postcode: string
): Promise<StationArrivalsResponse> {
  const longLatData: PostcodeApiResponse = await getLongLatData(postcode);

  if (longLatData.data) {
    const position: Position = {
      latitude: longLatData.data.latitude,
      longitude: longLatData.data.longitude,
    };

    const allLocalBusStops: TflApiResponse = await getBusStopsWithinRadius(
      position.latitude,
      position.longitude
    );

    if (allLocalBusStops.stops.length === 0) {
      const requestResponse: StationArrivalsResponse = {
        success: false,
        message: "No bus stops found for this postcode",
      };
      return requestResponse;
    } else {
      const orderedLocalBusStops: LocalBusStopInformation[] = orderBusStopData(
        allLocalBusStops.stops
      );
      const closestLocalBusStops: LocalBusStopInformation[] =
        limitClosestBusStops(orderedLocalBusStops);

      const networkArrivals: StationInformation[] = await Promise.all(
        closestLocalBusStops.map(async (busStop) => {
          const arrivals = await handleLatestArrivalsRequest(busStop.naptanId);
          return arrivals;
        })
      );
      const requestResponse: StationArrivalsResponse = {
        success: true,
        data: networkArrivals,
      };
      return requestResponse;
    }
  } else {
    const requestResponse: StationArrivalsResponse = {
      success: false,
      message: longLatData.message,
    };
    return requestResponse;
  }
}

function orderBusStopData(
  localBusStops: LocalBusStopInformation[]
): LocalBusStopInformation[] {
  return [...localBusStops].sort((a, b) => a.distance - b.distance);
}

function limitClosestBusStops(
  arrivalData: LocalBusStopInformation[],
  arrivalLimit: number = 2
): LocalBusStopInformation[] {
  return arrivalData.slice(0, arrivalLimit);
}
