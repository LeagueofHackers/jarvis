var Botkit = require('botkit');
var controller = Botkit.slackbot();

function initBot(botAccessToken){
	console.log("	In initBot, botAccessToken:" + botAccessToken);
	console.log("	In initBot, controller:" + controller);
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

module.exports = {
	initBot: initBot
}
