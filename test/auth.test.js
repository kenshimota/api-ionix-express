const Auth = require("../app/services/auth");
const userTest = { username: "panthon0", password: "8UFd7u75S" };

test("into password invalid", () => {
  const auth = new Auth();
  auth
    .signin({ username: userTest.username, password: userTest.password + "1" })
    .catch((e) => expect(e).toThrow(Error));
});

test("into password valid", () => {
  const auth = new Auth();
  auth
    .signin(userTest)
    .then((token) => {
      const user = auth.checkToken(token);
      expect(user.username).toBe(userTest.username);
    })
    .catch((e) => {
      throw new Error(e);
    });
});
