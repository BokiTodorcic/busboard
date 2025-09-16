export type BusArrivalInformation = {
  lineName: string;
  destinationName: string;
  timeToStation: number;
  arrivalTime?: number;
};

export type Position = {
  latitude: number,
  longitude: number
}