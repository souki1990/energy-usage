module.exports = {
  preset: "ts-jest",
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy"
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

};
