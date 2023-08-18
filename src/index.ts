import dotenv from "dotenv";
dotenv.config();

import { ApiResponse } from "types/twelveDataApiTypes";
import fetchStockPriceFromTwelveData from "./api/twelveDataApiHandler";
import yargs, { Arguments } from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";

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
  const TIME_SERIES_INTERVAL = "30min";
  const API_KEY = process.env.TWELVE_DATA_API_KEY;

  if (!API_KEY) throw new Error("Missing API_KEY: Provide your TwelveData API key.");

  try {
    const argv = await parser.parse() as Arguments<SymbolOptions>;

    if (!argv.symbol) {
      console.error(chalk.red("Stock symbol is required."));
      process.exit(1);
    }

    const requestedStockSymbol  = argv.symbol;
    const displayFullData = argv.full || false;

    const fetchedStockPriceData: ApiResponse = await fetchStockPriceFromTwelveData(
      requestedStockSymbol ,
      TIME_SERIES_INTERVAL,
      API_KEY
    );

    const currentMarketStockPrice = fetchedStockPriceData.values[0].close;
    console.log(
      chalk.bold.white.bgGreen(
        `Current Stock Price for ${requestedStockSymbol }: ${currentMarketStockPrice}`
      )
    );

    // misc
    const { currency, exchange, type } = fetchedStockPriceData.meta;
    console.log(chalk.bold.yellow.bgBlack(`Currency: ${currency}`));
    console.log(chalk.bold.yellow.bgBlack(`Exchange: ${exchange}`));
    console.log(chalk.bold.yellow.bgBlack(`Type: ${type}`));

    // display entire data if --full flag is provided
    if (displayFullData) {
      console.log(chalk.bgGreen("Complete Data Snapshot For Given Interval:"), fetchedStockPriceData);
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error(chalk.red("Error:"), chalk.bold(errorMessage));
  }
})();
