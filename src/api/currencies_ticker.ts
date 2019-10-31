import Nomics from "..";
import { IntervalEnum } from "../constants";
import { fetchJSON } from "../utils/fetch";
import { objToUrlParams } from "../utils/url";

export interface ICurrenciesTickerOptions {
  interval?: string[];
  ids?: string[];
  quoteCurrency?: string;
  convert?: string;
  includeTransparency?: boolean;
}

// tslint:disable-next-line: interface-over-type-literal
export type CurrencyTickerInterval = {
  volume: string;
  price_change: string;
  price_change_pct: string;
  volume_change: string;
  volume_change_pct: string;
  market_cap_change?: string;
  market_cap_change_pct?: string;
  volume_transparency?: VolumeTransparency[];
  volume_transparency_grade?: string;
};

// tslint:disable-next-line: interface-over-type-literal
export type VolumeTransparency = {
  grade: string;
  volume: string;
  volume_change: string;
  volume_change_pct: string;
};

export interface IRawCurrencyTicker {
  id: string;
  currency: string;
  symbol: string;
  name?: string;
  logo_url?: string;
  price: string;
  price_date: string;
  circulating_supply?: string;
  max_supply?: string;
  market_cap?: string;
  rank?: string;
  high?: string;
  high_timestamp?: string;

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

const currenciesTicker = (
  key: string,
  options: ICurrenciesTickerOptions = {},
  fetchOptions?: RequestInit
): Promise<IRawCurrencyTicker[]> => {
  const {
    convert,
    ids,
    interval,
    quoteCurrency,
    includeTransparency
  } = options;
  const objParams = {
    convert,
    ids: ids && ids.join(","),
    "include-transparency": includeTransparency,
    interval: interval && interval.join(","),
    key,
    "quote-currency": quoteCurrency
  };

  return fetchJSON(
    `${Nomics.NOMICS_API_BASE}${CURRENCIES_TICKER_PATH}?${objToUrlParams(
      objParams
    )}`,
    fetchOptions
  );
};

export default currenciesTicker;
