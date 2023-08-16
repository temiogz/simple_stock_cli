import dotenv from "dotenv";
dotenv.config();

import { ApiResponse } from "types/twelveDataApiTypes";
import fetchStockPriceFromTwelveData from "./api/twelveDataApiService";
import yargs, { Arguments } from "yargs";
import { hideBin } from "yargs/helpers";

interface SymbolOptions {
  symbol: string;
  full?: boolean;
}

const parser = yargs(hideBin(process.argv))
  .usage("Usage: $0 [command] [options]")
  .command<SymbolOptions>(
    "symbol <symbol>",
    "Fetch stock price for a specific symbol",
    (yargs) => {
      yargs
        .positional("symbol", {
          describe: "Stock symbol",
          type: "string",
        })
        .option("full", {
          describe: "Display full data, powered by TwelveData",
          type: "boolean",
        });
    }
  )
  .help("h")
  .alias("h", "help");

(async () => {
  const INTERVAL = "30min";
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) throw new Error("API_KEY environment variable is missing.");
  
  try {
    const argv = parser.parseSync() as Arguments<SymbolOptions>;

    if (!argv.symbol) {
      console.error("Stock symbol is required.");
      process.exit(1);
    }

    /* args */
    const stockSymbol = argv.symbol.toUpperCase();
    const displayFull = argv.full || false;

    const stockData: ApiResponse = await fetchStockPriceFromTwelveData(
      stockSymbol,
      INTERVAL,
      API_KEY
    );

    // current stock price
    const currentPrice = stockData.values[0].close;
    console.log(`Current Stock Price for ${stockSymbol}: ${currentPrice}`);

    // misc data
    const { currency, exchange, type } = stockData.meta;
    console.log(`Currency: ${currency}`);
    console.log(`Exchange: ${exchange}`);
    console.log(`Type: ${type}`);

    // log entire data if --full flag is provided
    if (displayFull) {
      console.log("Entire Data:", stockData);
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error("Error:", errorMessage);
  }
})();