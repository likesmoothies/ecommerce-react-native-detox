/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  rootDir: '..',
  testMatch: ['<rootDir>/e2e/test/**/*.test.js'],
  testTimeout: 60000,
  maxWorkers: 1,
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  reporters: ['detox/runners/jest/reporter',[
    'jest-html-reporters',
    {
      publicPath: './test-reports', 
      filename: 'detox-test-report.html', 
      expand: true,
      pageTitle: 'Detox Test Report',
    },
  ]],
  testEnvironment: 'detox/runners/jest/testEnvironment',
  verbose: true,
};
