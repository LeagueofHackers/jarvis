var CONSTANTS = require('./CONSTANTS.js');
var Storage = require('./storage.js');
var BotActions = require('./botActions.js');
var Conversation = require('./conversation.js');

function init(controller){
	var botToken = CONSTANTS.LEAGUE_OF_HACKERS_BOT_TOKEN;
	BotActions.initBot(botToken, controller);
	
	controller.hears(["I want to have .*"], ["direct_message", "direct_mention", "mention", "ambient"], function(bot, message) {

		console.log('1   MESSAGE:'+JSON.stringify(message));
		
		item = message.text.replace(/I want to have /, '');
		Storage.addItem(item, message.channel);


		bot.startConversation(message, function(response, convo){
			Conversation.askForMore(response, convo, bot);
		});		
		
	});
	
	controller.hears([".*"], 
		["direct_message","direct_mention","mention","ambient"], 
		function(bot, message){
		console.log('2   MESSAGE:'+JSON.stringify(message));
		bot.reply(message, 'I didn\'t get that!');
	})
}

module.exports = {
	init: init
}
