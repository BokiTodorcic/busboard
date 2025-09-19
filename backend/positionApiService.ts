import axios from "axios";
import type { Position, PostcodeApiResponse } from "../src/types";

export async function getLongLatData(
  postcode: string
): Promise<PostcodeApiResponse> {
  try {
    const response = await axios.get<{ result: Position }>(
      `https://api.postcodes.io/postcodes/${postcode}`
    );
    const res: PostcodeApiResponse = {
      success: true,
      status: response.status,
      data: response.data.result,
    };
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const res: PostcodeApiResponse = {
        success: false,
        status: error.response?.status,
        message: error.response?.data.error,
      };
      console.error(res);
      return res;
    } else {
      throw new Error((error as Error).message);
    }
  }
}
