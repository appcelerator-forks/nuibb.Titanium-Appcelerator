function bottomArray(_url) {
	var isAndroid = Ti.Platform.osname === 'android';
	var btmArray = [];
	var HomeImageSize = '25dp';

	var iconsPath = [];
	if (isAndroid) {
		iconsPath.push("/images/hbFacebook.png");
		iconsPath.push("/images/hbTwitter.png");
		iconsPath.push("/images/hbMail.png");
	} else {
		iconsPath.push("hbFacebook@2x.png");
		iconsPath.push("hbTwitter@2x.png");
		iconsPath.push("hbMail@2x.png");
	}

	var icon1 = Titanium.UI.createImageView({
		//backgroundColor:'red',
		image : iconsPath[0],
		height : HomeImageSize,
		width : HomeImageSize
	});

	var icon2 = Titanium.UI.createImageView({
		//backgroundColor:'red',
		image : iconsPath[1],
		height : HomeImageSize,
		width : HomeImageSize
	});

	var icon3 = Titanium.UI.createImageView({
		//backgroundColor:'red',
		image : iconsPath[2],
		height : HomeImageSize,
		width : HomeImageSize
	});

	var icon4 = Titanium.UI.createImageView({
		//backgroundColor:'red',
		image : '',
		height : HomeImageSize,
		width : HomeImageSize
	});

	var icon5 = Titanium.UI.createImageView({
		//backgroundColor:'red',
		image : '',
		height : HomeImageSize,
		width : HomeImageSize
	});

	btmArray.push(icon1);
	btmArray.push(icon2);
	btmArray.push(icon3);
	btmArray.push(icon4);
	btmArray.push(icon5);

	function checkIcons(json) {
		icon4.id = json.compare_horse_id;
		icon5.id = json.favorite_horse_id;
		if (json.compare_horse_id) {
			if (isAndroid) {
				icon4.image = "/images/hbUndoFavorite.png";
			} else {
				icon4.image = "hbUndoFavorite@2x.png";
			}
		} else {
			if (isAndroid) {
				icon4.image = "/images/hbCompare.png";
			} else {
				icon4.image = "hbCompare@2x.png";
			}
		}

		if (json.favorite_horse_id) {
			if (isAndroid) {
				icon5.image = "/images/hbUndoFavorite.png";
			} else {
				icon5.image = "hbUndoFavorite@2x.png";
			}
		} else {
			if (isAndroid) {
				icon5.image = "/images/hbFavorite.png";
			} else {
				icon5.image = "hbFavorite@2x.png";
			}
		}
	}

	var Get_Icons = require('ui/apiCalling/call_without_indicator');
	var _icons = new Get_Icons('GET', _url, null, function(json) {
		checkIcons(json);
	});

	return btmArray;
}

module.exports = bottomArray;
