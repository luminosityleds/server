import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  testPathIgnorePatterns: ["client", "src/notification"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  // Optionally, you can specify moduleFileExtensions if needed
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

export default config;
