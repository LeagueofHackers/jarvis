var Botkit = require('botkit');
var controller = Botkit.slackbot();
var bot = require('./bot/index.js');
var api = require('./api/index.js');

api.init(controller);
bot.init(controller);
