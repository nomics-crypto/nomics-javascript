import Nomics from "..";
import { API_BASE } from "../constants";
import { fetchJSON } from "../utils/fetch";
import currenciesTicker from "./currencies_ticker";

jest.mock("../utils/fetch");

beforeEach(() => {
  jest.resetAllMocks();
});

test("currencies ticker requests correct url path", () => {
  currenciesTicker("xyz", { interval: ["1d"] });

  expect(fetchJSON).toHaveBeenCalledWith(
    expect.stringContaining(API_BASE),
    undefined
  );
  expect(fetchJSON).toHaveBeenCalledWith(
    expect.stringContaining("/v1/currencies/ticker?"),
    undefined
  );
  expect(fetchJSON).toHaveBeenCalledWith(
    expect.stringContaining("interval=1d"),
    undefined
  );
  expect(fetchJSON).toHaveBeenCalledWith(
    expect.stringContaining("key=xyz"),
    undefined
  );
});

test("does not add interval if no interval is passed", () => {
  currenciesTicker("xyz");

  expect(fetchJSON).toHaveBeenCalledWith(
    expect.not.stringContaining("interval"),
    undefined
  );
});

test("passes quote-currency if quoteCurrency is specified", () => {
  currenciesTicker("xyz", { quoteCurrency: "ETH" });
  expect(fetchJSON).toHaveBeenCalledWith(
    expect.stringContaining("quote-currency"),
    undefined
  );
});

test("passes convert if convert is specified", () => {
  currenciesTicker("xyz", { convert: "ETH" });
  expect(fetchJSON).toHaveBeenCalledWith(
    expect.stringContaining("convert=ETH"),
    undefined
  );
});

test("passes ids if ids are specified", () => {
  currenciesTicker("xyz", { ids: ["ETH", "BTC"] });
  expect(fetchJSON).toHaveBeenCalledWith(
    expect.stringContaining(`ids=${encodeURIComponent("ETH,BTC")}`),
    undefined
  );
});

test("passes includeTransparency if specified", () => {
  currenciesTicker("xyz", { includeTransparency: true });
  expect(fetchJSON).toHaveBeenCalledWith(
    expect.stringContaining("include-transparency=true"),
    undefined
  );
  currenciesTicker("xyz", {});
  expect(fetchJSON).toHaveBeenCalledWith(
    expect.not.stringContaining("include-transparency"),
    undefined
  );
});

test("can change the base url via static property", () => {
  Nomics.NOMICS_API_BASE = "http://test.nomics.com";
  currenciesTicker("xyz", { interval: ["1d"] });
  expect(fetchJSON).toHaveBeenCalledWith(
    expect.stringContaining("http://test.nomics.com"),
    undefined
  );
});

test("passes request options to fetch", () => {
  currenciesTicker(
    "xyz",
    { interval: ["1d"] },
    {
      signal: null
    }
  );

  expect(fetchJSON).toHaveBeenCalledWith(expect.any(String), {
    signal: null
  });
});
