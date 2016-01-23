var express = require("express");
var CONSTANTS = require('../bot/CONSTANTS.js');
var app = express();
var routes = require('./routes.js')(app);
var server = app.listen(CONSTANTS.API_PORT_NO, function () {
    console.log("Listening on port %s...", server.address().port);
});
