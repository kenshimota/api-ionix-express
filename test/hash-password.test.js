const HashPassword = require("../app/utils/hash-password");

test("password void", () => {
  const hash = new HashPassword();
  expect(() => hash.setPassword(null)).toThrow(Error);
});

test("password with just lower letter", () => {
  const hash = new HashPassword();
  expect(() => hash.setPassword("manager")).toThrow(Error);
});

test("password with just capital letter", () => {
  const hash = new HashPassword();
  expect(() => hash.setPassword("MANAGER")).toThrow(Error);
});

test("password with just number", () => {
  const hash = new HashPassword();
  expect(() => hash.setPassword("1234567")).toThrow(Error);
});

test("password with number, lower letter and capital letter", () => {
  const hash = new HashPassword();
  expect(hash.setPassword("123ABCabc")).toBe(true);
});
