import currenciesTicker, {
  CurrencyTickerInterval,
  ICurrenciesTickerOptions,
  IRawCurrencyTicker
} from "./api/currencies_ticker";
import exchangesTicker, {
  IExchangesTickerOptions
} from "./api/exchanges_ticker";
import { API_BASE, IntervalEnum } from "./constants";
import { isEmpty } from "./utils/str";

export { IRawCurrencyTicker, CurrencyTickerInterval };
export { IntervalEnum };

export interface INomics {
  currencies: (
    options: ICurrenciesTickerOptions
  ) => Promise<IRawCurrencyTicker[]>;
}

export interface INomicsOptions {
  apiKey: string;
  version?: number;
}

class Nomics {
  public static set NOMICS_API_BASE(apiBase: string) {
    Nomics.baseUrl = apiBase;
  }

  public static get NOMICS_API_BASE() {
    return Nomics.baseUrl;
  }

  private static baseUrl: string = API_BASE;
  private apiKey: string;
  private version: number = 1;

  constructor(options: INomicsOptions) {
    const { apiKey, version } = options;

    if (isEmpty(apiKey)) {
      throw new Error("Nomics API Key must be specified");
    }

    this.apiKey = apiKey;
    this.version = version ? version : this.version;
  }

  public currenciesTicker(options?: ICurrenciesTickerOptions) {
    return currenciesTicker(this.apiKey, options);
  }

  public exchangesTicker(options?: IExchangesTickerOptions) {
    return exchangesTicker(this.apiKey, options);
  }
}

export default Nomics;
