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
  // TODO: uncomment these when test suite more mature
  // coverageThreshold: {
  //   global: {
  //     statements: 90,
  //     branches: 90,
  //     functions: 90,
  //     lines: 90,
  //   },
  // },
  testPathIgnorePatterns: ["<rootDir>/config"],
};
