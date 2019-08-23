import { API_BASE } from "../constants";
import { fetchJSON } from "../utils/fetch";
import exchangesTicker from "./exchanges_ticker";

jest.mock("../utils/fetch");

test("currencies ticker requests correct url path", () => {
  exchangesTicker("xyz", { interval: ["1d"] });

  expect(fetchJSON).toHaveBeenCalledWith(expect.stringContaining(API_BASE));
  expect(fetchJSON).toHaveBeenCalledWith(
    expect.stringContaining("/v1/exchanges/ticker?")
  );
  expect(fetchJSON).toHaveBeenCalledWith(
    expect.stringContaining("interval=1d")
  );
  expect(fetchJSON).toHaveBeenCalledWith(expect.stringContaining("key=xyz"));
});

test("does not add interval if no interval is passed", () => {
  exchangesTicker("xyz");

  expect(fetchJSON).toHaveBeenCalledWith(
    expect.not.stringContaining("interval")
  );
});

test("passes ids if ids are specified", () => {
  exchangesTicker("xyz", { ids: ["ETH", "BTC"] });
  expect(fetchJSON).toHaveBeenCalledWith(
    expect.stringContaining(`ids=${encodeURIComponent("ETH,BTC")}`)
  );
});
