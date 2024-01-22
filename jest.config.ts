import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  testPathIgnorePatterns: ["client", "src/notification"]
};

export default config;