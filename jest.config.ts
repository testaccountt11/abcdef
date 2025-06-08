import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts',
    '<rootDir>/client/src/test-utils/setupTests.ts'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/client/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/client/src/__mocks__/fileMock.js',
    '^@components/(.*)$': '<rootDir>/client/src/components/$1',
    '^@hooks/(.*)$': '<rootDir>/client/src/hooks/$1',
    '^@contexts/(.*)$': '<rootDir>/client/src/contexts/$1',
    '^@ui/(.*)$': '<rootDir>/client/src/components/ui/$1',
    '^@shared/(.*)$': '<rootDir>/shared/$1',
    '^wouter$': require.resolve('wouter')
  },
  testMatch: [
    '**/__tests__/**/*.test.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json',
      useESM: false
    }],
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(wouter|@tanstack|react-query)/)'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'client/src/**/*.{ts,tsx}',
    'server/**/*.ts',
    '!**/*.d.ts',
    '!**/node_modules/**'
  ]
};

export default config; 