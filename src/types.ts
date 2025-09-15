export type BusArrivalInformation = {
  route: string;
  destination: string;
  arrivalTime: string;
};

export type BusArrivalRawData = {
  lineName: string;
  destinationName: string;
  expectedArrival: string;
};
