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

program.command('no').action(no);
function no() {
  var player = require('play-sound')(opts = {});

  player.play(path.resolve(__dirname, 'nooo.mp3'), function(err){
    if (err) throw err
  });
}

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
