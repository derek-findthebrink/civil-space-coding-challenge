module.exports = {
  setupFilesAfterEnv: ["<rootDir>/rtl.setup.js"],
  collectCoverage: true,
  coverageDirectory: "<rootDir>/frontend/coverage",
  collectCoverageFrom: [
    "frontend/**/*.js",
    "!frontend/**/*.test.js",
    "!frontend/coverage/**/*.js",
    "!config/**/*.js",
  ],
  // TODO: uncomment these
  // coverageThreshold: {
  //   global: {
  //     statements: 50,
  //     branches: 40,
  //     functions: 55,
  //     lines: 65,
  //   },
  // },
  testPathIgnorePatterns: ["<rootDir>/config"],
};
