import currenciesTicker, {
  ICurrenciesTickerOptions,
  IRawCurrencyTicker,
  CurrencyTickerInterval
} from "./api/currencies_ticker";
import { IntervalEnum, API_BASE } from "./constants";
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
  private apiKey: string;
  private version: number = 1;
  private apiBase: string = API_BASE;

  set NOMICS_API_BASE(apiBase: string) {
    this.apiBase = apiBase;
  }

  constructor(options: INomicsOptions) {
    const { apiKey, version } = options;

    if (isEmpty(apiKey)) {
      throw new Error("Nomics API Key must be specified");
    }

    this.apiKey = apiKey;
    this.version = version ? version : this.version;
  }

  currenciesTicker(options?: ICurrenciesTickerOptions) {
    return currenciesTicker(this.apiKey, this.apiBase, options);
  }
}

export default Nomics;
