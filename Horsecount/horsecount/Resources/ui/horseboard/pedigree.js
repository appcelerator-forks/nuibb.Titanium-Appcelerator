function horseBoard(_title, _id, _navigation, windowStack) {
	var isAndroid = Ti.Platform.osname === 'android';
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();

	var win;
	if (isAndroid) {
		var Window = require('ui/android/actionbar');
		win = new Window('', 'vertical');
	} else {
		var Window = require('ui/iPhone/navbar');
		win = new Window('', 'vertical');
	}

	//Dimension object
	var Dimentions = require('dimension/withBtmToolbar');
	var _dimentions = new Dimentions();

	//Selecting board's main focused image
	function selectBoardImage(_board) {
		if (_board === 'Horseboard') {
			if (isAndroid) {
				return "/images/hbMainFocus.png";
			} else {
				return "hbMainFocus@2x.png";
			}
		} else if (_board === 'Salesboard') {
			if (isAndroid) {
				return "/images/sbMainFocus.png";
			} else {
				return "sbMainFocus@2x.png";
			}
		}
	}

	function closeWindow() {
		win.close();
	}

	//Upper toolbar's views
	var upperToolView = require('ui/upperToolbar/excluding_right_btn');
	var toolView = new upperToolView(selectBoardImage(_title), "Pedigree", _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', closeWindow);
	win.add(toolView);

	var webView = Ti.UI.createWebView({
		enableZoomControls : true,
		scalesPageToFit : true,
		scrollsToTop : true,
		showScrollbars : true,
		top : '1%',
		bottom : '1%',
		left : '5dp',
		right : '5dp',
		borderRadius : 5

	});

	win.add(webView);

	if (isAndroid) {
		var API_Call = require('ui/apiCalling/call_without_indicator');
		new API_Call('GET', system_url.getPedigree_android_url(_id), null, function(json) {
			var _urlPdf = 'http://docs.google.com/viewer?embedded=true&url=' + system_url.getPdf_url() + json.pdf_name;
			// Ti.API.log(_urlPdf);
			webView.setUrl(_urlPdf);
		});
	} else {
		var _urlPdf = system_url.getPedigree_iPhone_url(_id);
		webView.setUrl(_urlPdf);
	}

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/only_upper_toolbar');
	new OnOrientaionChange(toolView);

	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;
}

module.exports = horseBoard;
