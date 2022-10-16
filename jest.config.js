import { defaults } from "jest-config";

const config = {
  verbose: true,
  moduleNameMapper: {
    "models/(.*)": "<rootDir>/src/js/models/$1",
    "views/(.*)": "<rootDir>/src/js/views/$1",
  },
  /* globals: { */
  /*   __DEV__: true, */
  /* }, */
};

export default config;
