### stockprice
CLI for fetching real-time stock prices.

### Installing
```bash
git clone https://github.com/Mt9555/stockprice.git
cd stockprice
yarn install
yarn run start:dev
```

### Usage
Create an account on TwelveData to obtain your API key. [twelveData](https://twelvedata.com/docs#authentication).
> Set environment variable - `$ ./setvar.sh` see setvar.sh.default file.   

Can also be set to persist accross your shell sessions in your startup file.

symlink the package "stockprice"

```bash
execute command "stockprice"
$ stockprice --symbol AAPL # Use the --full flag to get entire stock data (optional)
```
> note: It's not designed to be published on NPMJS. Feel free to customize to your own needs.