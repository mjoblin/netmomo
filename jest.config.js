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
    testPathIgnorePatterns: [
        "/node_modules/",
        "ignore",
    ],
    transformIgnorePatterns: [
        "<rootDir>/node_modules/",
    ],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|scss|less)$": "<rootDir>/__mocks__/styleMock.js"
    },
    setupFiles: [
        "<rootDir>/jestSetup.js",
    ],
};