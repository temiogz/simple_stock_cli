### stockprice
basic stockprice cli to get real time stock prices.

### Installing
```bash
git clone https://github.com/Mt9555/stockprice.git
cd stockprice
install dependencies
yarn run start:dev
```

### Usage
> Create an account on TwelveData to obtain your API key.  [twelveData](https://twelvedata.com/docs#authentication) 
set environment variable - `export API_KEY=your-api-key`  you can also set env var for all your shell sessions.

```bash
symlink the package "stockprice"
$ stockprice --symbol AAPL # Use the --full flag to get entire stock data (optional)
```
> note: It's not designed to be published on NPMJS. Feel free to tailor to your own needs.