const Auth = require("../app/services/auth");
const userTest = { username: "panthon0", password: "8UFd7u75S" };

it("into password invalid", async () => {
  const auth = new Auth();
  await expect(
    auth.signin({
      username: userTest.username,
      password: userTest.password + "1",
    })
  ).rejects.toThrow(Error);
});

test("into password valid", (done) => {
  const auth = new Auth();

  async function callback(token) {
    try {
      const user = await auth.checkToken(token);
      expect(user.username).toBe(userTest.username);
      done();
    } catch (error) {
      done(error);
    }
  }

  auth.signin(userTest).then(callback);
});
