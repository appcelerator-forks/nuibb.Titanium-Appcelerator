function Keypad(_city, windowStack, onComplete) {
	var isAndroid = Ti.Platform.osname === 'android';

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
	//Event listener for right button of upper toolbar
	function onRightBtnClick(e) {
		if (text_field.value !== '') {
			GeoLocation(text_field.value);
		} else {
			alert('Text field should not be empty!');
		}
	}

	//Back to the previous window while click on the back button of upper toolbar
	function closeWindow() {
		win.close();
	}

	//Upper toolbar's views
	var ToolBar = require('ui/upperToolbar/including_right_btn');
	var upperToolView = new ToolBar(imagePath.search_focus, 'Distance', imagePath.tick, _dimentions.toolViewHeight);
	upperToolView.children[0].addEventListener('touchend', closeWindow);
	upperToolView.children[2].addEventListener('touchend', onRightBtnClick);
	win.add(upperToolView);

	function GeoLocation(_distance) {
		var param = '';
		Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
		Titanium.Geolocation.distanceFilter = 10;
		Titanium.Geolocation.getCurrentPosition(function(e) {
			if (e.error) {
				alert('HFL cannot get your current location');
				return;
			} else {
				onComplete(e.coords.latitude, e.coords.longitude, _distance);
				win.close();
			}
		});
	}

	var text_field = Titanium.UI.createTextField({
		backgroundColor : '#FFF',
		color : '#000',
		value : '',
		top : '5%',
		left : '10dp',
		right : '10dp',
		height : isAndroid ? Ti.UI.SIZE : '25dp',
		textAlign : 'left',
		borderRadius : 5,
		keyboardType : Titanium.UI.KEYBOARD_DECIMAL_PAD,
		returnKeyType : Titanium.UI.RETURNKEY_DONE
	});

	win.addEventListener('open', function(e) {
		text_field.focus();
	});

	win.add(text_field);
	
	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/only_upper_toolbar');
	new OnOrientaionChange(upperToolView);

	win.addEventListener('close', function(e) {
		text_field.keyboardToolbar = null;
		text_field.blur();
		windowStack.pop();
		win = null;
	});

	return win;
}

module.exports = Keypad;
