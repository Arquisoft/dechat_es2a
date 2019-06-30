// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts


exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './../src/test/asw/features/*.feature'
  ],
  capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
      args: ['--headless', '--disable-gpu', '--window-size=800,600', '--no-sandbox']
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: ['./../src/test/asw/features/steps/*.ts'],
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
  }
};
