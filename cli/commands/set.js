var program = require('commander');
var path = require('path');
var fs = require('fs');
var rawConfig = fs.readFileSync(path.resolve(__dirname, '../config.json'));
var config = JSON.parse(rawConfig);


function set () {
    let changed = false;
    if (program.token != undefined) {
      config.token = program.token;
      changed = true;
    }
    if (program.target != undefined) {
      config.defaultTarget = program.target;
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(path.resolve(__dirname, '../config.json'), JSON.stringify(config));
      console.log('Updated');
    } else {
      console.log('Nothing to update');
    }
}

module.exports = set;