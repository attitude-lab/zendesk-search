module.exports = {
  coverageThreshold: {
    global: {
      statements: 95,
      branches: 90,
      lines: 95,
      functions: 3
    }
  },
  testEnvironment: 'node',
  collectCoverage: true,
  testRegex: '.*(T|t)est.js$',
  roots: ['src'],
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: ['src/coverage', 'src/config'],
  coverageDirectory: 'src/coverage'
};
