import { getLongLatData } from "./positionApiService";
import type { LocalBusStopInformation,  Position, BusArrivalInformation } from "../src/types";
import { getBusStopsWithinRadius } from "./tflApiService";
import { handleLatestArrivalsRequest } from "./busArrivalsService";

export async function handlePostcodeRequest(postcode: string) {
  const longLatData: Position = await getLongLatData(postcode);
  const position: Position = {
    latitude: longLatData.latitude,
    longitude: longLatData.longitude,
  };
  const allLocalBusStops: LocalBusStopInformation[] =
    await getBusStopsWithinRadius(position.latitude, position.longitude);
  const orderedLocalBusStops: LocalBusStopInformation[] =
    orderBusStopData(allLocalBusStops);
  const closestLocalBusStops: LocalBusStopInformation[] =
    limitClosesBusStops(orderedLocalBusStops);
  const closestArrivals: BusArrivalInformation[] = []
  Promise.allSettled(closestLocalBusStops.map(async (busStop) => {
    const arrivals = await handleLatestArrivalsRequest(busStop.naptanId)
    closestArrivals.push(...arrivals)
  }))
  console.log(closestArrivals);
}

function orderBusStopData(localBusStops: LocalBusStopInformation[]) {
  return [...localBusStops].sort((a, b) => (a.distance < b.distance ? -1 : 1));
}

function limitClosesBusStops(
  arrivalData: LocalBusStopInformation[],
  arrivalLimit: number = 2
) {
  return arrivalData.slice(0, arrivalLimit);
}
