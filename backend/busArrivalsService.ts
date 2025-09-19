import type { BusArrivalInformation, StationInformation } from "../src/types";
import { getLatestArrivals } from "./tflApiService";

export async function handleLatestArrivalsRequest(
  stopId: string
): Promise<StationInformation> {
  const stationArrivals: StationInformation = {
    stationName: "",
    arrivalsInfo: [],
  };

  const arrivalsData: BusArrivalInformation[] = await getLatestArrivals(stopId);
  const parsedArrivals: BusArrivalInformation[] = parseBusData(arrivalsData);
  const orderedArrivals: BusArrivalInformation[] = orderBusData(parsedArrivals);
  const latestArrivals: BusArrivalInformation[] =
    showFirstBuses(orderedArrivals);

  stationArrivals.stationName = latestArrivals[0].stationName;
  stationArrivals.arrivalsInfo = latestArrivals;
  return stationArrivals;
}

function parseBusData(data: BusArrivalInformation[]): BusArrivalInformation[] {
  return data.map((bus: BusArrivalInformation) => {
    const arrivalInMins: number = Math.ceil(bus.timeToStation / 60);
    const busInformation: BusArrivalInformation = {
      lineName: bus.lineName,
      destinationName: bus.destinationName,
      timeToStation: arrivalInMins,
      naptanId: bus.naptanId,
      stationName: bus.stationName,
    };
    return busInformation;
  });
}

function orderBusData(
  arrivalData: BusArrivalInformation[]
): BusArrivalInformation[] {
  return [...arrivalData].sort((a, b) => a.timeToStation - b.timeToStation);
}

function showFirstBuses(
  arrivalData: BusArrivalInformation[]
): BusArrivalInformation[] {
  const arrivalLimit: number = 5;
  return arrivalData.slice(0, arrivalLimit);
}
