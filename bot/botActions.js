var CONSTANTS = require('./CONSTANTS.js');
var request = require("request");
var Botkit = require('botkit');
var controller = Botkit.slackbot();

function initBot(botAccessToken){
	console.log("	In initBot, botAccessToken:" + botAccessToken);
	console.log("	In initBot, controller:" + JSON.stringify(controller));
	var bot = controller.spawn({
	  token: botAccessToken
	});
	bot.startRTM(function(err,bot,payload) {
	  if (err) {
		console.log('	ERR:', err);
		throw new Error('Could not connect to Slack');
	  }
	});
}

function handleNewBotToken(botAccessToken) {
	console.log("	In handleNewBotToken, botAccessToken:" + botAccessToken);
	
	// TODO: Store botAccessToken
	
	
}

module.exports = {
	initBot: initBot,
	handleNewBotToken: handleNewBotToken
}
