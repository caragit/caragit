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
      let exists = fsExtra.pathExistsSync(winPath);
      if (!exists) {
        fsExtra.outputJsonSync(winPath, emptyConfig);
      }
      return fsExtra.readJsonSync(winPath, function (err) {
        if (err) throw err;
      });
    case 'darwin':
      let macExists = fsExtra.ensureFileSync(macOSPath);
      if (!macExists) {
        fsExtra.outputJsonSync(macOSPath, emptyConfig);
      }
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
      fsExtra.outputJsonSync(winPath, config);
      return true;
    case 'darwin':
      fsExtra.outputJsonSync(macOSPath, config);
      return true;
    default:
      console.log('platform not supported');
      return false;
  }
}

module.exports = { getConfig, updateConfig }