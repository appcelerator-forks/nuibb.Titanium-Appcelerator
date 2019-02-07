function Twitter() {
	var social = require('/ui/horseboard/tweetShare');
	var twitter = social.create({
		site : 'Twitter',
		consumerKey : 'iA7Ke84aXpXDkkbVct7AV7HwI',
		consumerSecret : 's9INv1cHcx4QbP8IpPVtdZgnKUYAxNSBPge53ohQPVLSyIUL9k'
	});

	twitter.authorize(function() {
		alert('Authorized!');
		twitter.share({
			message : 'Hello, world!',
			success : function() {
				alert('Tweeted!');
			},
			error : function(error) {
				alert('Oh no! ' + error);
			}
		});
	});
}

module.exports = Twitter;
