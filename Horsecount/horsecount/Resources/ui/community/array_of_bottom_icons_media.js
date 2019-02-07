function BottomArrayMedia() {
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

	//Count icon
	var icon1 = Titanium.UI.createImageView({
		image : imagePath.like_focus,
		height : HomeImageSize,
		width : HomeImageSize
	});

	//Report Icon
	var icon2 = Titanium.UI.createImageView({
		image : imagePath.report_blur,
		height : HomeImageSize,
		width : HomeImageSize
	});

	var vCounterCountParent = Ti.UI.createView({
		layout : 'horizontal',
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE
	});

	countNumber = "";
	var numberOfCount = Ti.UI.createLabel({
		color : '#36A9E1',
		right : '2dp',
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		text : countNumber
	});

	var ivCount = Ti.UI.createImageView({
		height : HomeImageSize,
		width : HomeImageSize,
		image : imagePath.like_focus
	});

	vCounterCountParent.add(numberOfCount);
	vCounterCountParent.add(ivCount);

	btmArray.push(icon1);
	btmArray.push(icon2);
	btmArray.push(vCounterCountParent);

	return btmArray;
}

module.exports = BottomArrayMedia;
