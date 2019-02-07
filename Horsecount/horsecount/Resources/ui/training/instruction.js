function Instruction(_title, _id, windowStack, onComplete) {
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
		if (textArea.value === '') {
			alert('Instruction field is blank. Please write something.');
		} else {
			onComplete(textArea.value);
			win.close();
		}
	}

	//Upper Toolbar
	var ToolBar = require('ui/upperToolbar/including_right_btn');
	var toolView = new ToolBar(imagePath.train, _title, imagePath.tick, _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', onBackBtnClick);
	toolView.children[2].addEventListener('touchend', onTickMarkBtnClick);
	win.add(toolView);
	
	//Get unit from database
	function get_unit(_id) {
		var db = Titanium.Database.open('Horsecount');
		try {
			Rows = db.execute('SELECT * FROM TrainingDetails WHERE id = ?', _id);
			return Rows.fieldByName('instruction');
		} catch(e) {
			alert(e);
		} finally {
			Rows.close();
			db.close();
		}
	}

	//Window Properties
	var textArea = Ti.UI.createTextArea({
		backgroundColor : '#FFF',
		borderColor : '#000',
		borderRadius : 5,
		color : '#000',
		value : get_unit(_id),
		font : {
			fontFamily : 'Arial',
			fontSize : '13dp'
		},
		top : '2%',
		left : '5dp',
		right : '5dp',
		height : '40%',
		suppressReturn : false
	});

	if (!isAndroid) {
		var done = Ti.UI.createButton({
			style : Ti.UI.iPhone.SystemButtonStyle.DONE,
			title : 'Done'
		});

		var cancel = Ti.UI.createButton({
			systemButton : Ti.UI.iPhone.SystemButton.CANCEL
		});

		var flexSpace = Ti.UI.createButton({
			systemButton : Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});

		cancel.addEventListener('click', function(e) {
			textArea.value = '';
		});

		done.addEventListener('click', function(e) {
			textArea.blur();
		});

		textArea.keyboardToolbar = [cancel, flexSpace, done];
		textArea.keyboardToolbarColor = '#999';
	}

	win.add(textArea);
	
	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/only_upper_toolbar');
	new OnOrientaionChange(toolView);

	//Event listener when window is close down
	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;
};

module.exports = Instruction;
