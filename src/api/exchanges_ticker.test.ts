import { API_BASE } from "../constants";
import { fetchJSON } from "../utils/fetch";
import exchangesTicker from "./exchanges_ticker";

jest.mock("../utils/fetch");

beforeEach(() => {
  jest.resetAllMocks();
});

test("currencies ticker requests correct url path", () => {
  exchangesTicker("xyz", { interval: ["1d"] });

  expect(fetchJSON).toHaveBeenCalledWith(
    expect.stringContaining(API_BASE),
    undefined
  );
  expect(fetchJSON).toHaveBeenCalledWith(
    expect.stringContaining("/v1/exchanges/ticker?"),
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
  exchangesTicker("xyz");

  expect(fetchJSON).toHaveBeenCalledWith(
    expect.not.stringContaining("interval"),
    undefined
  );
});

test("passes ids if ids are specified", () => {
  exchangesTicker("xyz", { ids: ["ETH", "BTC"] });
  expect(fetchJSON).toHaveBeenCalledWith(
    expect.stringContaining(`ids=${encodeURIComponent("ETH,BTC")}`),
    undefined
  );
});

test("passes convert if convert is specified", () => {
  exchangesTicker("xyz", { convert: "ETH" });
  expect(fetchJSON).toHaveBeenCalledWith(
    expect.stringContaining("convert=ETH"),
    undefined
  );
});

test("passes request options to fetch", () => {
  exchangesTicker(
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
