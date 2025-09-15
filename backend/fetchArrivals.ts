import axios from "axios";

const api_key: string | undefined = import.meta.env.API_KEY;
const stopID: string = "490008660N";

export async function getBusArrivals() {
  try {
    const response = await axios.get(
      `https://api.tfl.gov.uk/StopPoint/${stopID}/Arrivals?api_key=${api_key}`
    );
    return JSON.stringify(response.data);
  } catch (error) {
    console.error(error);
    return "No data";
  }
}
