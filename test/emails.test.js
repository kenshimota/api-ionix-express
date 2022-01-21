const Emails = require("../app/utils/emails");

test("email void", () => {
  const emails = new Emails();
  expect(() => emails.setEmail(null)).toThrow(Error);
});

test("email wrong string", () => {
  const emails = new Emails();
  expect(() => emails.setEmail("holacomostas.com")).toThrow(Error);
});

test("email valid", () => {
  const emails = new Emails();
  expect(emails.setEmail("admin@example.com")).toBe(true);
});
