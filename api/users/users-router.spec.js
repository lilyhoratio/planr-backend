const request = require("supertest");

const db = require("../../data/dbConfig.js");
const prepTestDB = require("../../helpers/prepTestDB.js");
const Users = require("./users-model.js");

const server = require("../server.js");
const { restricted } = require("../middleware/auth-middleware.js");
jest.mock("../middleware/auth-middleware.js");
// let token;
// const user = { email: "testing", password: "******" };

beforeEach(() => db.seed.run());

describe("users-router.js", () => {
  describe("GET /api/users", () => {
    it("responds with 200 OK", async () => {
      const res = await request(server).get("/api/users");
      // .set("Authorization", `${token}`);

      expect(res.status).toBe(200);
    });

    it("gets all users", async () => {
      const res = await request(server).get("/api/users");
      // .set("Authorization", `${token}`);

      expect(res.body).toHaveLength(2);
    });
  });

  describe("GET /api/users/:id", () => {
    it("responds with 200 OK", async () => {
      const res = await request(server).get("/api/users/1");
      // .set("Authorization", `${token}`);

      expect(res.status).toBe(200);
    });

    it("responds with 404 NOT FOUND", async () => {
      const res = await request(server).get("/api/users/14");
      // .set("Authorization", `${token}`);

      expect(res.status).toBe(404);
    });

    it("get user by id 1", async () => {
      const res = await request(server).get("/api/users/1");
      // .set("Authorization", `${token}`);
      expect(res.body).toEqual({
        company: "Tester Inc.",
        email: "test@example.com",
        id: 1,
        name: "John Smith",
        role: "tester"
      });
    });
  });

  describe("POST /api/users/register", () => {
    it("unique email validation working, responds with 400 BAD REQUEST", async () => {
      const newUser = {
        company: "Tester Inc.",
        email: "test@example.com",
        password: "test",
        name: "John Smith",
        role: "tester"
      };

      const res = await request(server)
        .post("/api/users/register")
        .send(newUser);

      // .set("Authorization", `${token}`);
      // console.log(res);
      // await request(server).get("/api/users")
      expect(res.status).toBe(400);
    });

    it("required user data validation working, responds with 400 BAD REQUEST", async () => {
      const newUser = {
        company: "Tester Inc.",
        email: "test@example.com",
        password: "test",
        role: "tester"
      };

      const res = await request(server)
        .post("/api/users/register")
        .send(newUser);

      // .set("Authorization", `${token}`);
      // console.log(res);
      // await request(server).get("/api/users")
      expect(res.status).toBe(400);
    });

    it("adds a user to the db", async () => {
      const newUser = {
        company: "Tester Inc.",
        email: "test123@example.com",
        password: "test",
        name: "John Smith",
        role: "tester"
      };

      let accs = await db("users");
      expect(accs).toHaveLength(2);

      await request(server) // tests the Users endpoint
        .post("/api/users/register")
        .send(newUser);

      accs = await db("users");
      expect(accs).toHaveLength(3);
      // .set("Authorization", `${token}`);
      // console.log(res.body);
      // expect(res.status).toBe(201);
    });
  });

  describe("POST /api/users/login", () => {
    it("returns a 200 OK", async () => {
      const newUser = {
        email: "test@example.com",
        password: "test"
      };

      const res = await request(server) // tests the Users endpoint
        .post("/api/users/login")
        .send(newUser);
      console.log(res.body);
      expect(res.status).toBe(200);
    });
  });
});
