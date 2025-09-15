import axios from "axios";
import "dotenv/config";

const api_key: string = process.env.API_KEY;
const stopID: string = "490008660N"

async function getBusArrivals() {
  try {
    const response = await axios.get(
      `https://api.tfl.gov.uk/StopPoint/${stopID}/Arrivals`
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

getBusArrivals();
