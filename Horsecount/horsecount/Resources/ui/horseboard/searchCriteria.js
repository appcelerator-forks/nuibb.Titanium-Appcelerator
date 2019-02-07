function Search_Criteria(_title, windowStack, _navigation, onCreate) {
	var isAndroid = Ti.Platform.osname === 'android';
	var currencies;

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
		var num1 = parseInt(textbox1.value);
		var num2 = parseInt(textbox2.value);
		if (num1 >= 0 && num2 > 0) {
			if (num1 >= num2) {
				alert('Min value can not be greater or equal to Max!');
			} else {
				if (_title === 'Find by Age' || _title === 'Find by Size') {
					onCreate(unit.text, [num1, num2]);
					win.close();
				} else if (_title === 'Find by Sales Price' || _title === 'Find by Stud Fee') {
					if (currencies) {
						onCreate(currencies, [num1, num2]);
						win.close();
					} else {
						alert('Please Select Currency(s)!');
					}
				}
			}
		} else {
			alert('Text fields contain invalid numbers!');
		}
	}

	//Back to the previous window while click on the back button of upper toolbar
	function closeWindow() {
		win.close();
	}

	//Upper toolbar's views
	var ToolBar = require('ui/upperToolbar/including_right_btn');
	var upperToolView = new ToolBar(imagePath.search_focus, _title, imagePath.tick, _dimentions.toolViewHeight);
	upperToolView.children[0].addEventListener('touchend', closeWindow);
	upperToolView.children[2].addEventListener('touchend', onRightBtnClick);
	win.add(upperToolView);

	//Scroll View for Edit/View Tab bar
	var _holder = Ti.UI.createScrollView({
		layout : 'vertical',
		top : '2%',
		contentWidth : Ti.UI.SIZE,
		contentHeight : Ti.UI.SIZE,
		showVerticalScrollIndicator : true,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});

	var textbox1 = Titanium.UI.createTextField({
		backgroundColor : '#FFF',
		color : '#000',
		hintText : 'Set minimum value',
		top : '0dp',
		left : '10dp',
		right : '10dp',
		height : isAndroid ? Ti.UI.SIZE : '25dp',
		borderRadius : 5,
		keyboardType : Titanium.UI.KEYBOARD_DECIMAL_PAD,
		returnKeyType : Titanium.UI.RETURNKEY_DONE
	});

	var textbox2 = Titanium.UI.createTextField({
		backgroundColor : '#FFF',
		color : '#000',
		hintText : 'Set maximum value',
		top : '4dp',
		left : '10dp',
		right : '10dp',
		height : isAndroid ? Ti.UI.SIZE : '25dp',
		borderRadius : 5,
		keyboardType : Titanium.UI.KEYBOARD_DECIMAL_PAD,
		returnKeyType : Titanium.UI.RETURNKEY_DONE
	});

	var textbox3 = Ti.UI.createLabel({
		backgroundColor : '#FFF',
		color : '#000',
		text : 'Select Currencies',
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : '14dp'
		},
		top : '5dp',
		left : '10dp',
		right : '10dp',
		height : isAndroid ? Ti.UI.SIZE : '25dp',
		borderRadius : 5
	});

	textbox3.addEventListener('touchstart', function(e) {
		var LoadData = require('ui/horseboard/hb_Refine_Search');
		var dataToLoad = new LoadData('Select Currencies', null, windowStack, function(_breedlist) {
			var list = '';
			var _length = _breedlist.length;
			for (var i = 0; i < _length; i++) {
				if (i == _length - 1) {
					list = list + _breedlist[i];
				} else {
					list = list + _breedlist[i] + ';';
				}
			}
			e.source.text = list;
			currencies = _breedlist;
		}, null);

		windowStack.push(dataToLoad);

		if (isAndroid) {
			dataToLoad.open();
		} else {
			_navigation.openWindow(dataToLoad);
		}
	});

	var unit = Ti.UI.createLabel({
		color : '#FFF',
		text : '',
		//top : '5dp',
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : '14dp'
		}
	});

	//Get Unit for different filter
	if (_title === 'Find by Age') {
		unit.text = 'year';
		_holder.add(textbox1);
		_holder.add(unit);
		_holder.add(textbox2);
	} else if (_title === 'Find by Size') {
		getSizeUnit();
		_holder.add(textbox1);
		_holder.add(unit);
		_holder.add(textbox2);
	} else if (_title === 'Find by Sales Price') {
		_holder.add(textbox1);
		_holder.add(textbox2);
		_holder.add(textbox3);
	} else if (_title === 'Find by Stud Fee') {
		_holder.add(textbox1);
		_holder.add(textbox2);
		_holder.add(textbox3);
	}

	win.add(_holder);

	function httpSuccess(json) {
		unit.text = json.size_unit;
	}

	function getSizeUnit() {
		var SystemUrl = require('ui/handheld/system_urls');
		var system_url = new SystemUrl();
		var _url = system_url.getBoardsUnit_url();
		var API_Call = require('ui/apiCalling/call_without_indicator');
		new API_Call('GET', _url, null, function(json) {
			httpSuccess(json);
		});
	}

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/only_upper_toolbar');
	new OnOrientaionChange(upperToolView);

	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;
}

module.exports = Search_Criteria;
