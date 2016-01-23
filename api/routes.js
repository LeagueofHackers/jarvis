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
		
		if(query.error){
			resText = "Jarvis app could not be added to your team due to error: " + query.error;
		}else{
			OAuthLogic.getBotToken(query.code, controller);
			resText = 'Jarvis app is added to your slack team!';
		}
		res.send(resText);
	});
}
 
module.exports = appRouter;
 
