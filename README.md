### stockprice
CLI for fetching real-time stock prices.

### Installing
```bash
git clone https://github.com/Mt9555/stockprice.git
cd stockprice
install dependencies
yarn run start:dev
```

### Usage
Create an account on TwelveData to obtain your API key. [twelveData](https://twelvedata.com/docs#authentication).
> Set environment variable - `export TWELVE_DATA_API_KEY=<api-key>` , you can also set it to persist accross your shell sessions.

symlink the package "stockprice"

```bash
$ stockprice --symbol AAPL # Use the --full flag to get entire stock data (optional)
```
> note: It's not designed to be published on NPMJS. Feel free to customize to your own needs.