import { API_BASE, IntervalEnum } from "../constants";
import { objToUrlParams, fetchJSON } from "../utils/url";

export interface ICurrenciesTickerOptions {
  interval: string[];
}

export type IRawCurrencyTickerInterval = {
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

  [IntervalEnum.Day]?: IRawCurrencyTickerInterval;
  [IntervalEnum.Week]?: IRawCurrencyTickerInterval;
  [IntervalEnum.Month]?: IRawCurrencyTickerInterval;
  [IntervalEnum.YearToDate]?: IRawCurrencyTickerInterval;
  [IntervalEnum.Year]?: IRawCurrencyTickerInterval;

  sort?: {
    volume: number;
    market_cap: number;
    price: number;
  };
}

const CURRENCIES_TICKER_URL = `${API_BASE}/v1/currencies/ticker`;

const currenciesTicker = async (
  options: ICurrenciesTickerOptions,
  key: string
): Promise<IRawCurrencyTicker[]> => {
  const { interval } = options;
  const objParams = {
    interval: interval.join(","),
    key
  };

  return fetchJSON(`${CURRENCIES_TICKER_URL}?${objToUrlParams(objParams)}`);
};

export default currenciesTicker;
