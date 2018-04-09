var process = require('process');
var fsExtra = require('fs-extra');

var winPath = process.env.APPDATA + '/Caragit/config.json';

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
      })
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
    default:
      console.log('platform not supported');
      return false;
  }
}

module.exports = { getConfig, updateConfig }