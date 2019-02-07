function Select_Location(_title, _defaultValue, windowStack, onComplete) {
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

	//Upper Toolbar
	var ToolBar = require('ui/upperToolbar/including_right_btn');
	var toolView = new ToolBar(imagePath.train, _title, imagePath.tick, _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', onBackBtnClick);
	toolView.children[2].addEventListener('touchend', onTickMarkBtnClick);
	win.add(toolView);

	//Upper TextField
	var label = Ti.UI.createLabel({
		id : '',
		backgroundColor : '#FFF',
		color : '#000',
		text : _defaultValue,
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
		title : 'Barn 1'
	});

	data[1] = Titanium.UI.createPickerRow({
		title : 'Field 1'
	});

	data[2] = Titanium.UI.createPickerRow({
		title : 'Field 2'
	});

	data[3] = Titanium.UI.createPickerRow({
		title : 'Foal Barn 1'
	});

	data[4] = Titanium.UI.createPickerRow({
		title : 'Food Barn 1'
	});

	data[5] = Titanium.UI.createPickerRow({
		title : 'Indoor Arena'
	});

	data[6] = Titanium.UI.createPickerRow({
		title : 'In-House Lab'
	});

	data[7] = Titanium.UI.createPickerRow({
		title : 'Office 1'
	});

	data[8] = Titanium.UI.createPickerRow({
		title : 'Outdoor Arena'
	});

	data[9] = Titanium.UI.createPickerRow({
		title : 'Paddock 1'
	});

	data[10] = Titanium.UI.createPickerRow({
		title : 'Pool 1'
	});

	data[11] = Titanium.UI.createPickerRow({
		title : 'Saddle Crib 1'
	});

	data[12] = Titanium.UI.createPickerRow({
		title : 'Stallion Barn 1'
	});
	data[13] = Titanium.UI.createPickerRow({
		title : 'Toolshop'
	});

	data[14] = Titanium.UI.createPickerRow({
		title : 'Tredmill 1'
	});

	data[15] = Titanium.UI.createPickerRow({
		title : 'Vet Room 1'
	});

	data[16] = Titanium.UI.createPickerRow({
		title : 'Walker 1'
	});

	data[17] = Titanium.UI.createPickerRow({
		title : 'Wash Room 1'
	});

	Picker.add(data);

	//Picker.setSelectedRow(0, 8, false);

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
