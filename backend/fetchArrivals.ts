import axios from "axios";
import { type BusArrivalInformation } from "../src/types";

const api_key: string | undefined = import.meta.env.API_KEY;

export async function getLatestArrivals(busStopID: FormDataEntryValue) {
  try {
    const response = await axios.get(
      `https://api.tfl.gov.uk/StopPoint/${busStopID}/Arrivals?api_key=${api_key}`
    );
    const allArrivals: BusArrivalInformation[] = response.data;
    const parsedArrivals: BusArrivalInformation[] = parseBusData(allArrivals);
    const orderedArrivals: BusArrivalInformation[] =
      orderBusData(parsedArrivals);
    const latestArrivals: BusArrivalInformation[] =
      showFirstBusses(orderedArrivals);
    return latestArrivals;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function parseBusData(data: BusArrivalInformation[]) {
  const allParesedBusses: BusArrivalInformation[] = [];
  data.map((bus: BusArrivalInformation) => {
    const arrivalInMins: number = Math.ceil(bus.timeToStation / 60);
    const busInformation: BusArrivalInformation = {
      lineName: bus.lineName,
      destinationName: bus.destinationName,
      timeToStation: arrivalInMins,
    };
    allParesedBusses.push(busInformation);
  });
  return allParesedBusses;
}

function orderBusData(arrivalData: BusArrivalInformation[]) {
  const orderedBusData: BusArrivalInformation[] = arrivalData;
  orderedBusData.sort((a, b) => (a.timeToStation < b.timeToStation ? -1 : 1));
  return orderedBusData;
}

function showFirstBusses(arrivalData: BusArrivalInformation[]) {
  const arrivalLimit: number = 5;
  return arrivalData.slice(0, arrivalLimit);
}
