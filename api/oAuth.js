var CONSTANTS = require('../bot/CONSTANTS.js');
var BotActions = require('../bot/botActions.js');
var request = require("request");

function getBotToken (code) {
	console.log("	In getBotToken, code:" + code);
	var options = {
	  host: 'https://slack.com',
	  path: '/api/oauth.access?client_id=' + CONSTANTS.CLIENT_ID + '&client_secret=' + CONSTANTS.CLIENT_SECRET + '&code=' + code + '&redirect_url=' + CONSTANTS.REDIRECT_URI,
	  method: 'GET'
	};

	request({
		uri: options.host + options.path,
		method: options.method
	}, function(error, response, body) {
	  console.log("	BODY:"+body);
	  console.log("	BODY TYPEOF:" + typeof(body));
	  
	  //TODO: handle error case: BODY:{"ok":false,"error":"code_already_used"}
	  
	  bot = JSON.parse(body).bot;
	  
	  console.log("	BOT:" + JSON.stringify(bot));
	  
	  var botAccessToken = bot.bot_access_token
	  BotActions.storeNewBotToken(botAccessToken);
	});
}

module.exports = {
	getBotToken: getBotToken
}
