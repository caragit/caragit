var actionPostToSlack = require('./postSlack');

const commands = [
  {
    name: 'Post to Slack',
    action: actionPostToSlack,
    options: [
      {
        args: '-t --target <target>',
        message: 'Target to post message to (channel, user)'
      },
      {
        args: '-c --comment <comment>',
        message: 'comment for the file post'
      }
    ]
  }
];

module.exports = commands;