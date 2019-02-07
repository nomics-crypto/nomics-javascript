import currenciesTicker, {
  ICurrenciesTickerOptions,
  IRawCurrencyTicker
} from "./api/currencies_ticker";

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

const Nomics = function(options: INomicsOptions): INomics {
  const obj = Object.create(api);
  obj.apiKey = options.apiKey;

  return obj;
};

export default Nomics;
