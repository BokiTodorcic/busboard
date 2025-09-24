import axios from "axios";
import type { PositionApiReponse, PostcodeApiResponse } from "../src/types";

export async function getLongLatData(
  postcode: string
): Promise<PostcodeApiResponse> {
  try {
    const response = await axios.get<PositionApiReponse>(
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
    } else if (error instanceof Error) {
      const res: PostcodeApiResponse = {
        success: false,
        message: error.message,
      };
      console.error(res);
      return res;
    } else {
      const res: PostcodeApiResponse = {
        success: false,
        message: "Unknown error thrown",
      };
      console.error("Unknown error thrown: ", error);
      return res
    }
  }
}
