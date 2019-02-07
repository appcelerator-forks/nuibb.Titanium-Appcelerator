function PubnubSample() {//Credentials
	var current_user_data = Ti.App.Properties.getObject('Current_User_Data');
	/* Local:
	* "pub-c-ee2dab4d-add8-4c2b-a141-1142011fae01"
	* "sub-c-984e078e-adc3-11e3-a952-02ee2ddab7fe"
	* */

	/*Staging:
	* "pub-c-994063c2-048b-41d4-bac3-58b803ba66fc"
	* "sub-c-fd77e100-9ee7-11e4-8d94-0619f8945a4f"
	*/

	/*
	Tauhid's server pubnub credentials:

	pubnub_publish_key: "pub-c-d3234701-3745-403b-a58a-0cc7bc2fc7fd"
	pubnub_subscribe_key: "sub-c-83043b4c-75ef-11e4-82cc-02ee2ddab7fe"
	*/

	// ----------------------------------
	// INIT PUBNUB
	// ----------------------------------
	var PUBNUB = require('ui/pubnub/pubnub');
	var PUBNUB_CLIENT = PUBNUB({
		publish_key : "pub-c-994063c2-048b-41d4-bac3-58b803ba66fc", //"pub-c-ee2dab4d-add8-4c2b-a141-1142011fae01",//
		subscribe_key : "sub-c-fd77e100-9ee7-11e4-8d94-0619f8945a4f", //"sub-c-984e078e-adc3-11e3-a952-02ee2ddab7fe",//
		ssl : false,
		origin : 'pubsub.pubnub.com'
	});

	PUBNUB_CLIENT.subscribe({
		channel : ['public', current_user_data.channel_name],
		callback : function(message) {
			//Ti.API.info(message);
			Ti.App.fireEvent(message.event, message);
		}
	});
}

module.exports = PubnubSample;
