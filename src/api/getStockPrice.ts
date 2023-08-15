import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "../types/twelveResponseTypes";

export default async function fetchStockPriceFromTwelveData(
  symbol: string,
  interval: string,
  apikey: string
): Promise<ApiResponse> {
  const twelveDataStockAPIUrl = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apikey}`;

  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(
      twelveDataStockAPIUrl
    );
    const responseData = response.data;
    return responseData;
  } catch (error) {
    const errorMessage = (error as Error).message;
    throw new Error(errorMessage);
  }
}