import { IntervalEnum } from "../constants";
import { objToUrlParams } from "../utils/url";
import { fetchJSON } from "../utils/fetch";
import Nomics from "..";

export interface ICurrenciesTickerOptions {
  interval?: string[];
  quoteCurrency?: string;
}

export type CurrencyTickerInterval = {
  volume: string;
  price_change: string;
  price_change_pct: string;
  volume_change: string;
  volume_change_pct: string;
  market_cap_change: string;
  market_cap_change_pct: string;
};

export interface IRawCurrencyTicker {
  currency: string;
  price: string;
  price_date: string;
  circulating_supply: string;
  max_supply: string;
  market_cap: string;
  rank?: string;
  high: string;
  high_timestamp: string;

  [IntervalEnum.Day]?: CurrencyTickerInterval;
  [IntervalEnum.Week]?: CurrencyTickerInterval;
  [IntervalEnum.Month]?: CurrencyTickerInterval;
  [IntervalEnum.YearToDate]?: CurrencyTickerInterval;
  [IntervalEnum.Year]?: CurrencyTickerInterval;

  sort?: {
    volume: number;
    market_cap: number;
    price: number;
  };
}

const CURRENCIES_TICKER_PATH = `/v1/currencies/ticker`;

const currenciesTicker = async (
  key: string,
  options: ICurrenciesTickerOptions = {}
): Promise<IRawCurrencyTicker[]> => {
  const { interval, quoteCurrency } = options;
  const objParams = {
    interval: interval && interval.join(","),
    "quote-currency": quoteCurrency,
    key
  };

  return fetchJSON(
    `${Nomics.NOMICS_API_BASE}${CURRENCIES_TICKER_PATH}?${objToUrlParams(
      objParams
    )}`
  );
};

export default currenciesTicker;
