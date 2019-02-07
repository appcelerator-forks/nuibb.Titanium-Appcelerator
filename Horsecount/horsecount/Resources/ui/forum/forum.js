function Community(_title, _navigation, windowStack) {
	var isAndroid = Ti.Platform.osname === 'android';
	var toolview;

	var win;
	if (isAndroid) {
		var Window = require('ui/android/actionbar');
		win = new Window('', 'vertical');
	} else {
		var Window = require('ui/iPhone/navbar');
		win = new Window('', 'vertical');
	}

	//Dimension object
	var Dimentions = require('dimension/withoutBtmToolbar');
	var _dimentions = new Dimentions();

	//Get Images path object
	var imagePath;
	if (isAndroid) {
		var ImagesObject = require('ui/android/imagesPath');
		imagePath = new ImagesObject();
	} else {
		var ImagesObject = require('ui/iPhone/imagesPath');
		imagePath = new ImagesObject();
	}

	//close window on back button click
	function closeWindow() {
		win.close();
	}

	//Upper toolbar's views
	var upperToolView = require('ui/upperToolbar/excluding_right_btn');
	var toolView = new upperToolView(imagePath.forum, _title, _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', closeWindow);
	win.add(toolView);

	//webview
	var webView = Ti.UI.createWebView({
		url : "http://staging.horsecount.com:81/forum/ucp.php?mode=login&login=external&oauth_service=horsecount&reset_session=true",
		enableZoomControls : true,
		scalesPageToFit : true,
		scrollsToTop : true,
		showScrollbars : true,
		left : '5dp',
		right : '5dp',
		top : '1%',
		bottom : '1%',
		borderRadius : 5
	});

	win.add(webView);

	return win;
}

module.exports = Community;
