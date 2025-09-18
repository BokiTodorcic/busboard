export type BusArrivalInformation = {
  lineName: string;
  destinationName: string;
  timeToStation: number;
  naptanId: string;
  arrivalTime?: number;
  stationName: string;
};

export type StationInformation = {
  stationName: string;
  arrivalsInfo: BusArrivalInformation[];
};

export type Position = {
  latitude: number;
  longitude: number;
};

export type LocalBusStopInformation = {
  distance: number;
  naptanId: string;
};

export type ArrivalsTableProps = {
  stationInfo: StationInformation;
  key: number;
};
