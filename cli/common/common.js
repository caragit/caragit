var process = require('process');
var fsExtra = require('fs-extra');
var os = require('os');

var winPath = process.env.APPDATA + '/Caragit/config.json';
var macOSPath = os + './caragit/config.json';

const emptyConfig = { 
  slackToken: '',
  defaultTarget: ''
};

function getConfig () {
  switch (process.platform) {
    case 'win32':
      fsExtra.ensureFileSync(winPath);
      return fsExtra.readJsonSync(winPath, function (err) {
        if (err) throw err;
      });
    case 'darwin':
      fsExtra.ensureFileSync(macOSPath);
      return fsExtra.readJsonSync(macOSPath, function (err) {
        if (err) throw err;
      });
    default:
      console.log('platform not supported');
      break;
  }
}

function updateConfig (config) {
  switch (process.platform) {
    case 'win32':
      fsExtra.ensureFileSync(winPath);
      fsExtra.writeJsonSync(winPath, config);
      return true;
    case 'darwin':
      fsExtra.ensureFileSync(macOSPath);
      fsExtra.writeJsonSync(macOSPath, config);
      return true;
    default:
      console.log('platform not supported');
      return false;
  }
}

module.exports = { getConfig, updateConfig }