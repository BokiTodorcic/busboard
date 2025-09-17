export type BusArrivalInformation = {
  lineName: string;
  destinationName: string;
  timeToStation: number;
  naptanId?: string;
  arrivalTime?: number;
};

export type Position = {
  latitude: number;
  longitude: number;
};

export type LocalBusStopInformation = {
  distance: number;
  naptanId: string;
};
