function Navbar(_title, _layout) {
	var homeImage;
	if(_title !== 'main'){
		homeImage = "Home@2x.png";
	} else {
		homeImage = "Home_Main@2x.png";
	}
	var leftNavImage = Ti.UI.createImageView({
		image : Ti.Filesystem.resourcesDirectory + "TitleHorse@2x.png",
		width : '70dp',
		height : '25dp'
	});

	var rightNavImage = Ti.UI.createImageView({
		image : Ti.Filesystem.resourcesDirectory + "Logout@2x.png",
		width : '20dp',
		height : '20dp'
	});

	var imageHome = Titanium.UI.createImageView({
		image : Ti.Filesystem.resourcesDirectory + homeImage,
		height : '20dp',
		width : '20dp'
	});

	imageHome.addEventListener('touchstart', function(e) {
		Ti.App.fireEvent('BackToMain');
	});

	rightNavImage.addEventListener('touchstart', function(e) {
		Ti.App.Properties.removeProperty('Token');
		Ti.App.fireEvent('backtoRoot');
	});

	var win = Ti.UI.createWindow({
		backgroundColor : '#36A9E1',
		barColor:'#000',
		layout : _layout,
		leftNavButton : leftNavImage,
		rightNavButton : rightNavImage,
		titleControl : imageHome,
		statusBarStyle : Titanium.UI.iPhone.StatusBar.DEFAULT
	});

	win.orientationModes = [Titanium.UI.PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];

	return win;
}

module.exports = Navbar;
