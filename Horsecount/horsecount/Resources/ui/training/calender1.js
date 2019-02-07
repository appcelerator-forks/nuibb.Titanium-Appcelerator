function showCalendars(_title, _defaultValue, windowStack, onComplete) {
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
		onComplete(label.text);
		win.close();
	}

	//Get window icon
	function get_window_icon(_name) {
		if (_name === "End Time") {
			return imagePath.train;
		} else if (_name === "Date") {
			return imagePath.logbook;
		}
	}

	//Upper Toolbar
	var ToolBar = require('ui/upperToolbar/including_right_btn');
	var toolView = new ToolBar(get_window_icon(_title), _title, imagePath.tick, _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', onBackBtnClick);
	toolView.children[2].addEventListener('touchend', onTickMarkBtnClick);
	win.add(toolView);

	//Upper TextField
	var label = Ti.UI.createLabel({
		id : '',
		backgroundColor : '#FFF',
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

	// Window properties
	var View = Ti.UI.createView({
		width : '300dp',
		height : Ti.UI.SIZE,
		top : '5%'
	});

	var Picker = Ti.UI.createPicker({
		backgroundColor : '#FFF',
		borderRadius : 5,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});

	Picker.selectionIndicator = true;

	function getDay(day) {
		var day_str;
		switch (day) {
		case 0:
			day_str = "Sun";
			break;
		case 1:
			day_str = "Mon";
			break;
		case 2:
			day_str = "Tue";
			break;
		case 3:
			day_str = "Wed";
			break;
		case 4:
			day_str = "Thu";
			break;
		case 5:
			day_str = "Fri";
			break;
		case 6:
			day_str = "Sat";
			break;
		}
		return day_str;
	}

	function getMonth(month) {
		var month_str;
		switch (month) {
		case 0:
			month_str = "Jan";
			break;
		case 1:
			month_str = "Feb";
			break;
		case 2:
			month_str = "Mar";
			break;
		case 3:
			month_str = "Apr";
			break;
		case 4:
			month_str = "May";
			break;
		case 5:
			month_str = "Jun";
			break;
		case 6:
			month_str = "Jul";
			break;
		case 7:
			month_str = "Aug";
			break;
		case 8:
			month_str = "Sep";
			break;
		case 9:
			month_str = "Oct";
			break;
		case 10:
			month_str = "Nov";
			break;
		case 11:
			month_str = "Dec";
			break;
		}

		return month_str;
	}

	//Getting date & time as string
	function getTime() {
		var currentTime = new Date();
		var day = getDay(currentTime.getDay());
		var month = getMonth(currentTime.getMonth());
		var date = currentTime.getDate();
		var year = currentTime.getFullYear();

		return day + " " + month + " " + date + " " + year;

		/*var currentTime = new Date();
		 var hours = currentTime.getHours();
		 var minutes = currentTime.getMinutes();
		 return hours + ":" + minutes;*/
	}

	//Setting the picker date type
	if (_title === 'Date') {
		Picker.setType(Ti.UI.PICKER_TYPE_DATE);
		if (isAndroid) {
			label.text = getTime();
		} else {
			var now = new Date();
			var str = now.toLocaleString();
			label.text = str.slice(0, str.indexOf("at"));
		}
	} else if (_title === 'End Time') {
		Picker.setType(Ti.UI.PICKER_TYPE_TIME);
		label.text = _defaultValue;
	}

	win.add(label);
	View.add(Picker);
	win.add(View);

	//On change picker event listener
	Picker.addEventListener('change', function(e) {
		var str = e.value.toLocaleString();
		if (_title === 'Date') {
			var str = e.value.toLocaleString();
			if (isAndroid) {
				label.text = str.slice(0, str.indexOf("00"));
			} else {
				label.text = str.slice(0, str.indexOf("at"));
			}
		} else if (_title === 'End Time') {
			label.text = e.value.getHours().toLocaleString() + ':' + e.value.getMinutes().toLocaleString();
		}
	});

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/only_upper_toolbar');
	new OnOrientaionChange(toolView);

	//Event listener when window is close down
	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;
}

module.exports = showCalendars;
