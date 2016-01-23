/*
 * Api
 */
var OAuthLogic = require('./oAuth.js');

function appRouter(app) {
	console.log("	In appRouter, app:" + app);
	app.get("/", function(req, res) {
		console.log('In / route');
		var code = req.query.code;
		//OAuthLogic.getBotToken(code);
		res.send('hello world');
	});
}
 
module.exports = appRouter;
 
