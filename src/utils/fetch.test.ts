import fetch from "cross-fetch";
import { fetchJSON } from "./fetch";

jest.mock("cross-fetch", () =>
  jest.fn(() =>
    Promise.resolve({
      json: jest.fn(() => ({
        test: "ok"
      })),
      ok: true,
      status: 200
    })
  )
);

test("passes string to fetch lib", async () => {
  await fetchJSON("https://foo.com");

  expect(fetch).toHaveBeenCalledWith("https://foo.com", undefined);
});

test("throws when response status is not ok", async () => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    json: jest.fn(),
    ok: false,
    status: 401
  });

  try {
    await fetchJSON("https://foo.com");
  } catch (error) {
    expect(error).toStrictEqual(expect.objectContaining({ status: 401 }));
  }
});

test("returns json from response", async () => {
  expect(await fetchJSON("https://foo.com")).toEqual({
    test: "ok"
  });
});
