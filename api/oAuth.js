var CONSTANTS = require('../bot/CONSTANTS.js');
var BotActions = require('../bot/botActions.js');
var request = require("request");

function getBotToken (code, controller) {
	console.log("	In getBotToken, code:" + code);
	var options = {
		host: 'https://slack.com',
		path: '/api/oauth.access?client_id=' + CONSTANTS.CLIENT_ID + '&client_secret=' + CONSTANTS.CLIENT_SECRET + '&code=' + code + '&redirect_url=' + CONSTANTS.REDIRECT_URI,
		method: 'GET'
	},
	uri = options.host + options.path;
	console.log("	In getBotToken, REQUEST:"+JSON.stringify(options));
	request({
		uri: uri,
		method: options.method
	}, function(error, response, body) {
		console.log("	In getBotToken, BODY:"+body);

		// TODO: handle error case: 
		// BODY:{"ok":false,"error":"invalid_code"}	  
		// BODY:{"ok":false,"error":"code_already_used"}

		body = JSON.parse(body);

		console.log("	In getBotToken, BODY:" + JSON.stringify(body));

		if(body.ok){
			var botAccessToken = bot.bot_access_token
			BotActions.handleNewBotToken(botAccessToken, controller);		
		}
	});
}

module.exports = {
	getBotToken: getBotToken
}
