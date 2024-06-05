import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    modulePaths: [compilerOptions.baseUrl],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "./resources/ts/tests/__mocks__/fileTransformer.js"
    },
    transformIgnorePatterns: [
        "/vendor/tightenco/ziggy"
    ],
    setupFilesAfterEnv: ["./jest-setup.ts"],
    moduleDirectories: [
        'node_modules',
        'tests/utils',
        __dirname
    ]
};

export default jestConfig;