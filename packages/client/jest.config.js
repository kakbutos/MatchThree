import dotenv from 'dotenv';
dotenv.config();

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.svg': '<rootDir>/__mocks__/jestEmptyComponent.tsx',
    '\\.png': '<rootDir>/__mocks__/jestEmptyComponent.tsx',
    '\\.mp3': '<rootDir>/__mocks__/jestEmptyComponent.tsx',
    '@/(.*)': '<rootDir>/src/$1',
  },
};
