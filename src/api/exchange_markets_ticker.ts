import Nomics from "..";
import { IntervalEnum } from "../constants";
import { fetchJSON } from "../utils/fetch";
import { objToUrlParams } from "../utils/url";

export interface IExchangeMarketsTickerOptions {
  convert?: string;
  interval?: string[];
  currency?: string[];
  exchange?: string[];
}

// tslint:disable-next-line: interface-over-type-literal
export type ExchangeMarketTickerInterval = {
  volume: string;
  volume_base: string;
  volume_base_change: string;
  volume_change: string;
  price_change: string;
  price_quote_change: string;
  trades: string;
  trades_change: string;
};

export interface IRawExchangeMarketTicker {
  exchange: string;
  market: string;
  type: string;
  price_exclude: boolean;
  volume_exclude: boolean;
  aggregated: boolean;
  base: string;
  quote: string;
  base_symbol: string;
  quote_symbol: string;
  price: string;
  price_quote: string;
  last_updated: string;

  [IntervalEnum.Day]?: ExchangeMarketTickerInterval;
  [IntervalEnum.Week]?: ExchangeMarketTickerInterval;
  [IntervalEnum.Month]?: ExchangeMarketTickerInterval;
  [IntervalEnum.YearToDate]?: ExchangeMarketTickerInterval;
  [IntervalEnum.Year]?: ExchangeMarketTickerInterval;
}

const EXCHANGES_TICKER_PATH = `/v1/exchange-markets/ticker`;

const exchangeMarketsTicker = (
  key: string,
  options: IExchangeMarketsTickerOptions = {},
  fetchOptions?: RequestInit
): Promise<IRawExchangeMarketTicker[]> => {
  const { convert, currency, exchange, interval } = options;
  const objParams = {
    convert,
    currency: currency && currency.join(","),
    exchange: exchange && exchange.join(","),
    interval: interval && interval.join(","),
    key
  };

  return fetchJSON(
    `${Nomics.NOMICS_API_BASE}${EXCHANGES_TICKER_PATH}?${objToUrlParams(
      objParams
    )}`,
    fetchOptions
  );
};

export default exchangeMarketsTicker;
