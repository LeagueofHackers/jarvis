var Botkit = require('botkit');
var controller = Botkit.slackbot();
var localStorage = {};

function addItem(item, channelId){
	console.log('	In addItem');
	console.log('	ITEM' + item);
	console.log('	CHANNELID' + channelId);
	
	getItems(channelId, function(items){
		items.push(item);
		localStorage[channelId].items = items;
	});
	return;
	
	prev_items = controller.storage.channels.get(channelId, function(err, channel_data){
		console.log('	CHANNEL DATA:' + JSON.stringify(channel_data));
		console.log('	ERROR:' + JSON.stringify(err));
		var items = channel_data && channel_data.items ? channel_data.items : [];
		items.push(item);
		controller.storage.channels.save({id: channelId, items: items})
	});
}
function clearItems(channelId, callback){
	console.log('	In clearItems, CHANNEL ID:' + channelId);
	localStorage[channelId] = localStorage[channelId] || {};

	localStorage[channelId].items = [];
	callback && callback();
	return;
	
	controller.storage.channels.save({id: channelId, items: []}, function(err, id) {
    console.log('	ERROR:' + JSON.stringify(err));
		console.log('	ID:' + JSON.stringify(id));
		callback && callback();
});
}
function getItems(channelId, callback){
	console.log('	In getItems, CHANNEL ID:' + channelId);
	localStorage[channelId] = localStorage[channelId] || {};

	var items = localStorage[channelId].items ? localStorage[channelId].items : [];
	callback && callback(items);
	return;

	controller.storage.channels.get(channelId, function(err, channel_data){
		console.log('	CHANNEL DATA:' + JSON.stringify(channel_data));
		console.log('	ERROR:' + JSON.stringify(err));
		var items = channel_data && channel_data.items ? channel_data.items : [];
		console.log("	getItems, returned items:" + JSON.stringify(items));
		callback && callback(items);
	});
}

module.exports = {
	addItem: addItem,
	clearItems: clearItems,
	getItems: getItems
}

