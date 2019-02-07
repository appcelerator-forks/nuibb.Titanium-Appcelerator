function Indicator() {

	var activityIndicator = Ti.UI.createActivityIndicator({
		color : '#A0A0A0',
		font : {
			fontFamily : 'Helvetica Neue',
			fontSize : '15dp',
			fontWeight : 'bold'
		},
		message : 'Loading...',
		style : Titanium.UI.ActivityIndicatorStyle.DARK,
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		zIndex : 1000
	});

	return activityIndicator;
}

module.exports = Indicator;
