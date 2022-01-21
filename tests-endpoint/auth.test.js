const request = require("supertest");
const app = require("../index");
const userTest = { username: "panthon0", password: "8UFd7u75S" };
let server,
  global = {};

beforeEach(async () => {
  server = await app.listen(4000);
  global.agent = request.agent(server);
});

describe("POST /api/auth/login/", () => {
  test("start session with params valid", async () => {
    const response = await request(server)
      .post("/api/auth/login")
      .send({ userTest, password: "8972189273" });

    expect(response.statusCode).toBe(422);
    expect(!response.body.message == false).toBe(true);
  });

  test("start session with params valid", async () => {
    const response = await request(server)
      .post("/api/auth/login")
      .send(userTest);

    expect(response.statusCode).toBe(200);
    expect(!response.body.token == false).toBe(true);
  });
});

afterEach(async () => {
  await server.close();
});
