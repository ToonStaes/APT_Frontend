exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec.js'],
  capabilities: {
    'browserName': 'firefox'
  },
  highlightDelay: 1000,
  directConnect: false
}