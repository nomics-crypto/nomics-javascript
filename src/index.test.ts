import Nomics from ".";
import currenciesTicker from "./api/currencies_ticker";

jest.mock("./api/currencies_ticker");

test("gets an object base when setting up", () => {
  const options = { interval: ["1d"] };
  const apiKey = "abc";
  const n = new Nomics({ apiKey });
  expect(n).toBeDefined();

  n.currenciesTicker(options);

  expect(currenciesTicker).toHaveBeenCalledWith(apiKey, options, undefined);
});

test("must provide a key", () => {
  expect(() => new Nomics({ apiKey: "" })).toThrow();
});
