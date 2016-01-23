var express = require("express");
var CONSTANTS = require('../bot/CONSTANTS.js');
var app = express();

function init(controller){
	require('./routes.js')(app, controller); // configures routes for the express app
	var server = app.listen(CONSTANTS.API_PORT_NO, function () {
	    console.log("Listening for APIs on port %s...", server.address().port);
	});	
}

module.exports = {
	init: init
}
