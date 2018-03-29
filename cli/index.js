#!/usr/bin/env node

var program = require('commander');
var Slack = require('node-slack-upload');
var ProgressBar = require('progress');
var fs = require('fs');
var path = require('path');
var rawConfig = fs.readFileSync(path.resolve(__dirname, 'config.json'));
var config = JSON.parse(rawConfig);
var slack = new Slack(config.token);

program
  .arguments('<file>')
  .option('-t --target <target>', 'target to post message to (channel, user)')
  .option('-c --comment <comment>', 'comment for the file post')
  .option('-T --token <token>', 'slack token')
  .action(function (file) {
    let defaultTarget = config.defaultTarget;
    let comment = 'Uploaded with Caragit';

    if (program.target != undefined) {
      defaultTarget = program.target;
    }
    if (program.comment != undefined) {
      comment = program.comment;
    }

    let fileSize = fs.statSync(file).size;
    let fileStream = fs.createReadStream(file);
    let barOpts = {
      width: 20,
      total: fileSize,
      clear: true
    };
    let bar = new ProgressBar('uploading [:bar] :percent :etas', barOpts);

    fileStream.on('data', function (chunk) {
      bar.tick(chunk.length);
    });

    let splitFile = file.split('.');
    let fileType = splitFile[splitFile.length - 1];

    slack.uploadFile({
      file: fileStream,
      filetype: fileType,
      title: file,
      channels: defaultTarget,
      initialComment: comment
    }, function (err, data) {
      if (err) {
        console.log(err);
      }
      else {
        console.log('Uploaded file details:', data.file.permalink);
      }
    });
  })

program.command('no').action(no);
function no() {
  var player = require('play-sound')(opts = {});

  player.play('nooo.mp3', function(err){
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
