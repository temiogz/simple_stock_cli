"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function fetchStockPriceFromTwelveData(symbol, interval, apikey) {
    const twelveDataStockAPIUrl = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apikey}`;
    try {
        const response = await axios_1.default.get(twelveDataStockAPIUrl);
        const responseData = response.data;
        return responseData;
    }
    catch (error) {
        const errorMessage = error.message;
        throw new Error(errorMessage);
    }
}
exports.default = fetchStockPriceFromTwelveData;
