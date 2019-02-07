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
  const currencies = await nomics.currencies();
}
```

Please note the use of await here. Because these requests are asynchronous and are returned via Promise, the functions must be awaited. Using promise syntax will also work:

```javascript
function client() {
  let currencies;
  nomics.currencies().then(ticker => (currencies = ticker));
}
```

#### Currently supported Ticker functions

`Currencies`

```javascript
nomics.currencies({
  /*
    Specify the interval for interval data in return
    One or more strings can be provided. If not provided, **all** are used.
    The intervals specified will affect what is returned in the response (see below)
  */
  interval?: ['1d'] // '1d', '7d', '30d', '365d', 'ytd'
});
```

This returns a list of _all_ currencies from the currencies ticker endpoint with the following data:

| Name               | Type   | Description                       |
| ------------------ | ------ | --------------------------------- |
| symbol             | string | The currency symbol               |
| price              | string | Current price                     |
| circulating_supply | string | The current circulating supply    |
| max_supply         | string | The max supply of the currency    |
| market_cap         | string | Total market cap for the currency |
| rank               | string | Rank by market cap                |
| high               | string | All time high for the currency    |
| high_timestamp     | string | The date of the all time high     |

Additionally, the returned data will come with interval information corresponding to the interval options passed with the call for each of the currency rows. For each interval string, the response will will have a key of the same name with interval data.

For example:

```javascript
const currencies = await nomics.currencies();
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
