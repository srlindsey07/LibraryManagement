/** @type {import('ts-jest').JestConfigWithTsJest} */

const dotenv = require("dotenv");
process.env.NODE_ENV = "test";
dotenv.config({ path: ".env.test" });

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ["dotenv/config"],
  modulePathIgnorePatterns: ["utils"]
};