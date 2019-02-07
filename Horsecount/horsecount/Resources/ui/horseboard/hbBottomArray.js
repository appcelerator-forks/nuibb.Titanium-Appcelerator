function bottomArray(_title) {
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
	//Getting window icon dynamically
	function getWindowIcon() {
		if (_title === 'Horseboard') {
			return imagePath.board_horse_focus;
		} else if (_title === 'Salesboard') {
			return imagePath.board_sales_focus;
		} else if (_title === 'Studboard') {
			return imagePath.board_stud_focus;
		}
	}

	//Main board icon
	var icon1 = Titanium.UI.createImageView({
		//backgroundColor:'red',
		image : getWindowIcon(),
		focus : true,
		filter : false,
		height : HomeImageSize,
		width : HomeImageSize
	});

	//My horse Icon
	var icon2 = Titanium.UI.createImageView({
		//backgroundColor:'red',
		image : imagePath.myHorse_blur,
		focus : false,
		height : HomeImageSize,
		width : HomeImageSize
	});

	//Favourite horse Icon
	var icon3 = Titanium.UI.createImageView({
		//backgroundColor:'red',
		image : imagePath.favourite_blur,
		focus : false,
		height : HomeImageSize,
		width : HomeImageSize
	});

	//Compare horse Icon
	var icon4 = Titanium.UI.createImageView({
		//backgroundColor:'red',
		image : imagePath.compare_blur,
		focus : false,
		height : HomeImageSize,
		width : HomeImageSize
	});

	//Map view Icon
	var icon5 = Titanium.UI.createImageView({
		//backgroundColor:'red',
		image : imagePath.map_blur,
		focus : false,
		height : HomeImageSize,
		width : HomeImageSize
	});

	//Saved search Icon
	var icon6 = Titanium.UI.createImageView({
		//backgroundColor:'red',
		image : imagePath.savedSearch_blur,
		focus : false,
		height : HomeImageSize,
		width : HomeImageSize
	});

	btmArray.push(icon1);
	btmArray.push(icon2);
	btmArray.push(icon3);
	btmArray.push(icon4);
	btmArray.push(icon5);
	btmArray.push(icon6);

	return btmArray;
}

module.exports = bottomArray;
