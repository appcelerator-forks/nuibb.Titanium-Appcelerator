function Image_Enlargement(_image, _icon, windowStack) {
	var isAndroid = Ti.Platform.osname === 'android';
	var toolview, toolviewHeight;

	var win;
	if (isAndroid) {
		var Window = require('ui/android/actionbar');
		win = new Window('', 'composite');
	} else {
		var Window = require('ui/iPhone/navbar');
		win = new Window('', 'composite');
	}

	if (isAndroid) {
		if (Titanium.Gesture.orientation == Ti.UI.PORTRAIT) {
			toolviewHeight = '7%';
		} else if (Titanium.Gesture.orientation == Ti.UI.LANDSCAPE_LEFT || Titanium.Gesture.orientation == Ti.UI.LANDSCAPE_RIGHT) {
			toolviewHeight = '10%';
		}
	}

	Ti.Gesture.addEventListener('orientationchange', function(e) {
		if (e.orientation == Ti.UI.LANDSCAPE_LEFT || e.orientation == Ti.UI.LANDSCAPE_RIGHT) {
			if (isAndroid) {
				toolview.applyProperties({
					height : '10%'
				});
			}
		} else if (e.orientation == Ti.UI.PORTRAIT) {
			if (isAndroid) {
				toolview.applyProperties({
					height : '7%'
				});
			}
		}
	});

	function closeWindow() {
		win.close();
	}

	//Upper Toolbar
	if (isAndroid) {
		var UpperToolBar = require('ui/upperToolbar/android/upperToolbar');
		toolview = new UpperToolBar('Horse Details', _icon, toolviewHeight, closeWindow);
		win.add(toolview);
	} else {
		var UpperToolBar = require('ui/upperToolbar/iPhone/upperToolbar');
		var toolbar = new UpperToolBar('Horse Details', _icon, '60dp', closeWindow);
		win.add(toolbar);
	}

	function defaulImagePath() {
		if (isAndroid) {
			return '/images/no-horse.png';
		} else {
			return 'no-horse@2x.png';
		}
	}

	var scrollView = Ti.UI.createScrollView({
		backgroundColor : '#FFF',
		height : '60%',
		width : Ti.UI.FILL,
		contentWidth : Ti.UI.SIZE,
		contentHeight : Ti.UI.SIZE,
		showHorizontalScrollIndicator : true,
		minZoomScale : 0, // your view can not zoom out smaller then 100%
		maxZoomScale : 1
	});

	var imageView = Titanium.UI.createImageView({
		image : _image,
		defaultImage : defaulImagePath(),
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE
	});

	scrollView.add(imageView);

	/*var zoomImage = Titanium.UI.createAnimation();
	 t = Ti.UI.create2DMatrix();
	 t = t.scale(1.4);
	 zoomImage.transform = t;
	 zoomImage.duration = 400;
	 imageView.animate(zoomImage);*/

	win.add(scrollView);

	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;
}

module.exports = Image_Enlargement;
