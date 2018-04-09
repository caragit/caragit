var actionPostToSlack = require('./postSlack');
var actionNooo = require('./nooo.js');
var actionSet = require('./set');

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
  },
  {
    name: 'Nooo',
    action: actionNooo,
    command: 'no'
  },
  {
    name: 'Set',
    action: actionSet,
    command: 'set'
  }
];

module.exports = commands;