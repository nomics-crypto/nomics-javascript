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
}

class Nomics {
  private apiKey: string;

  constructor(options: INomicsOptions) {
    const { apiKey } = options;

    if (isEmpty(apiKey)) {
      throw new Error("Nomics API Key must be specified");
    }

    this.apiKey = apiKey;
  }

  currencies(options: ICurrenciesTickerOptions) {
    return currenciesTicker(options, this.apiKey);
  }
}

export default Nomics;
