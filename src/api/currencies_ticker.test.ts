import currenciesTicker from "./currencies_ticker";
import { fetchJSON } from "../utils/fetch";
import { API_BASE } from "../constants";

jest.mock("../utils/fetch");

test("currencies ticker requests correct url path", () => {
  currenciesTicker("xyz", API_BASE, { interval: ["1d"] });

  expect(fetchJSON).toHaveBeenCalledWith(expect.stringContaining(API_BASE));
  expect(fetchJSON).toHaveBeenCalledWith(
    expect.stringContaining("/v1/currencies/ticker?")
  );
  expect(fetchJSON).toHaveBeenCalledWith(
    expect.stringContaining("interval=1d")
  );
  expect(fetchJSON).toHaveBeenCalledWith(expect.stringContaining("key=xyz"));
});

test("does not add interval if no interval is passed", () => {
  currenciesTicker("xyz", API_BASE);

  expect(fetchJSON).toHaveBeenCalledWith(
    expect.not.stringContaining("interval")
  );
});

test("passes quote-currency if quoteCurrency is specified", () => {
  currenciesTicker("xyz", API_BASE, { quoteCurrency: "ETH" });
  expect(fetchJSON).toHaveBeenCalledWith(
    expect.stringContaining("quote-currency")
  );
});
