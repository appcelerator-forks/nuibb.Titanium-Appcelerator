function Keypad(_title, _id, windowStack, onComplete) {
	var isAndroid = Ti.Platform.osname === 'android';
	//Get Images path object
	var imagePath;
	if (isAndroid) {
		var ImagesObject = require('ui/android/imagesPath');
		imagePath = new ImagesObject();
	} else {
		var ImagesObject = require('ui/iPhone/imagesPath');
		imagePath = new ImagesObject();
	}

	//Dimension object
	var Dimentions = require('dimension/withoutBtmToolbar');
	var _dimentions = new Dimentions();

	//Creating window object
	var win;
	if (isAndroid) {
		var Window = require('ui/android/actionbar');
		win = new Window('', 'vertical');
	} else {
		var Window = require('ui/iPhone/navbar');
		win = new Window('', 'vertical');
	}

	//Back button click event listener function
	function onBackBtnClick(e) {
		win.close();
	}

	//Tick mark button click event listener function
	function onTickMarkBtnClick(e) {
		if (text_field.value === '') {
			alert('Please Set Value.');
		} else {
			onComplete(text_field.value);
			win.close();
		}
	}

	//Upper Toolbar
	var ToolBar = require('ui/upperToolbar/including_right_btn');
	var toolView = new ToolBar(imagePath.train, _title, imagePath.tick, _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', onBackBtnClick);
	toolView.children[2].addEventListener('touchend', onTickMarkBtnClick);
	win.add(toolView);

	//Get saved data from database
	function getValue(_title) {
		var db = Titanium.Database.open('Horsecount');
		try {
			var Rows = db.execute('SELECT * FROM TrainingDetails WHERE id = ?', _id);
			if (_title === 'Workload') {
				return [Rows.fieldByName('workload'), Rows.fieldByName('workload_unit')];
			} else if (_title === 'Target Performance') {
				return [Rows.fieldByName('performance'), Rows.fieldByName('performance_unit')];
			} else if (_title === 'Heart Rate @Load') {
				return ['', '[BPM]'];
			} else if (_title === 'HR @10 min CD') {
				return ['', '[BPM]'];
			} else if (_title === 'Body Temperature') {
				return ['', '\u00B0' + 'C/' + '\u00B0' + 'F'];
			}
		} catch(e) {
			alert(e);
		} finally {
			Rows.close();
			db.close();
		}
	}
	
	var _data = getValue(_title);

	//Windows properties
	var text_field = Titanium.UI.createTextField({
		color : '#000',
		value : _data[0],
		top : '2%',
		left : '10dp',
		right : '10dp',
		height : _dimentions.toolViewHeight,
		textAlign : 'left',
		keyboardType : Titanium.UI.KEYBOARD_DECIMAL_PAD
	});

	//Applying different style border for different platform because they support differently
	if (isAndroid) {
		text_field.setBackgroundColor('#FFF');
		text_field.setBorderRadius(5);
	} else {
		text_field.setBorderStyle(Titanium.UI.INPUT_BORDERSTYLE_ROUNDED);
	}

	win.addEventListener('open', function(e) {
		text_field.focus();
	});

	win.add(text_field);

	var unitLabel = Titanium.UI.createLabel({
		color : '#FFF',
		text : _data[1],
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : '17dp'
		},
		textAlign : 'left',
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		left : '10dp',
		top : '5dp'
	});

	win.add(unitLabel);

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/only_upper_toolbar');
	new OnOrientaionChange(toolView);

	//Event listener when window is close down
	win.addEventListener('close', function(e) {
		text_field.keyboardToolbar = null;
		text_field.blur();
		windowStack.pop();
		win = null;
	});

	return win;
}

module.exports = Keypad;
