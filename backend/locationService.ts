import { getLongLatData } from "./positionApiService";
import { type Position } from "../src/types";

export async function handlePostcodeRequest(postcode: string) {
  const longLatData: Position = await getLongLatData(postcode);
  const position: Position = {
    latitude: longLatData.latitude,
    longitude: longLatData.longitude,
  };
  return position;
}
