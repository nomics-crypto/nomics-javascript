import { objToUrlParams } from "./url";

test("returns a request string from an object", () => {
  expect(
    objToUrlParams({
      foo: "bar",
      test: 1
    })
  ).toEqual("foo=bar&test=1");
});

test("does not add null values", () => {
  expect(
    objToUrlParams({
      foo: "bar",
      test: null
    })
  ).toEqual("foo=bar");
});

test("will return empty if given empty", () => {
  expect(objToUrlParams({})).toEqual("");
});
