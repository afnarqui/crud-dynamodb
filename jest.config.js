module.exports = {
    roots: [
        "<rootDir>/src",
        "<rootDir>/tests"
    ],
    setupFiles: [
        "<rootDir>/jest/mock-global.ts"
    ],
    transform: {
        ".(ts)": "ts-jest"
    },
    transformIgnorePatterns: ["/node_modules/", "^.+\\.json$"],
    testRegex: "(/tests/(/*)((?!test-helper).*))\\.ts$",
    moduleFileExtensions: ["ts", "js"],
    collectCoverageFrom: [
        "src/**"
    ]
};
