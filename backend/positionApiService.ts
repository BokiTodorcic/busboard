import axios from "axios";
import { type Position } from "../src/types";

export async function getLongLatData(postcode: string): Promise<Position> {
  try {
    const response = await axios.get(
      `https://api.postcodes.io/postcodes/${postcode}`
    );
    return response.data.result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
