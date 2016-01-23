var Botkit = require('botkit');
var express = require("express");
var app = express();
var CONSTANTS = require('./CONSTANTS.js');
var controller = Botkit.slackbot();
var Authorize = require('./aurthorize.js');


function init(){
	var botToken = CONSTANTS.LEAGUE_OF_HACKERS_BOT_TOKEN;
	Authorize.initBot(botToken, controller);
	
	controller.hears(["I want to have .*"], ["direct_message", "direct_mention", "mention", "ambient"], function(bot, message) {

		console.log('1   MESSAGE:'+JSON.stringify(message));
		
		item = message.text.replace(/I want to have /, '');
		Storage.addItem(item, message.channel);


		bot.startConversation(message, function(response, convo){
			Utility.askForMore(response, convo, bot);
		});		
		
	});
	
	controller.hears([".*"], 
		["direct_message","direct_mention","mention","ambient"], 
		function(bot, message){
		console.log('2   MESSAGE:'+JSON.stringify(message));
		bot.reply(message, 'I didn\'t get that!');
	})
}

try{
	init();
}catch(e){console.log(e);}


var Storage = (function(){
	var localStorage = {};
	function addItem(item, channelId){
		console.log('	In addItem');
		console.log('	ITEM' + item);
		console.log('	CHANNELID' + channelId);
		
		getItems(channelId, function(items){
			items.push(item);
			localStorage[channelId].items = items;
		});
		return;
		
		prev_items = controller.storage.channels.get(channelId, function(err, channel_data){
			console.log('	CHANNEL DATA:' + JSON.stringify(channel_data));
			console.log('	ERROR:' + JSON.stringify(err));
			var items = channel_data && channel_data.items ? channel_data.items : [];
			items.push(item);
			controller.storage.channels.save({id: channelId, items: items})
		});
	}
	function clearItems(channelId, callback){
		console.log('	In clearItems, CHANNEL ID:' + channelId);
		localStorage[channelId] = localStorage[channelId] || {};

		localStorage[channelId].items = [];
		callback && callback();
		return;
		
		controller.storage.channels.save({id: channelId, items: []}, function(err, id) {
            console.log('	ERROR:' + JSON.stringify(err));
			console.log('	ID:' + JSON.stringify(id));
			callback && callback();
        });
	}
	function getItems(channelId, callback){
		console.log('	In getItems, CHANNEL ID:' + channelId);
		localStorage[channelId] = localStorage[channelId] || {};

		var items = localStorage[channelId].items ? localStorage[channelId].items : [];
		callback && callback(items);
		return;

		controller.storage.channels.get(channelId, function(err, channel_data){
			console.log('	CHANNEL DATA:' + JSON.stringify(channel_data));
			console.log('	ERROR:' + JSON.stringify(err));
			var items = channel_data && channel_data.items ? channel_data.items : [];
			console.log("	getItems, returned items:" + JSON.stringify(items));
			callback && callback(items);
		});
	}
	return {
		addItem: addItem,
		clearItems: clearItems,
		getItems: getItems
	};
})();

var Utility = (function(){
	function log(msg){
		console.log('	LOG:' + msg);
	}
	function getConfirmationMessage(items){
		console.log('	In getConfirmationMessage, ITEMS:' + JSON.stringify(items));
		var confirmationMsg = 'Your final order will be \n';
		for(var index=0; index<items.length; index++){
			console.log('	In getConfirmationMessage, ITEMS['+index+']:' + JSON.stringify(items[index]));
			confirmationMsg = (confirmationMsg + '\t' + items[index] + '\n');
		}
		confirmationMsg = (confirmationMsg + ' These could be delivered by 8PM.');
		console.log('	In getConfirmationMessage, CONFIRM MSG:' + confirmationMsg);
		return confirmationMsg;
	}
	function askForMoreAffirmation(response, convo) {
		convo.say('Sure, what would you like to have?');
		convo.next();
	}
	function askForMore(response, convo, bot) {
		convo.ask('Anything else?',[
		{
			pattern: bot.utterances.yes,
			callback: askForMoreAffirmation
		}, {
			pattern: bot.utterances.no,
			callback: function(response, convo){askConfirmation(response, convo, bot);}
		}, {
			default: true,
			callback: function(response, convo){
				convo.repeat();
				convo.next();
			}
		}
		]);
	};
	function askConfirmation(response, convo, bot) {
		console.log("	RESPONSE" + JSON.stringify(response));
		Storage.getItems(response.channel, function(items){
			console.log('	In askConfirmation ' + JSON.stringify(items));
			var confirmationMsg = getConfirmationMessage(items);
			convo.say(confirmationMsg);
			convo.ask('Confirm?', [{
				pattern: bot.utterances.yes,
				default: true,
				callback: askDone
			}, {
				pattern: bot.utterances.no,
				callback: askGoodBye
			}]);
			convo.next();
			Storage.clearItems(response.channel);
		});
	}
	function askDone(response, convo) {
		convo.say('Done');
		convo.next();
	}
	function askGoodBye(response, convo) {
		convo.say('Goodbye!');
		convo.next();
		setTimeout(function() {
			process.exit();
		},3000);
	}
	return {
		log: log,
		askForMore: askForMore
	};
})();
