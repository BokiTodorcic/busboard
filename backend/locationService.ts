import { getLongLatData } from "./positionApiService";
import { type Position } from "../src/types";

export async function handlePostcodeRequest(postcode: string = "BR87RE") {
  const longLatData: Promise<Position> = getLongLatData(postcode);
  const position: Position = {
    latitude: longLatData.latitude,
    longitude: longLatData.longitude,
  };
  return position;
}
