function getConfirmationMessage(items){
	console.log('	In getConfirmationMessage, ITEMS:' + JSON.stringify(items));
	var confirmationMsg = 'Your final order will be \n';
	for(var index=0; index<items.length; index++){
		console.log('	In getConfirmationMessage, ITEMS['+index+']:' + JSON.stringify(items[index]));
		confirmationMsg = (confirmationMsg + '\t' + items[index] + '\n');
	}
	confirmationMsg = (confirmationMsg + ' These could be delivered by 8PM.');
	console.log('	In getConfirmationMessage, CONFIRM MSG:' + confirmationMsg);
	return confirmationMsg;
}
function askForMoreAffirmation(response, convo) {
	convo.say('Sure, what would you like to have?');
	convo.next();
}
function askForMore(response, convo, bot) {
	convo.ask('Anything else?',[
	{
		pattern: bot.utterances.yes,
		callback: askForMoreAffirmation
	}, {
		pattern: bot.utterances.no,
		callback: function(response, convo){askConfirmation(response, convo, bot);}
	}, {
		default: true,
		callback: function(response, convo){
			convo.repeat();
			convo.next();
		}
	}
	]);
};
function askConfirmation(response, convo, bot) {
	console.log("	RESPONSE" + JSON.stringify(response));
	Storage.getItems(response.channel, function(items){
		console.log('	In askConfirmation ' + JSON.stringify(items));
		var confirmationMsg = getConfirmationMessage(items);
		convo.say(confirmationMsg);
		convo.ask('Confirm?', [{
			pattern: bot.utterances.yes,
			default: true,
			callback: askDone
		}, {
			pattern: bot.utterances.no,
			callback: askGoodBye
		}]);
		convo.next();
		Storage.clearItems(response.channel);
	});
}
function askDone(response, convo) {
	convo.say('Done');
	convo.next();
}
function askGoodBye(response, convo) {
	convo.say('Goodbye!');
	convo.next();
	setTimeout(function() {
		process.exit();
	},3000);
}
module.exports = {
	askForMore: askForMore
}

