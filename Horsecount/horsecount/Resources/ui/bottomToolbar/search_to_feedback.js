function Submit_Feedback(_layout, toolviewHeight, onSubmit) {
	var isAndroid = Ti.Platform.osname === 'android';

	var btnSearch = Titanium.UI.createImageView({
		image : isAndroid ? "/images/Search.png" : "Search@2x.png",
		height : '20dp',
		width : '20dp'
	});

	btnSearch.addEventListener('click', onSubmit);

	var btmToolview = Ti.UI.createView({
		backgroundColor : '#C7EAFB',
		tintColor : '#27AAE1',
		width : Ti.UI.FILL,
		height : toolviewHeight
	});

	_layout === 'vertical' ? btmToolview.setTop('1%') : btmToolview.setBottom('0dp');

	btmToolview.add(btnSearch);

	return btmToolview;
}

module.exports = Submit_Feedback;
