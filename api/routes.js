/*
 * Api
 */
var Authorize = require('./aurthorize.js');

var appRouter = function(app, controller) {
	console.log("	In appRouter, app:" + app);
	console.log("	In appRouter, controller:" + controller);
	app.get("/", function(req, res) {
		console.log('In / route');
		var code = req.query.code;
		Authorize.getBotToken(code, controller);
	});
}
 
module.exports = appRouter;
 
