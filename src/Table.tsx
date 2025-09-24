import type { BusArrivalInformation, ArrivalsTableProps } from "./types";

export default function ArrivalsTable({stationInfo: stationInfo}: ArrivalsTableProps) {
  const hasArrivals = stationInfo.arrivalsInfo.length > 0;

  return (
    <div className="mb-10">
      <h2 className="text-2xl text-cyan-700 m-4 mb-2">
        {stationInfo.stationName}
      </h2>
      <table className="shadow-md w-150 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ml-4">
        <thead className="text-S text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th>Bus Number</th>
            <th>Destination</th>
            <th>Arrival Time</th>
          </tr>
        </thead>
        <tbody>
          {hasArrivals ? (
            stationInfo.arrivalsInfo.map(
              (bus: BusArrivalInformation, index: number) => {
                return (
                  <tr
                    key={index}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                  >
                    <td>{bus.lineName}</td>
                    <td>{bus.destinationName}</td>
                    <td>{bus.timeToStation} mins</td>
                  </tr>
                );
              }
            )
          ) : (
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
              <td>No scheduled arrivals</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
