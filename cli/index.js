var program = require('commander');
var config = require('./config');
var Slack = require('node-slack-upload');
var ProgressBar = require('progress');
var fs = require('fs');
var slack = new Slack(config.token);

program
  .arguments('<file>')
  .option('-t --target <target>', 'target to post message to (channel, user)')
  .option('-c --comment <comment>', 'comment for the file post')
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

program.parse(process.argv);
