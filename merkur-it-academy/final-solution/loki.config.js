const localRun = !!process.env.LOKI_DOCKER_CHROME || !process.env.CI;
const target = localRun ? 'chrome.app' : 'chrome.docker';

const devices = require('./.storybook/devices');
const configurations = {};

devices.forEach(
  ({ name, width, height, isTablet, isMobile }) =>
    (configurations[`chrome.${name}`] = {
      name,
      width,
      height,
      mobile: isTablet || isMobile,
      target,
    })
);

module.exports = {
  chromeSelector: '#root > *:first-child',
  diffingEngine: 'looks-same',
  configurations,
  chromeFlags:
    '--headless --disable-gpu --no-sandbox --hide-scrollbars --ignore-certificate-errors',
  verboseRenderer: true,
};
