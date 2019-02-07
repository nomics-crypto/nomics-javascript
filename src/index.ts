import currenciesTicker, {
  ICurrenciesTickerOptions,
  IRawCurrencyTicker
} from "./api/currencies_ticker";
import { isEmpty } from "./utils/str";

export interface INomics {
  currencies: (
    options: ICurrenciesTickerOptions
  ) => Promise<IRawCurrencyTicker[]>;
}

export interface INomicsOptions {
  apiKey: string;
}

const api = {
  apiKey: "",

  currencies: function(options: ICurrenciesTickerOptions) {
    return currenciesTicker(options, this.apiKey);
  }
};

const nomics = function(options: INomicsOptions): INomics {
  const { apiKey } = options;

  if (isEmpty(apiKey)) {
    throw new Error("Nomics API Key must be specified");
  }

  const obj = Object.create(api);
  obj.apiKey = apiKey;

  return obj;
};

export default nomics;
