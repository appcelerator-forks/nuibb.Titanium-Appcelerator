function RidingSchool(_id, _filter, _navigation, windowStack, updateByFeedback) {
	var isAndroid = Ti.Platform.osname === 'android';
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();

	//Getting activity indicator object
	var Indicator = require('ui/common/activityIndicator');
	var activityIndicator = new Indicator('40%', '50%');

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

	//Back to the previous window while click on the back button of upper toolbar
	function closeWindow() {
		win.close();
	}

	//Upper Toolbar design and it's functionality
	var upperToolView = require('ui/upperToolbar/excluding_right_btn');
	var toolView = new upperToolView(imagePath.riding, 'Horse Assignment', _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', closeWindow);
	win.add(toolView);

	//Closing upper label windows to get back to the class management window
	function httpSuccessOfHorseAssign(json) {
		var windows = windowStack.concat([]);
		var _length = windows.length;
		for (var i = _length - 2; i < _length; i++) {
			(_navigation) ? _navigation.closeWindow(windows[i], {
				animated : true
			}) : windows[i].close();
		}
		updateByFeedback();
	}

	//Assining horse to the server by API calling
	function createPreferedHorse(horse_id) {
		var API_Call = require('ui/apiCalling/call_with_indicator');
		new API_Call('GET', system_url.createPreferedHorse_url(_id, horse_id), null, activityIndicator, function(json) {
			httpSuccessOfHorseAssign(json);
		});
	}

	//Adding table view to the window
	var table = Ti.UI.createTableView({
		top : '1%',
		left : '5dp',
		right : '5dp',
		height : _dimentions.listViewHeight,
		borderRadius : 5
	});

	table.addEventListener('click', function(e) {
		if (e.source.type === 'plus' && e.source.id) {
			createPreferedHorse(e.source.id);
		}
	});

	table.add(activityIndicator);
	win.add(table);

	//Dynamically adding colorful view to the table row
	function color_view(_color) {
		var _color = Ti.UI.createView({
			backgroundColor : _color,
			backgroundSelectedColor : 'transparent',
			height : Ti.UI.FILL,
			width : '20dp',
			borderWidth : 1,
			borderColor : 'silver'
		});

		return _color;
	}

	//Custom view row design
	function customViewRow(_object) {
		var blue_rows = _object.horse.blue_rows;
		var lilac_rows = _object.horse.lilac_rows;
		var white_rows = _object.horse.white_rows;

		var row = Ti.UI.createTableViewRow({
			backgroundColor : '#FFF',
			height : '62dp'
		});

		var holderView = Ti.UI.createView({
			layout : 'vertical',
			left : '0dp',
			height : Ti.UI.FILL,
			width : '245dp'
		});

		var header = Ti.UI.createLabel({
			color : '#000',
			text : _object.horse.official_name,
			font : {
				fontFamily : 'Arial',
				fontWeight : 'bold',
				fontSize : '14dp'
			},
			top : '2dp',
			left : '5dp',
			height : '20dp',
			width : Ti.UI.SIZE
		});

		var colorHolder = Ti.UI.createView({
			layout : 'horizontal',
			left : '5dp',
			height : '35dp',
			width : Ti.UI.FILL,
			borderWidth : 1,
			borderColor : 'silver'
		});

		if (blue_rows > 0) {
			for (var i = 0; i < blue_rows; i++) {
				colorHolder.add(color_view('#87CEFA'));
			}
		}

		if (lilac_rows > 0) {
			for (var i = 0; i < lilac_rows; i++) {
				colorHolder.add(color_view('#c8a2c8'));
			}
		}

		var diff = white_rows - (blue_rows + lilac_rows);

		if (diff > 0) {
			for (var i = 0; i < diff; i++) {
				colorHolder.add(color_view('#ffffff'));
			}
		}

		for (var i = 0,
		    j = 12 - white_rows; i < j; i++) {
			colorHolder.add(color_view('#D3D3D3'));
		}

		holderView.add(header);
		holderView.add(colorHolder);

		var icon = Ti.UI.createImageView({
			type : _object.horse.valid_class ? 'plus' : "",
			id : _object.horse.id,
			image : _object.horse.valid_class ? imagePath.plusIcon : "",
			height : '30dp',
			width : '30dp',
			right : '10dp'
		});

		row.selectedBackgroundColor = 'transparent';
		row.add(holderView);
		if (_object.horse.valid_class) {
			row.add(icon);
			row.className = 'school';
		} else {
			row.className = 'empty';
		}

		row.add(holderView);
		row.add(icon);
		table.appendRow(row);
	}

	//Filling table view tith json data
	function fill_table_With_Data(json) {
		for (var i = 0,
		    j = json.length; i < j; i++) {
			customViewRow(json[i]);
		}
	}

	//API calling to get json data from server
	var API_Call = require('ui/apiCalling/call_with_indicator');
	new API_Call('GET', system_url.getHorseAssignment_url(_id, _filter), null, activityIndicator, function(json) {
		fill_table_With_Data(json);
	});

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/withoutBtmToolbar');
	new OnOrientaionChange(toolView, table);

	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;
}

module.exports = RidingSchool;

