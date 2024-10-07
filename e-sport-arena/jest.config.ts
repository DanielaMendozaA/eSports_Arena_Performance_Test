module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
  
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
  
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1',
    },
  
    coverageDirectory: '<rootDir>/coverage',
    verbose: true,
  };
  