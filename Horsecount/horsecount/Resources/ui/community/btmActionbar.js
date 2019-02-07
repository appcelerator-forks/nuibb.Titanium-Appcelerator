function notifiedView(_callback) {
	var activityIndicator = Ti.UI.createActivityIndicator({
		color : '#A0A0A0',
		font : {
			fontFamily : 'Helvetica Neue',
			fontSize : '15dp',
			fontWeight : 'bold'
		},
		message : "Uploading",
		style : Ti.Platform.osname === 'android' ? Ti.UI.ActivityIndicatorStyle.DARK : Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
		right : '10dp',
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		zIndex : 1000
	});

	var _notifiedView = Ti.UI.createView({
		backgroundColor : '#C7EAFB',
		layout : 'vertical',
		bottom : '0dp',
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		zIndex : 1000
	});

	var whiteline1 = Ti.UI.createView({
		backgroundColor : '#FFF',
		top : '0dp',
		left : '10dp',
		right : '10dp',
		height : '1dp'
	});

	var whiteline2 = Ti.UI.createView({
		backgroundColor : '#FFF',
		top : '0dp',
		left : '10dp',
		right : '10dp',
		height : '1dp'
	});

	var uploadHolder = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL
	});

	var upload = Ti.UI.createLabel({
		text : 'Upload Photo',
		left : '20dp',
		height : '35dp'
	});

	upload.addEventListener('click', function() {
		// Ti.API.log("Add event listener in btmActionbar");
		_callback('upload_image', activityIndicator);
	});

	uploadHolder.add(upload);
	uploadHolder.add(activityIndicator);

	var choose = Ti.UI.createLabel({
		text : 'Choose from Photos',
		left : '20dp',
		height : '35dp'
	});

	choose.addEventListener('click', function() {
		_callback('choose_image', activityIndicator);
		_notifiedView.visible = false;
	});

	var cancel = Ti.UI.createLabel({
		text : 'Cancel',
		left : '20dp',
		height : '35dp'
	});

	cancel.addEventListener('click', function() {
		_notifiedView.visible = false;
	});

	_notifiedView.add(uploadHolder);
	_notifiedView.add(whiteline1);
	_notifiedView.add(choose);
	_notifiedView.add(whiteline2);
	_notifiedView.add(cancel);

	return _notifiedView;
}

module.exports = notifiedView;
