module.exports = {
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
    ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css"
  },
  setupFilesAfterEnv: [
    "<rootDir>/setupTests.js"
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/']
};