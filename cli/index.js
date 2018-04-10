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

program.parse(process.argv);