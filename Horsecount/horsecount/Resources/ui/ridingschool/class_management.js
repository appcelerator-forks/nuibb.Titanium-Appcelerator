function RidingSchool(_id, _text, _navigation, windowStack) {
	var isAndroid = Ti.Platform.osname === 'android';
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();
	//Creating window object
	var win;
	if (isAndroid) {
		var Window = require('ui/android/actionbar');
		win = new Window('', 'vertical');
	} else {
		var Window = require('ui/iPhone/navbar');
		win = new Window('', 'vertical');
	}

	//Getting activity indicator object
	var Indicator = require('ui/common/activityIndicator');
	var activityIndicator = new Indicator('40%', '50%');

	//Dimension object
	var Dimentions = require('dimension/riding_class');
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

	//Upper toolbar's views
	var upperToolView = require('ui/upperToolbar/excluding_right_btn');
	var toolView = new upperToolView(imagePath.riding, 'Class Management', _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', closeWindow);
	win.add(toolView);

	//Function to create a footer view
	var createCustomFooter = function() {
		var view = Ti.UI.createView({
			backgroundColor : 'silver',
			width : Ti.UI.FILL,
			height : '80dp'
		});

		view.add(activityIndicator);
		return view;
	};

	//Adding text area to the window
	var labelHolder = Ti.UI.createScrollView({
		backgroundColor : '#FFF',
		left : '5dp',
		right : '5dp',
		top : '1%',
		height : _dimentions.labelHeight,
		borderRadius : 5
	});

	var label = Ti.UI.createLabel({
		text : _text,
		font : {
			fontFamily : 'Arial',
			fontSize : '14dp'
		},
		textAlign : 'center',
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE
	});

	labelHolder.add(label);
	win.add(labelHolder);

	//Listview template
	var Template = require('ui/template/template5');
	var plainTemplate = new Template();

	//Adding list view to the window and implementing it's eventlistener
	var listView = Ti.UI.createListView({
		height : _dimentions.listViewHeight,
		left : '5dp',
		right : '5dp',
		top : '1%',
		borderRadius : 5,
		templates : {
			'plain' : plainTemplate
		},
		defaultItemTemplate : 'plain',
		footerView : createCustomFooter()
	});

	listView.addEventListener('itemclick', function(e) {
		var item = e.section.getItemAt(e.itemIndex);
		if (e.bindId === 'pic' && item.properties.id && item.pic.image !== '') {
			undoPreferedHorse(item.properties.id);
		} else if (e.bindId === 'pic' && !item.properties.id) {
			var Filter = require('ui/ridingschool/filter_horses');
			var _filter = new Filter(e.itemId, _navigation, windowStack, loadJsonData);

			windowStack.push(_filter);

			if (isAndroid) {
				_filter.open();
			} else {
				_navigation.openWindow(_filter);
			}
		} else if (e.bindId !== 'pic' && item.properties.id) {
			var DataToLoad = require('ui/ridingschool/class_attendance');
			var data = new DataToLoad(item.properties.id, windowStack, loadJsonData);
			windowStack.push(data);

			if (isAndroid) {
				data.open();
			} else {
				_navigation.openWindow(data);
			}
		}
	});

	win.add(listView);

	function getImagePath(_isPlusIcon) {
		if (_isPlusIcon) {
			return imagePath.plusIcon;
		} else {
			return imagePath.undoIcon;
		}
	}

	function fill_listview_With_Data(json) {
		var data = [];
		for (var i = 0,
		    j = json.length; i < j; i++) {
			var _picId,
			    _arrowPath = '',
			    _picPath = '',
			    horse = '';
			if (json[i].sales_lesson.lesson_schedule_id) {
				_picId = json[i].sales_lesson.lesson_schedule_id;
				_arrowPath = imagePath.nextArrow;
				if (!json[i].sales_lesson.is_cancelled) {
					horse = json[i].sales_lesson.assigned_horse.toString().trim();
				}
				if (json[i].sales_lesson.is_attended || json[i].sales_lesson.is_cancelled) {
				} else {
					_picPath = getImagePath(0);
				}
			} else {
				_picPath = getImagePath(1);
				_picId = null;
			}

			data.push({
				name : {
					text : json[i].sales_lesson.customer_name.toString().trim()
				},
				horse : {
					text : horse
				},
				num : {
					text : json[i].sales_lesson.remaining_class
				},
				pic : {
					image : _picPath
				},
				arrow : {
					image : _arrowPath
				},
				// Sets the regular list data properties
				properties : {
					id : _picId,
					itemId : json[i].sales_lesson.id
				}
			});
		}

		var section = Ti.UI.createListSection({
			items : data
		});

		listView.sections = [section];
	}

	//API calling to get json data from server
	function loadJsonData() {
		var API_Call = require('ui/apiCalling/call_with_indicator');
		new API_Call('GET', system_url.getClassManagement_url(_id), null, activityIndicator, function(json) {
			fill_listview_With_Data(json);
		});
	}

	loadJsonData();

	//Reloading data after undo prefered horses
	function showMessage(json) {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'Message!',
			message : json.message,
			buttonNames : ['OK']
		});
		alertDialog.show();
		loadJsonData();
	}

	//Api calling to undo prefered horses as plus icon turns to undo icon
	function undoPreferedHorse(schedule_id) {
		var API_Call = require('ui/apiCalling/call_without_indicator');
		new API_Call('GET', system_url.undoPreferedHorse_url(schedule_id), null, function(json) {
			if (json.error) {
				closeWindow();
			} else {
				showMessage(json);
			}
		});
	}

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/riding_class');
	new OnOrientaionChange(toolView, listView);

	//Event listener when window is close down
	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;
};

module.exports = RidingSchool;
