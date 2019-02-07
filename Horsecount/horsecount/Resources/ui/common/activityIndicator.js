function Indicator(_left, _top, _message) {

	if (!_message) {
		_message = 'Loading...';
	}
	var isAndroid = Ti.Platform.osname === 'android';
	var style;
	if (isAndroid) {
		style = Ti.UI.ActivityIndicatorStyle.DARK;
	} else {
		style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
	}

	var activityIndicator = Ti.UI.createActivityIndicator({
		color : '#A0A0A0',
		font : {
			fontFamily : 'Helvetica Neue',
			fontSize : '15dp',
			fontWeight : 'bold'
		},
		message : _message,
		style : style,
		left : _left,
		top : _top,
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		zIndex : 1000
	});

	return activityIndicator;
}

module.exports = Indicator;
