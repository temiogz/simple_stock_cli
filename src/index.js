"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getStockPrice_1 = __importDefault(require("./api/getStockPrice"));
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const parser = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .usage("Usage: $0 [command] [options]")
    .command("symbol <symbol>", "Fetch stack price for a specifc symbol", (yargs) => {
    yargs
        .positional("symbol", {
        describe: "Stock symbol",
        type: "string",
    })
        .option("full", {
        describe: "Dislay full data, powered by Twelvedata",
        type: "boolean",
    });
})
    .help("h")
    .alias("h", "help");
(async () => {
    var _a;
    const apiKey = process.env.API_KEY || "";
    const argv = (await parser.argv);
    if (!argv.symbol) {
        console.error("Stock symbol is required.");
        process.exit(1);
    }
    const stockSymbol = argv.symbol.toUpperCase();
    const displayFull = (_a = argv.full) !== null && _a !== void 0 ? _a : false;
    const interval = "30min";
    try {
        const stockData = await (0, getStockPrice_1.default)(stockSymbol, interval, apiKey);
        /* Display current stock price */
        const currentPrice = stockData.values[0].close;
        console.log(`Current Stock Price for ${stockSymbol}: ${currentPrice}`);
        // misc data
        const { currency, exchange, type } = stockData.meta;
        console.log(`Currency: ${currency}`);
        console.log(`Exchange: ${exchange}`);
        console.log(`Type: ${type}`);
        // show entire thingy if --full flag is provided
        if (displayFull) {
            console.log("Entire Data:", stockData);
        }
    }
    catch (error) {
        const errorMessage = error.message;
        console.error("Error:", errorMessage);
    }
})();
