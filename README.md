# Nomics JavaScript client

A Node and Browser client to make using the [Nomics API](https://api.nomics.com) a breeze in your JavaScript project.

_This project is currently under development_

## Installation and Usage

To install the Nomics client, simply install the package:

```sh
npm install --save nomics
yarn add nomics
```

Then import and initialize the client:

```javascript
import Nomics from "nomics";

// ...

const nomics = new Nomics({
  apiKey: "<your api key>"
});

// ...
```

### Ticker functions

To interact with the API after initializing the client, call the corresponding function off of the client variable:

```javascript
async function client() {
  // all currencies provided by the ticker with default options
  const currencies = await nomics.currenciesTicker();
}
```

Please note the use of await here. Because these requests are asynchronous and are returned via Promise, the functions must be awaited. Using promise syntax will also work:

```javascript
function client() {
  let currencies;
  nomics.currenciesTicker().then(ticker => (currencies = ticker));
}
```

All ticker functions can take two arguments (both are optional): ticker options (see relevant ticker information) and request fetch options.

```javascript
nomics.currenciesTicker(tickerOptions, fetchOptions);
```

For fetch options, an object conforming to [fetch standard options](https://github.com/bitinn/node-fetch#options) can be passed. These options are for more advanced configurations, and for a majority of use cases, should not need to be included.

#### Currently supported Ticker functions

`Currencies`

```javascript
nomics.currenciesTicker({
  /*
    Specify the interval for interval data in return
    One or more strings can be provided. If not provided, **all** are used.
    The intervals specified will affect what is returned in the response (see below)
  */
  interval?: ['1d'], // '1d', '7d', '30d', '365d', 'ytd'
  /*
    Limit the returned currencies to the ones in the following array. If not
    specified, **all** will be returned
  */
  ids?: ['BTC', 'ETH'],
  /*
    Specify the currency to quote all returned prices in
  */
  quoteCurrency?: "EUR", // [DEPRECATED] use "convert" below instead
  convert?: "EUR", // defaults to "USD"
});
```

This returns a list of _all_ currencies from the currencies ticker endpoint with the following data:

| Name               | Type   | Description                         |
| ------------------ | ------ | ----------------------------------- |
| id                 | string | The currency's display id           |
| symbol             | string | The currency's original symbol      |
| name               | string | The full name                       |
| logo_url           | string | The url for the currency logo image |
| price              | string | Current price                       |
| price_date         | string | The date (YYYY-MM-DD) of the price  |
| circulating_supply | string | The current circulating supply      |
| max_supply         | string | The max supply of the currency      |
| market_cap         | string | Total market cap for the currency   |
| rank               | string | Rank by market cap                  |
| high               | string | All time high for the currency      |
| high_timestamp     | string | The date of the all time high       |

Additionally, the returned data will come with interval information corresponding to the interval options passed with the call for each of the currency rows. For each interval string, the response will will have a key of the same name with interval data.

For example:

```javascript
const currencies = await nomics.currenciesTicker();
const oneDayIntervalData = currencies[0]["1d"]; // the first row's 1d interval
```

The interval data is as follows:

| Name                  | Type   | Description                                 |
| --------------------- | ------ | ------------------------------------------- |
| volume                | string | Current volume                              |
| price_change          | string | Price change over the interval              |
| price_change_pct      | string | Price change percent over the interval      |
| volume_change         | string | Volume change over the interval             |
| volume_change_pct     | string | Volume change percent over the interval     |
| market_cap_change     | string | Market cap change over the interval         |
| market_cap_change_pct | string | Market cap change percent over the interval |

## Development

### Publishing a new version

1. Version the package: `npm version {patch | minor | major}` — this updates the package json accordingly
1. Publish the package: `npm publish` — this does a pre-publish step to transpile the code to /dist, and then it publishes that. If you have 2FA setup, it’ll prompt you to enter that before publish finishes
1. Commit and push the update back to master: `git push origin master` — just make sure that the package.json in master matches the published version
