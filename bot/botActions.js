var CONSTANTS = require('./CONSTANTS.js');
var request = require("request");

function initBot(botAccessToken, controller){
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
function getBotToken (code, controller) {
	console.log("	In getBotToken, code:" + code);
	console.log("	In getBotToken, controller:" + controller);
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
	  initBot(botAccessToken, controller);
	});
}

module.exports = {
	initBot: initBot
}
