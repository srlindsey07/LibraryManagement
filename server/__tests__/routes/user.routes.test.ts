import User from "../../src/entities/User";
import { cleanUpDatabase, getApp, startApp, stopApp } from "../utils/test-setup";
import request from "supertest";

let userController = 
beforeAll(async () => {
    await startApp();
});

beforeEach(async () => {
    await cleanUpDatabase(User);
});

afterAll(async () => {
    await stopApp();
});

describe("GET /users (get all users)", () => {
    const mockUsers = [];
    // it("should get users if request has token", async () => {
    //     const response = await request(getApp())
    //         .get('/api/users')
    //         .set("Cookie", [
    //             'access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE3MTYzMTczMzQsImV4cCI6MTcxNjQwMzczNH0.iP8CSuFOi_U7Zht0p3KlttNWfZ3ZxQ8NIg6aaDLTv4Y; Path=/; HttpOnly;'
    //         ]);
    //     expect(response.status).toBe(200);
    // })
})