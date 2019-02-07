import { isEmpty } from "./str";

test("returns true when empty", () => {
  expect(isEmpty("")).toBe(true);
  expect(isEmpty(null)).toBe(true);
  expect(isEmpty()).toBe(true);
});

test("returns false when not empty", () => {
  expect(isEmpty(" ")).toBe(false);
  expect(isEmpty("foo")).toBe(false);
});
