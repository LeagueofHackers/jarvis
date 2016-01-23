/*
 * Api
 */
var OAuthLogic = require('./oAuth.js');

function appRouter(app, controller) {
	console.log("	In appRouter, app:" + app);
	app.get("/", function(req, res) {
		console.log('In / route');
		

		var query = req.query,
		    resText;
		
		function sendResponse(result){
			if(!result || result.error){
				res.send("Jarvis app could not be added to your team due to error: " + result.error);
			}else{
				resText = "Jarvis app is added to your slack team " + result.team_name + "!";
				res.send(resText);
			}
		}

		if(query.error){
			resText = "Jarvis app could not be added to your team due to error: " + query.error;
			res.send(resText);
		}else{
			OAuthLogic.getBotToken(query.code, controller, sendResponse);
		}
	});
}
 
module.exports = appRouter;
 
