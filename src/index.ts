import dotenv from "dotenv";
dotenv.config();

import { ApiResponse } from "types/twelveResponseTypes";
import fetchStockPrice from "./api/getStockPrice";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

interface Argv {
  symbol?: string;
  full?: boolean;
  _: string[];
  $0: string;
}

const parser = yargs(hideBin(process.argv))
  .usage("Usage: $0 [command] [options]")
  .command(
    "symbol <symbol>",
    "Fetch stack price for a specifc symbol",
    (yargs) => {
      yargs
        .positional("symbol", {
          describe: "Stock symbol",
          type: "string",
        })
        .option("full", {
          describe: "Dislay full data, powered by Twelvedata",
          type: "boolean",
        });
    }
  )
  .help("h")
  .alias("h", "help");

(async () => {
  const apiKey = process.env.API_KEY || "";
  const argv = (await parser.argv) as Argv;

  if (!argv.symbol) {
    console.error("Stock symbol is required.");
    process.exit(1);
  }

  const stockSymbol = argv.symbol.toUpperCase();
  const displayFull = argv.full ?? false;

  const interval: string = "30min";

  try {
    const stockData: ApiResponse = await fetchStockPrice(
      stockSymbol,
      interval,
      apiKey
    );

    /* Display current stock price */
    const currentPrice = stockData.values[0].close;
    console.log(`Current Stock Price for ${stockSymbol}: ${currentPrice}`);

    // misc data
    const { currency, exchange, type } = stockData.meta;
    console.log(`Currency: ${currency}`);
    console.log(`Exchange: ${exchange}`);
    console.log(`Type: ${type}`);

    // display entire data if --full flag is provided
    if (displayFull) {
      console.log("Entire Data:", stockData);
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error("Error:", errorMessage);
  }
})();