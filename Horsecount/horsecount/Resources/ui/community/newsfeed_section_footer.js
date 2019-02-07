
module.exports = function getSection(_id, _is_liked, likeBtnClicked, report_callback, _comment_new_callback) {

	var isAndroid = Ti.Platform.osname === 'android';
	//Get Images path object
	var imagePath;
	if (isAndroid) {
		var ImagesObject = require('ui/android/imagesPath');
		imagePath = new ImagesObject();
	} else {
		var ImagesObject = require('ui/iPhone/imagesPath');
		imagePath = new ImagesObject();
	}

	var footer_view = Ti.UI.createView({
		backgroundColor : '#C7EAFB',
		height : '35dp',
		width : Ti.UI.FILL
	});

	var iconHolder = Ti.UI.createView({
		backgroundColor : '#C7EAFB',
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL
	});

	var likeIcon = Ti.UI.createImageView({
		id : _id,
		liked : _is_liked,
		image : _is_liked ? imagePath.like_already_focus : imagePath.like_blur,
		left : '5dp',
		width : '22dp',
		height : '22dp'
	});

	likeIcon.addEventListener('touchend', function(e) {
		likeBtnClicked(e);
	});

	var reportIcon = Ti.UI.createImageView({
		image : imagePath.report_blur,
		width : '22dp',
		height : '22dp'
	});

	reportIcon.addEventListener('touchend', function(e) {
		report_callback(_id);
	});

	var commentIcon = Ti.UI.createImageView({
		image : imagePath.edit_blur,
		right : '5dp',
		width : '22dp',
		height : '22dp'
	});

	commentIcon.addEventListener('touchend', function(e) {
		_comment_new_callback(_id);
	});

	var blueBar = Ti.UI.createView({
		backgroundColor : '#36A9E1',
		bottom : '0dp',
		height : '4dp',
		width : Ti.UI.FILL
	});

	iconHolder.add(likeIcon);
	iconHolder.add(reportIcon);
	iconHolder.add(commentIcon);
	footer_view.add(iconHolder);
	footer_view.add(blueBar);

	return footer_view;
};
