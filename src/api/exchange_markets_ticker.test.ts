import { API_BASE } from "../constants";
import { fetchJSON } from "../utils/fetch";
import exchangeMarketsTicker from "./exchange_markets_ticker";

jest.mock("../utils/fetch");

test("exchange markets ticker requests correct url path", () => {
  exchangeMarketsTicker("xyz", { interval: ["1d"] });

  expect(fetchJSON).toHaveBeenCalledWith(expect.stringContaining(API_BASE));
  expect(fetchJSON).toHaveBeenCalledWith(
    expect.stringContaining("/v1/exchange-markets/ticker?")
  );
  expect(fetchJSON).toHaveBeenCalledWith(
    expect.stringContaining("interval=1d")
  );
  expect(fetchJSON).toHaveBeenCalledWith(expect.stringContaining("key=xyz"));
});

test("does not add interval if no interval is passed", () => {
  exchangeMarketsTicker("xyz");

  expect(fetchJSON).toHaveBeenCalledWith(
    expect.not.stringContaining("interval")
  );
});

test("passes currencies if currencies are specified", () => {
  exchangeMarketsTicker("xyz", { currency: ["ETH", "BTC"] });
  expect(fetchJSON).toHaveBeenCalledWith(
    expect.stringContaining(`currency=${encodeURIComponent("ETH,BTC")}`)
  );
});

test("passes exchanges if exchanges are specified", () => {
  exchangeMarketsTicker("xyz", { exchange: ["yobit", "binance"] });
  expect(fetchJSON).toHaveBeenCalledWith(
    expect.stringContaining(`exchange=${encodeURIComponent("yobit,binance")}`)
  );
});

test("passes convert if convert is specified", () => {
  exchangeMarketsTicker("xyz", { convert: "ETH" });
  expect(fetchJSON).toHaveBeenCalledWith(
    expect.stringContaining("convert=ETH")
  );
});
