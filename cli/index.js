#!/usr/bin/env node
var commands = require('./commands/index');
var program = require('commander');
var path = require('path');

program
  .arguments('<file>');

commands.forEach(function (command) {
  if (command.options != null && command.options.length > 0) {
    command.options.forEach(function (optionArg) {
      program.option(optionArg.args, optionArg.message);
    })
  }
  if (command.command != null && command.command != '') {
    program.command(command.command).action(command.action);
  } else {
    program.action(command.action);
  }
});

program
  .command('set')
  .action(function () {
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
      fs.writeFileSync(path.resolve(__dirname, 'config.json'), JSON.stringify(config));
      console.log('Updated');
    } else {
      console.log('Nothing to update');
    }
  });

program.parse(process.argv);
