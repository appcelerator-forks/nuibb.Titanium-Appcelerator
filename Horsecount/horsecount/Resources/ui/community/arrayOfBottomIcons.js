function bottomArray() {
	var isAndroid = Ti.Platform.osname === 'android';
	var btmArray = [];
	var HomeImageSize = '25dp';

	//Get Images path object
	var imagePath;
	if (isAndroid) {
		var ImagesObject = require('ui/android/imagesPath');
		imagePath = new ImagesObject();
	} else {
		var ImagesObject = require('ui/iPhone/imagesPath');
		imagePath = new ImagesObject();
	}

	//Main board icon
	var icon1 = Titanium.UI.createImageView({
		id : 1,
		focus : true,
		image : imagePath.newsfeed_focus,
		height : HomeImageSize,
		width : HomeImageSize
	});

	//My horse Icon
	var icon2 = Titanium.UI.createImageView({
		id : 2,
		focus : false,
		image : imagePath.timeline_blur,
		height : HomeImageSize,
		width : HomeImageSize
	});

	//Favourite horse Icon
	var icon3 = Titanium.UI.createImageView({
		id : 3,
		focus : false,
		image : imagePath.group_blur,
		height : HomeImageSize,
		width : HomeImageSize
	});

	//Compare horse Icon
	var icon4 = Titanium.UI.createImageView({
		id : 4,
		focus : false,
		image : imagePath.event_blur,
		height : HomeImageSize,
		width : HomeImageSize
	});

	//Map view Icon
	var icon5 = Titanium.UI.createImageView({
		id : 5,
		focus : false,
		image : imagePath.birthday_blur,
		height : HomeImageSize,
		width : HomeImageSize
	});

	btmArray.push(icon1);
	btmArray.push(icon2);
	btmArray.push(icon3);
	btmArray.push(icon4);
	btmArray.push(icon5);

	return btmArray;
}

module.exports = bottomArray;
