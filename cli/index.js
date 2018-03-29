#!/usr/bin/env node
var commands = require('./commands/index');
var program = require('commander');

program
  .arguments('<file>');

commands.forEach(function (command) {
  command.options.forEach(function (optionArg) {
    program.option(optionArg.args, optionArg.message);
  })

  program.action(command.action);
});

program.parse(process.argv);