import type { ArrivalsTableProps } from "./types";

export default function NoArrivalsTable(props: ArrivalsTableProps) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl text-cyan-700 m-4 mb-2">
        Station ID: {props.stationInfo.stationName}
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
          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
            <td>No scheduled arrivals</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
