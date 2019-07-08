import fetch from "cross-fetch";
import { fetchJSON } from "./fetch";

jest.mock("cross-fetch", () =>
  jest.fn(() => ({
    json: jest.fn(() => ({
      test: "ok"
    })),
    status: 200
  }))
);

test("passes string to fetch lib", async () => {
  await fetchJSON("https://foo.com");

  expect(fetch).toHaveBeenCalledWith("https://foo.com");
});

test("throws when response status is greater than 400", async () => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    json: jest.fn(),
    status: 401
  });

  await expect(fetchJSON("https://foo.com")).rejects.toThrow(Error);
});

test("returns json from response", async () => {
  expect(await fetchJSON("https://foo.com")).toEqual({
    test: "ok"
  });
});
