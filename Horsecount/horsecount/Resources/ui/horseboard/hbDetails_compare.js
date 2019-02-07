function Compare(e, json) {
	var isAndroid = Ti.Platform.osname === 'android';
	if (json.compare_horse_id) {
		e.source.id = json.compare_horse_id;
		if (isAndroid) {
			e.source.image = "/images/hbUndoFavorite.png";
		} else {
			e.source.image = "hbUndoFavorite@2x.png";
		}
		alertMessage('Message!', json.message);
	} else {
		e.source.id = null;
		if (isAndroid) {
			e.source.image = "/images/hbCompare.png";
		} else {
			e.source.image = "hbCompare@2x.png";
		}
		alertMessage('Message!', json.message);
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

module.exports = Compare;
