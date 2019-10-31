import Nomics from "..";
import { IntervalEnum } from "../constants";
import { fetchJSON } from "../utils/fetch";
import { objToUrlParams } from "../utils/url";

export interface IExchangesTickerOptions {
  convert?: string;
  interval?: string[];
  ids?: string[];
}

// tslint:disable-next-line: interface-over-type-literal
export type ExchangeTickerInterval = {
  volume: string;
  volume_change: string;
  volume_change_pct: string;
  trades: string;
  trades_change: string;
  trades_change_pct: string;
};

export interface IRawExchangeTicker {
  id: string;
  name?: string;
  logo_url?: string;
  transparency_grade?: string;
  coverage_type: string;
  order_books: boolean;
  first_trade: string;
  first_candle: string;
  first_order_book: string;
  last_updated: string;
  fiat_currencies: string[];
  num_pairs: string;

  [IntervalEnum.Day]?: ExchangeTickerInterval;
  [IntervalEnum.Week]?: ExchangeTickerInterval;
  [IntervalEnum.Month]?: ExchangeTickerInterval;
  [IntervalEnum.YearToDate]?: ExchangeTickerInterval;
  [IntervalEnum.Year]?: ExchangeTickerInterval;
}

const EXCHANGES_TICKER_PATH = `/v1/exchanges/ticker`;

const exchangesTicker = (
  key: string,
  options: IExchangesTickerOptions = {},
  fetchOptions?: RequestInit
): Promise<IRawExchangeTicker[]> => {
  const { convert, ids, interval } = options;
  const objParams = {
    convert,
    ids: ids && ids.join(","),
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

export default exchangesTicker;
