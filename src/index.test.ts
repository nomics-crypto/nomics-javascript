import Nomics from ".";
import currenciesTicker from "./api/currencies_ticker";

jest.mock("./api/currencies_ticker");

test("gets an object base when setting up", () => {
  const options = { interval: ["1d"] };
  const apiKey = "abc";
  const n = new Nomics({ apiKey });
  expect(n).toBeDefined();

  n.currencies(options);

  expect(currenciesTicker).toHaveBeenCalledWith(options, apiKey);
});

test("must provide a key", () => {
  expect(() => new Nomics({ apiKey: "" })).toThrow();
});
