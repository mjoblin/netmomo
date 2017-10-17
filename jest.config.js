module.exports = {
    rootDir: __dirname,
    collectCoverageFrom: ["app/**/*.js"],
    collectCoverage: true,
    coverageDirectory: "./coverage",
    coverageReporters: [
        "lcov",
        "json",
        "text-summary",
        "clover"
    ],
    transformIgnorePatterns: [
        "<rootDir>/node_modules/",
    ],
};