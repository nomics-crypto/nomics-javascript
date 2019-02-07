import currenciesTicker, {
  ICurrenciesTickerOptions,
  IRawCurrencyTicker,
  CurrencyTickerInterval
} from "./api/currencies_ticker";
import { IntervalEnum } from "./constants";
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

  constructor(options: INomicsOptions) {
    const { apiKey, version } = options;

    if (isEmpty(apiKey)) {
      throw new Error("Nomics API Key must be specified");
    }

    this.apiKey = apiKey;
    this.version = version ? version : this.version;
  }

  currenciesTicker(options?: ICurrenciesTickerOptions) {
    return currenciesTicker(this.apiKey, options);
  }
}

export default Nomics;
