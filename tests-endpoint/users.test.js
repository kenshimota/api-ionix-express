const request = require("supertest");
const app = require("../index");
const userTest = { username: "panthon0", password: "8UFd7u75S" };
const userData = {
  username: "kenshimota",
  password: "123ABCabc",
  firstname: "Erik",
  lastname: "Mota",
  email: "kenshimota@gmail.com",
};

let server;
let global = {};
let userId = null;

beforeEach(async () => {
  server = await app.listen(4000);
  global.agent = request.agent(server);
});

const getToken = async function () {
  const response = await request(server).post("/api/auth/login").send(userTest);
  expect(response.statusCode).toBe(200);
  expect(!response.body.token == false).toBe(true);
  return response.body.token;
};

describe("", () => {
  test("create users unwith credentials", async () => {
    const response = await request(server).post("/api/users").send(userData);
    expect(response.statusCode).toBe(401);
    expect(!response.body.message == false).toBe(true);
  });

  test("create users with credentials", async () => {
    const token = await getToken();
    const response = await request(server)
      .post("/api/users")
      .set("Authorization", token)
      .send(userData);

    expect(response.statusCode).toBe(201);
    expect(!response.body.id == false).toBe(true);
    userId = response.body.id;
  });

  test("get users with id not exists", async () => {
    const response = await request(server).get("/api/users/-3");
    expect(response.statusCode).toBe(422);
    expect(!response.body.message == false).toBe(true);
  });

  test("get users with id that exists", async () => {
    const response = await request(server).get("/api/users/" + userId);

    expect(response.statusCode).toBe(200);
    expect(!response.body.id == false).toBe(true);
  });

  test("update users unwith credentials", async () => {
    const response = await request(server)
      .put("/api/users/" + userId)
      .send(userData);
    expect(response.statusCode).toBe(401);
    expect(!response.body.message == false).toBe(true);
  });

  test("update users with credentials", async () => {
    const token = await getToken();
    const response = await request(server)
      .put("/api/users/" + userId)
      .set("Authorization", token)
      .send(userData);

    expect(response.statusCode).toBe(202);
    expect(!response.body.id == false).toBe(true);
  });

  test("delete users unwith authorization", async () => {
    const response = await request(server).delete("/api/users/" + userId);
    expect(response.statusCode).toBe(401);
    expect(!response.body.message == false).toBe(true);
  });

  test("delete users with id not exists", async () => {
    const token = await getToken();
    const response = await request(server)
      .delete("/api/users/-3")
      .set("Authorization", token);

    expect(response.statusCode).toBe(422);
    expect(!response.body.message == false).toBe(true);
  });

  test("get users with id that exists", async () => {
    const token = await getToken();
    const response = await request(server)
      .delete("/api/users/" + userId)
      .set("Authorization", token);

    expect(response.statusCode).toBe(204);
  });
});

afterEach(async () => {
  await server.close();
});
