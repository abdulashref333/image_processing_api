import supertest from "supertest";
import app from "../index";

// const request = supertest(app);
describe("app", () => {
  it("should return a successful response for GET /api/images", async () => {
    const response = await supertest(app).get("/api/images");
    expect(response.status).toBe(200);
  });

  it("should return a 404 response for GET /api/images/thumnail", async () => {
    const response = await supertest(app).get("/api/images/thumnail");
    expect(response.status).toBe(404);
  });

  it("should return a successful response for GET /api/images/thumnail?name=abdo", async () => {
    const response = await supertest(app).get("/api/images/thumnail?name=abdo");
    expect(response.status).toBe(200);
  });

  it("should return a successful response for GET /api/images", async () => {
    const response = await supertest(app).get("/");
    expect(response.status).toBe(200);
  });
});
