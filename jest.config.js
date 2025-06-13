module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  testMatch: [
    '**/business-logic/**/*.{test,spec}.{js,jsx,ts,tsx}',
    '**/integration/**/*.{test,spec}.{js,jsx,ts,tsx}',
    '**/user-interactions/**/*.{test,spec}.{js,jsx,ts,tsx}',
    '**/edge-cases/**/*.{test,spec}.{js,jsx,ts,tsx}',
    '**/contracts/**/*.{test,spec}.{js,jsx,ts,tsx}',
    '**/__tests__/**/*.{test,spec}.{js,jsx,ts,tsx}',
  ],
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['babel-preset-expo'] }]
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
  ]
};