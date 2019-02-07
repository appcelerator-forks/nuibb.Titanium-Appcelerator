function horseDetails(_title, _navigation, windowStack, onCreate) {
	var isAndroid = Ti.Platform.osname === 'android';
	//Creating window object
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

	//Back to the previous window while click on the back button of upper toolbar
	function closeWindow() {
		win.close();
	}

	//Upper toolbar's views
	var upperToolView = require('ui/upperToolbar/excluding_right_btn');
	var toolView = new upperToolView(imagePath.map_focus, 'Map', _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', closeWindow);
	win.add(toolView);

	var Map = require('ti.map');

	//Rendering Json Data
	var mapview;
	function renderJson(json) {
		var annotationObject = [];
		for (var i = 0,
		    j = json.annotations.length; i < j; i++) {
			annotationObject[i] = Map.createAnnotation({
				latitude : json.annotations[i].latitude,
				longitude : json.annotations[i].longitude,
				title : json.annotations[i].title,
				subtitle : json.annotations[i].subtitle,
				pincolor : Map.ANNOTATION_BLUE,
				myid : i // Custom property to uniquely identify this annotation
			});
		}

		mapview = Map.createView({
			mapType : Map.NORMAL_TYPE,
			region : {
				latitude : json.map_center.center_latitude,
				longitude : json.map_center.center_longitude,
				latitudeDelta : 3,
				longitudeDelta : 3
			},
			animate : true,
			regionFit : false,
			userLocation : true,
			annotations : annotationObject
		});

		win.add(mapview);

	}

	//Getting exact board name
	function getBoardName(_board) {
		if (_board === 'Horseboard') {
			return 'horse';
		} else if (_board === 'Salesboard') {
			return 'sales';
		} else if (_board === 'Studboard') {
			return 'stud';
		}
	}

	//API calling
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();
	var API_Call = require('ui/apiCalling/call_without_indicator');
	new API_Call('GET', system_url.getHBMap_url(getBoardName(_title)), null, function(json) {
		renderJson(json);
	});
	
	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/only_upper_toolbar');
	new OnOrientaionChange(toolView);

	win.addEventListener('close', function(e) {
		windowStack.pop();
		onCreate();
		win = null;
	});

	return win;
}

module.exports = horseDetails;
