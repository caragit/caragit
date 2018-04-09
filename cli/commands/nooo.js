var path = require('path');

function nooo () {
    var player = require('play-sound')(opts = {});

    player.play(path.resolve(__dirname, 'nooo.mp3'), function(err){
    if (err) throw err
  });
}

module.exports = nooo;