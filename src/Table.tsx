import type { BusArrivalInformation, ArrivalsTableProps } from "./types";

export default function ArrivalsTable(props: ArrivalsTableProps) {
  return (
    <>
      <h2>{props.stationInfo.stationName}</h2>
      <table>
        <thead>
          <tr>
            <th>Bus Number</th>
            <th>Destination</th>
            <th>Arrival Time</th>
          </tr>
        </thead>
        <tbody>
          {props.stationInfo.arrivalsInfo.map(
            (bus: BusArrivalInformation, index: number) => {
              return (
                <tr key={index}>
                  <td>{bus.lineName}</td>
                  <td>{bus.destinationName}</td>
                  <td>{bus.timeToStation} mins</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </>
  );
}
