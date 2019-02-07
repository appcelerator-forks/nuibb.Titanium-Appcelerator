function showSubject(_tab, _title, windowStack, onComplete) {
	var isAndroid = Ti.Platform.osname === 'android';
	//Getting activity indicator object
	var Indicator = require('ui/common/activityIndicator');
	var activityIndicator = new Indicator('40%', '50%');

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

	var win;
	if (isAndroid) {
		var Window = require('ui/android/actionbar');
		win = new Window('', 'vertical');
	} else {
		var Window = require('ui/iPhone/navbar');
		win = new Window('', 'vertical');
	}

	//Event listener for right button of upper toolbar
	function onRightBtnClick(e) {
		if (label.id !== '') {
			if (_tab === 'addTab') {
				var param = {};
				param.subject = label.text;
				param.author = _title;
				onComplete(param);
				win.close();
			} else {
				if (_title === 'Subject') {
					onComplete(label.text);
					win.close();
				} else if (_title === 'Author') {
					onComplete(label.id, label.text);
					win.close();
				}
			}
		} else {
			var alertDialog = Titanium.UI.createAlertDialog({
				title : 'Alert!',
				message : 'Please select ' + _title,
				buttonNames : ['OK']
			});
			alertDialog.show();
		}
	}

	//Back to the previous window while click on the back button of upper toolbar
	function closeWindow() {
		win.close();
	}

	//Upper toolbar's views
	var ToolBar = require('ui/upperToolbar/including_right_btn');
	var upperToolView = new ToolBar('', 'Subject', imagePath.tick, _dimentions.toolViewHeight);
	upperToolView.children[0].addEventListener('touchend', closeWindow);
	upperToolView.children[2].addEventListener('touchend', onRightBtnClick);
	win.add(upperToolView);

	var label = Ti.UI.createLabel({
		id : '',
		backgroundColor : '#fff',
		color : '#000',
		text : '',
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : '14dp'
		},
		textAlign : 'center',
		height : '25dp',
		width : '300dp',
		top : '1%',
		borderRadius : 5
	});

	//Window's properties'
	var View = Ti.UI.createView({
		//backgroundColor : 'green',
		width : '300dp',
		height : Ti.UI.SIZE,
		top : '5%'
	});

	var Picker = Ti.UI.createPicker({
		backgroundColor : '#FFF',
		useSpinner : true,
		borderRadius : 5,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});

	Picker.selectionIndicator = true;

	// Fill Picker With Data
	function renderJson(json) {
		var data = [];
		var _id,
		    item1;
		if (_title === 'Subject') {
			var _length = json.subjects.length;
			for (var i = _length - 1; _length && i >= 0; i--) {
				_id = i;
				item1 = json.subjects[i].name;
				data[i] = Titanium.UI.createPickerRow({
					id : _id,
					title : item1
				});
			}

		} else if (_title === 'Author') {
			var _length = json.authors.length;
			for (var i = _length - 1; _length && i >= 0; i--) {
				_id = json.authors[i].id;
				item1 = json.authors[i].name;
				data[i] = Titanium.UI.createPickerRow({
					id : _id,
					title : item1
				});
			}
		}

		if (_tab === 'addTab') {
			_title = json.author;
		}

		if (data.length) {
			Picker.add(data);
			Picker.setSelectedRow(0, 1, false);
		}
	}

	//Initialy adding a picker row to the picker for appending more rows later
	var data = [];
	data[0] = Titanium.UI.createPickerRow({
		title : '',
		id : ''
	});

	Picker.add(data);

	function get_url(tab) {
		var SystemUrl = require('ui/handheld/system_urls');
		var system_url = new SystemUrl();
		if (tab === 'editTab') {
			return system_url.getEdit_Logbook_url();
		} else if (tab === 'addTab') {
			return system_url.getAdd_Logbook_url();
		}
	}

	var API_Call = require('ui/apiCalling/call_with_indicator');
	new API_Call('GET', get_url(_tab), null, activityIndicator, function(json) {
		renderJson(json);
	});

	Picker.addEventListener('change', function(e) {
		if (e.row.id !== '') {
			label.id = e.row.id;
		} else {
			label.id = '';
		}
		label.text = e.row.title;
	});

	//Adding other window properties
	win.add(label);
	View.add(Picker);
	View.add(activityIndicator);
	win.add(View);

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/only_upper_toolbar');
	new OnOrientaionChange(upperToolView);

	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;
}

module.exports = showSubject;
