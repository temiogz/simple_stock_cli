import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "../types/twelveDataApiTypes";

/**
 * Fetches stock price data from the TwelveData API.
 *
 * @param symbol - The stock symbol.
 * @param interval - The time interval for data points.
 * @param apikey - The API key for authentication.
 * @returns A Promise resolving to the API response data.
 * @throws Error if there's an issue with the API request.
 */
export default async function fetchStockPriceFromTwelveData(
  symbol: string,
  interval: string,
  apikey: string
): Promise<ApiResponse> {
  const twelveDataStockAPIUrl = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apikey}`;

  try {
    const response: AxiosResponse<ApiResponse> = await axios.get<ApiResponse>(
      twelveDataStockAPIUrl
    );
    const responseData: ApiResponse = response.data;
    return responseData;
  } catch (error) {
    const errorMessage: string = (error as Error).message;
    throw new Error(errorMessage);
  }
}
