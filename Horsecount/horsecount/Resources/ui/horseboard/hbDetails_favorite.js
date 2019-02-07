function Favorite(e, json) {
	var isAndroid = Ti.Platform.osname === 'android';
	if (json.favorite_horse_id) {
		e.source.id = json.favorite_horse_id;
		if (isAndroid) {
			e.source.image = "/images/hbUndoFavorite.png";
		} else {
			e.source.image = "hbUndoFavorite@2x.png";
		}
		alertMessage('Message!', 'The horse is successfully added to your favorite list.');
	} else {
		e.source.id = null;
		if (isAndroid) {
			e.source.image = "/images/hbFavorite.png";
		} else {
			e.source.image = "hbFavorite@2x.png";
		}
		alertMessage('Message!', 'The horse is successfully removed from your favorite list.');
	}

	function alertMessage(_title, msg) {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : _title,
			message : msg,
			buttonNames : ['OK']
		});
		alertDialog.show();
	}
}

module.exports = Favorite;
