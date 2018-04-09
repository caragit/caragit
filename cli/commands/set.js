var program = require('commander');
var path = require('path');
var fs = require('fs');
var common = require('../common/common.js')

function set () {
  let config = common.getConfig();
  let changed = false;
  if (config != null) {
    if (program.slackToken != undefined) {
      config.slackToken = program.slackToken;
      changed = true;
    }
    if (program.target != undefined) {
      config.defaultTarget = program.target;
      changed = true;
    }

    if (changed) {
      let updated = common.updateConfig(config);
      if (updated) {
        console.log('Updated');
      } else {
        console.log('Unable to update config');
      }
    } else {
      console.log('Nothing to update');
    }
  } else {
    console.log('An unknown error occured @ getConfig();');
  }
}

module.exports = set;