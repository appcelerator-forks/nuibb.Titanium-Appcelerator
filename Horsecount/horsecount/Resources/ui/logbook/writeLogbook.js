function Edit_View_Filter(_title, param, windowStack, onComplete) {
	var isAndroid = Ti.Platform.osname === 'android';

	//Window Creation
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
		if (_title !== 'Write logbook item') {
			if (textArea.text !== '') {
				onComplete(textArea.text);
				win.close();
			} else {
				alert('Text field should not empty. Please select one');
			}
		} else {
			var _text = textArea.value.toString().trim().replace(/\r\n|\n|\r/gm, "");
			if (_text !== '') {
				onComplete(_text);
				win.close();
			} else {
				var alertDialog = Titanium.UI.createAlertDialog({
					title : 'Alert!',
					message : 'Text field should not empty. Please write something',
					buttonNames : ['OK']
				});
				alertDialog.show();
			}
		}
	}

	//Back to the previous window while click on the back button of upper toolbar
	function closeWindow() {
		win.close();
	}

	//Upper toolbar's views
	var ToolBar = require('ui/upperToolbar/including_right_btn');
	var upperToolView = new ToolBar(imagePath.logbook, _title, imagePath.tick, _dimentions.toolViewHeight);
	upperToolView.children[0].addEventListener('touchend', closeWindow);
	upperToolView.children[2].addEventListener('touchend', onRightBtnClick);
	win.add(upperToolView);

	//Scroll View for Edit/View Tab bar
	var scrollView = Ti.UI.createScrollView({
		layout : 'vertical',
		contentWidth : Ti.UI.SIZE,
		contentHeight : Ti.UI.SIZE,
		showVerticalScrollIndicator : true,
		top : '0dp',
		left : '5dp',
		right : '5dp',
		height : Ti.UI.SIZE
	});

	var item1 = '',
	    item2 = '',
	    item3 = '';

	if (param.horseName) {
		item1 = param.horseName;
	}

	if (param.subject) {
		item1 = item1 + '\n' + param.subject;
	}

	var str = new Date().toLocaleString();
	item2 = str.slice(0, str.indexOf("GMT"));

	if (param.author) {
		item2 = item2 + '\n' + param.author;
	}

	if (param.text && param.text !== 'Write logbook item') {
		item3 = param.text.toString().trim().replace(/\r\n|\n|\r/gm, "");
	}

	var mainView = Titanium.UI.createView({
		backgroundColor : '#fff',
		layout : 'vertical',
		borderRadius : 5,
		top : '2%',
		width : Ti.UI.FILL,
		height : '80dp'
	});

	var horseName = Ti.UI.createLabel({
		text : item1,
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : '14dp'
		},
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		left : '5dp',
		color : '#000',
		top : '5dp'
	});

	var values = Ti.UI.createLabel({
		color : '#000',
		text : item2,
		font : {
			fontFamily : 'Arial',
			fontSize : '14dp'
		},
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		left : '5dp',
		top : '0dp'
	});

	mainView.add(horseName);
	mainView.add(values);

	//Text Field
	var textArea = Ti.UI.createTextArea({
		backgroundColor : '#FFF',
		//borderColor : '#000',
		borderRadius : 5,
		color : '#000',
		value : item3,
		top : '2%',
		width : Ti.UI.FILL,
		height : isAndroid ? '40%' : '56%',
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

	//Adding other window properties
	scrollView.add(mainView);
	scrollView.add(textArea);
	win.add(scrollView);
	
	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/only_upper_toolbar');
	new OnOrientaionChange(upperToolView);

	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;
};

module.exports = Edit_View_Filter;
