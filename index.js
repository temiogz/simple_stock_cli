const axios = require("axios");

async function fetchStockPriceFromTwelveData(symbol, interval, apikey) {
  const twelveDataStockAPIUrl = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apikey}`;

  try {
    const response = await axios.get(twelveDataStockAPIUrl);
    const responseData = response.data;
    return responseData;
  } catch (error) {
    const errorMessage = error.message;
    throw new Error(errorMessage);
  }
}

const [, , symbol, interval, apikey] = process.argv;

fetchStockPriceFromTwelveData(symbol, interval, apikey)
  .then((data) => {
    console.log("Response:", data);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });