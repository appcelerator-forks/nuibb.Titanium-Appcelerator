function Select_Location(_id, _navigation, windowStack, updateByFeedback) {
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

	//Back button click event listener function
	function closeWindow() {
		win.close();
	}

	//Upper TextField
	var label = Ti.UI.createLabel({
		backgroundColor : '#FFF',
		color : '#000',
		text : 'Leisure',
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

	//Event listener for right button of upper toolbar
	function onRightBtnClick() {
		var Assignment = require('ui/ridingschool/horse_assignment');
		var _assign = new Assignment(_id, label.text, _navigation, windowStack, updateByFeedback);
		windowStack.push(_assign);
		if (isAndroid) {
			_assign.open();
		} else {
			_navigation.openWindow(_assign);
		}
	}

	//Upper Toolbar
	var ToolBar = require('ui/upperToolbar/including_right_btn');
	var toolView = new ToolBar(imagePath.riding, 'Filter Horses', imagePath.plusBlurIcon, _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', closeWindow);
	toolView.children[2].addEventListener('touchend', onRightBtnClick);
	win.add(toolView);

	//Window properties
	var View = Ti.UI.createView({
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

	var data = [];

	data[0] = Titanium.UI.createPickerRow({
		title : 'Leisure'
	});

	data[1] = Titanium.UI.createPickerRow({
		title : 'Trail'
	});

	data[2] = Titanium.UI.createPickerRow({
		title : 'Jumping'
	});

	data[3] = Titanium.UI.createPickerRow({
		title : 'Hunter'
	});

	data[4] = Titanium.UI.createPickerRow({
		title : 'Dressage'
	});

	data[5] = Titanium.UI.createPickerRow({
		title : 'Eventing'
	});

	data[6] = Titanium.UI.createPickerRow({
		title : 'Western'
	});

	Picker.add(data);

	//Picker.setSelectedRow(0, 0, false);
	win.add(label);
	View.add(Picker);
	win.add(View);

	//On change picker event listener
	Picker.addEventListener('change', function(e) {
		label.text = e.row.title;
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

module.exports = Select_Location;
