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
  noArrivals: boolean;
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

export type LocalStops = {
  stopPoints: LocalBusStopInformation[];
};

export type PostcodeApiResponse = {
  success: boolean;
  data?: Position;
  status?: number;
  message?: string;
};

export type TflApiResponse = {
  success: boolean;
  stops: LocalBusStopInformation[];
  message?: string;
};

export type StationArrivalsResponse = {
  success: boolean;
  data?: StationInformation[];
  message?: string;
};
