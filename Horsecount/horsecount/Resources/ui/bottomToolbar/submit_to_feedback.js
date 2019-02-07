function Submit_Feedback(_title, toolviewHeight, onSubmit) {
	var btnSubmit = Ti.UI.createButton({
		backgroundColor : '#C7EAFB',
		color : '#27AAE1',
		title : _title
	});

	btnSubmit.addEventListener('click', onSubmit);
	
	var btmToolview = Ti.UI.createView({
		backgroundColor : '#C7EAFB',
		tintColor : '#27AAE1',
		bottom : '0dp',
		width : Ti.UI.FILL,
		height : toolviewHeight
	});

	btmToolview.add(btnSubmit);
	
	return btmToolview;
}

module.exports = Submit_Feedback;
