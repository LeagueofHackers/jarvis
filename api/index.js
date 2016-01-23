var express = require("express");
var CONSTANTS = require('../bot/CONSTANTS.js');
var app = express();

require('./routes.js')(app); // configures routes for the express app

function init(){
	var server = app.listen(CONSTANTS.API_PORT_NO, function () {
	    console.log("Listening for APIs on port %s...", server.address().port);
	});	
}

module.exports = {
	init: init
}
