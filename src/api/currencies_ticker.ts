import { API_BASE, IntervalEnum } from "../constants";
import { objToUrlParams } from "../utils/url";
import { fetchJSON } from "../utils/fetch";

export interface ICurrenciesTickerOptions {
  interval?: string[];
}

export type CurrencyTickerInterval = {
  volume: string | number;
  price_change: string | number;
  price_change_pct: string | number;
  volume_change: string | number;
  volume_change_pct: string | number;
  market_cap_change: string | number;
  market_cap_change_pct: string | number;
};

export interface IRawCurrencyTicker {
  symbol: string;
  price: string | number;
  circulating_supply: string | number;
  max_supply: string | number;
  market_cap: string | number;
  rank?: string | number;
  high: string | number;
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

const CURRENCIES_TICKER_URL = `${API_BASE}/v1/currencies/ticker`;

const currenciesTicker = async (
  key: string,
  options: ICurrenciesTickerOptions = {}
): Promise<IRawCurrencyTicker[]> => {
  const { interval } = options;
  const objParams = {
    interval: interval && interval.join(","),
    key
  };

  return fetchJSON(`${CURRENCIES_TICKER_URL}?${objToUrlParams(objParams)}`);
};

export default currenciesTicker;
