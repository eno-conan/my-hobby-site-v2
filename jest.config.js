/// <reference types="jest" />
module.exports = {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/prisma/functions/singleton.ts"],
};
