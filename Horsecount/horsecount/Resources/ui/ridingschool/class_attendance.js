function Class_attendance(_id, windowStack, updateByFeedback) {
	var isAndroid = Ti.Platform.osname === 'android';
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();

	//Getting activity indicator object
	var Indicator = require('ui/common/activityIndicator');
	var activityIndicator = new Indicator('40%', '50%');

	//Window Object
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

	//Event listener for right button of upper toolbar
	function onRightBtnClick() {
		var param = {};
		if (leftCheckBox.checked) {
			param.attendance = 1;
			param.cancelled = 0;
		} else if (rightCheckBox.checked) {
			param.attendance = 0;
			param.cancelled = 1;
		} else {
			param.attendance = 0;
			param.cancelled = 0;
		}
		createFeedback(param);
	}

	var ToolBar = require('ui/upperToolbar/including_right_btn');
	var toolView = new ToolBar(imagePath.riding, 'Class Attendance', imagePath.tick, _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', closeWindow);
	toolView.children[2].addEventListener('touchend', onRightBtnClick);
	win.add(toolView);

	function renderSuccess(json) {
		updateByFeedback();
		win.close();
	}

	//Feedback function when checkmark of upper toolbar is clicked
	function createFeedback(param) {
		var API_Call = require('ui/apiCalling/call_without_indicator');
		new API_Call('POST', system_url.createLessonFeedback_url(_id), param, renderSuccess);
	}

	/*
	 * Window's different child view added here
	 */
	var viewHolder = Ti.UI.createView({
		backgroundColor : '#fff',
		top : '4dp',
		left : '5dp',
		right : '5dp',
		height : '150dp',
		borderRadius : 5
	});

	var label1 = Ti.UI.createLabel({
		text : '',
		color : '#000',
		top : '3dp',
		height : '20dp',
		width : Ti.UI.FILL,
		left : '10dp',
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : '14dp'
		}
	});

	var blueline = Ti.UI.createView({
		backgroundColor : '#36A9E1',
		top : '25dp',
		left : '10dp',
		right : '10dp',
		height : '1dp'
	});

	var label2 = Ti.UI.createLabel({
		text : '',
		color : '#000',
		top : '30dp',
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		left : '10dp',
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : '14dp'
		}
	});

	var attended = Ti.UI.createLabel({
		text : 'Attended',
		color : '#000',
		bottom : '10dp',
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		left : '10dp',
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : '14dp'
		}
	});

	var cancelled = Ti.UI.createLabel({
		text : 'Cancelled',
		color : '#000',
		bottom : '10dp',
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		right : '42dp',
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : '14dp'
		}
	});

	//Creating left checkbox
	function createLeftCheckbox() {
		var imageView = Titanium.UI.createImageView({
			type : 'left',
			checked : false,
			image : '',
			bottom : '5dp',
			left : '80dp',
			width : '25dp',
			height : '25dp',
			borderRadius : 5,
			borderWidth : 2,
			borderColor : 'silver'
		});

		imageView.addEventListener('click', leftToggleCheck);

		return imageView;
	}

	//Creating right checkbox
	function createRightCheckbox() {
		var imageView = Titanium.UI.createImageView({
			type : 'right',
			checked : false,
			image : '',
			bottom : '5dp',
			right : '10dp',
			width : '25dp',
			height : '25dp',
			borderRadius : 5,
			borderWidth : 2,
			borderColor : "silver"
		});

		imageView.addEventListener('click', rightToggleCheck);

		return imageView;
	}

	function getTickIcon() {
		if (isAndroid) {
			return "/images/Tick.png";
		} else {
			return "Tick@2x.png";
		}
	}

	function leftToggleCheck(e) {
		if (!e.source.checked) {
			e.source.image = getTickIcon();
			e.source.checked = true;
			rightCheckBox.removeEventListener('click', rightToggleCheck);
		} else {
			rightCheckBox.addEventListener('click', rightToggleCheck);
			e.source.image = '';
			e.source.checked = false;
		}
	}

	function rightToggleCheck(e) {
		if (!e.source.checked) {
			e.source.image = getTickIcon();
			e.source.checked = true;
			leftCheckBox.removeEventListener('click', leftToggleCheck);
		} else {
			e.source.image = '';
			e.source.checked = false;
			leftCheckBox.addEventListener('click', leftToggleCheck);
		}
	}

	var leftCheckBox = createLeftCheckbox();
	var rightCheckBox = createRightCheckbox();

	viewHolder.add(label1);
	viewHolder.add(blueline);
	viewHolder.add(label2);
	viewHolder.add(attended);
	viewHolder.add(leftCheckBox);
	viewHolder.add(cancelled);
	viewHolder.add(rightCheckBox);
	viewHolder.add(activityIndicator);
	win.add(viewHolder);

	function renderJson(json) {
		label1.text = json.lesson_schedule.customer_name;
		label2.text = json.lesson_schedule.start_time + ' - ' + json.lesson_schedule.end_time + ', ' + json.lesson_schedule.instructor_name + '\n' + json.lesson_schedule.location;
		if (json.lesson_schedule.is_attended) {
			leftCheckBox.image = getTickIcon();
			leftCheckBox.checked = true;
			rightCheckBox.removeEventListener('click', rightToggleCheck);
		}
		if (json.lesson_schedule.is_cancelled) {
			rightCheckBox.image = getTickIcon();
			rightCheckBox.checked = true;
			leftCheckBox.removeEventListener('click', leftToggleCheck);
		}
	}

	//Api call to load data in the class attendance view
	var API_Call = require('ui/apiCalling/call_with_indicator');
	new API_Call('GET', system_url.getLessonFeedback_url(_id), null, activityIndicator, renderJson);

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/only_upper_toolbar');
	new OnOrientaionChange(toolView);

	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;
}

module.exports = Class_attendance;
