function Edit_View_Filter(_title, _id, windowStack) {
	var isAndroid = Ti.Platform.osname === 'android';
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();

	//Getting activity indicator object
	var Indicator = require('ui/common/activityIndicator');
	var activityIndicator = new Indicator('40%', '50%');

	//Dimension object
	var Dimentions = require('dimension/withBtmToolbar');
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

	//Window Creation
	var win;
	if (isAndroid) {
		var Window = require('ui/android/actionbar');
		win = new Window('', 'composite');
	} else {
		var Window = require('ui/iPhone/navbar');
		win = new Window('', 'composite');
	}

	//Back to the previous window while click on the back button of upper toolbar
	function closeWindow() {
		win.close();
	}

	//Upper toolbar's views
	var upperToolView = require('ui/upperToolbar/excluding_right_btn');
	var toolView = new upperToolView(imagePath.logbook, _title, _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', closeWindow);
	win.add(toolView);

	//Scroll View for Edit/View Tab bar
	var scrollView = Ti.UI.createScrollView({
		layout : 'vertical',
		contentWidth : Ti.UI.SIZE,
		contentHeight : Ti.UI.SIZE,
		showVerticalScrollIndicator : true,
		top : _dimentions.listViewTop,
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL
	});

	var mainView = Titanium.UI.createView({
		backgroundColor : '#fff',
		layout : 'vertical',
		borderRadius : 5,
		top : '2%',
		left : '5dp',
		right : '5dp',
		height : '80dp'
	});

	var horseName = Ti.UI.createLabel({
		text : '',
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
		text : '',
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
		borderColor : '#000',
		borderRadius : 5,
		color : '#000',
		value : '',
		top : '2%',
		left : '5dp',
		right : '5dp',
		height : '56%',
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
	textArea.add(activityIndicator);
	scrollView.add(mainView);
	scrollView.add(textArea);
	win.add(scrollView);

	//Rendering Json Data to show
	function renderJson(json) {
		if (json.logbook_item.horse) {
			if (json.logbook_item.horse.official_name) {
				horseName.text = json.logbook_item.horse.official_name.toString().trim();
			}
		}

		if (json.logbook_item.subject) {
			horseName.text = horseName.text + '\n' + json.logbook_item.subject.toString().trim();
		}

		if (json.logbook_item.logbook_date) {
			values.text = json.logbook_item.logbook_date.toString().trim();
		}

		if (json.logbook_item.user) {
			if (json.logbook_item.user.name) {
				values.text = values.text + '\n' + json.logbook_item.user.name.toString().trim();
			}
		}

		if (json.logbook_item.notes) {
			textArea.value = json.logbook_item.notes.toString().trim();
		}
	}

	//API Calling
	var API_Call = require('ui/apiCalling/call_with_indicator');
	new API_Call('GET', system_url.getEdit_View_id_url(_id), null, activityIndicator, function(json) {
		renderJson(json);
	});

	//Feedback sending
	function getFeedback() {
		var param = {};
		param.id = _id;

		if (textArea.value !== '') {
			param.notes = textArea.value;
		}

		return param;
	}

	function renderFeedback(json) {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'Alert!',
			message : 'Feedback successfully updated.',
			buttonNames : ['OK']
		});
		alertDialog.show();
		win.close();
	}

	//Get feedback upon submit button click
	function submitToFeedback() {
		if (textArea.value !== '') {
			var param = getFeedback();
			var API_Call = require('ui/apiCalling/call_without_indicator');
			new API_Call('PUT', system_url.getEdit_View_feedback_url(_id), param, function(json) {
				renderFeedback(json);
			});
		} else {
			alert('Text field should not empty.');
		}
	}

	//Bottom toolbar view & it's functionality
	var Feedback = require('ui/bottomToolbar/submit_to_feedback');
	var btmToolView = new Feedback('Submit', _dimentions.toolViewHeight, submitToFeedback);
	win.add(btmToolView);

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/withBtmToolbar');
	new OnOrientaionChange(toolView, btmToolView, scrollView);

	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;
};

module.exports = Edit_View_Filter;
