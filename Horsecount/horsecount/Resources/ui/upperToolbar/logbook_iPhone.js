function upperToolBar(_tabBar, closeWindow) {
	//Upper Toolbar
	var imageHolder = Titanium.UI.createView({
		height : '30dp',
		width : '40dp'
	});

	var navArrow = Titanium.UI.createImageView({
		image : "arrow@2x.png",
		height : '25dp',
		width : '25dp',
		left : '0dp'
	});

	imageHolder.add(navArrow);
	
	imageHolder.addEventListener('touchend', function(e) {
		closeWindow();
	});

	var icon = Titanium.UI.createImageView({
		image : "logbook@2x.png",
		height : '27dp',
		width : '27dp'
	});

	var flexSpace = Ti.UI.createButton({
		systemButton : Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});

	var toolbar = Titanium.UI.iOS.createToolbar({
		top : '0dp',
		items : [imageHolder, flexSpace, icon, _tabBar, flexSpace],
		animated : true,
		translucent : true,
		barColor : '#C7EAFB',
		tintColor : '#27AAE1'
	});

	return toolbar;
}

module.exports = upperToolBar;