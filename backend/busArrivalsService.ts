import { type BusArrivalInformation } from "../src/types";
import { getLatestArrivals } from "./tflApiService";

export async function handleLatestArrivalsRequest(stopID: string) {
  const arrivalsData: BusArrivalInformation[] = await getLatestArrivals(stopID);
  const parsedArrivals: BusArrivalInformation[] = parseBusData(arrivalsData);
  const orderedArrivals: BusArrivalInformation[] = orderBusData(parsedArrivals);
  const latestArrivals: BusArrivalInformation[] =
    showFirstBusses(orderedArrivals);
  return latestArrivals;
}

function parseBusData(data: BusArrivalInformation[]) {
  const allParesedBusses: BusArrivalInformation[] = [];
  data.map((bus: BusArrivalInformation) => {
    const arrivalInMins: number = Math.ceil(bus.timeToStation / 60);
    const busInformation: BusArrivalInformation = {
      lineName: bus.lineName,
      destinationName: bus.destinationName,
      timeToStation: arrivalInMins,
      // naptanId: bus.naptanId,
    };
    allParesedBusses.push(busInformation);
  });
  return allParesedBusses;
}

function orderBusData(arrivalData: BusArrivalInformation[]) {
  return [...arrivalData].sort((a, b) =>
    a.timeToStation < b.timeToStation ? -1 : 1
  );
}

function showFirstBusses(arrivalData: BusArrivalInformation[]) {
  const arrivalLimit: number = 5;
  return arrivalData.slice(0, arrivalLimit);
}
