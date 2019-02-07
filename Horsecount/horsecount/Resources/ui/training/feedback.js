var loadData = function(_id, _navigation, windowStack, updateByFeedback) {
	var isAndroid = Ti.Platform.osname === 'android';
	//Creating window object
	var win;
	if (isAndroid) {
		var Window = require('ui/android/actionbar');
		win = new Window('', 'composite');
	} else {
		var Window = require('ui/iPhone/navbar');
		win = new Window('', 'composite');
	}

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

	//Back to the previous window while click on the back button of upper toolbar
	function closeWindow() {
		win.close();
	}

	//Upper toolbar's views
	var upperToolView = require('ui/upperToolbar/excluding_right_btn');
	var toolView = new upperToolView(imagePath.train, 'Feedback', _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', closeWindow);
	win.add(toolView);

	//Listview template
	var Template = require('ui/template/template2');
	var plainTemplate = new Template();

	//Adding list view to the window and implementing it's eventlistener
	var listView = Ti.UI.createListView({
		height : _dimentions.listViewHeight,
		left : '5dp',
		right : '5dp',
		top : _dimentions.listViewTop,
		borderRadius : 5,
		templates : {
			'plain' : plainTemplate
		},
		defaultItemTemplate : 'plain'
	});

	//List view click event listener
	listView.addEventListener('itemclick', function(e) {
		var item = e.section.getItemAt(e.itemIndex);
		if (e.itemId == 7) {
			var LoadData = require('ui/training/calender1');
			var dataToLoad = new LoadData('End Time', CustomData[7].text, windowStack, function(_date) {
				if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE) {
					item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
				}
				item.two.text = _date;
				item.two.color = '#36A9E1';
				e.section.updateItemAt(e.itemIndex, item);
			});

			windowStack.push(dataToLoad);

			if (isAndroid) {
				dataToLoad.open();
			} else {
				_navigation.openWindow(dataToLoad);
			}
		} else if (e.itemId == 6) {
			var LoadData = require('ui/training/location');
			var dataToLoad = new LoadData('Location', CustomData[6].text, windowStack, function(_location) {
				if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE) {
					item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
				}
				item.two.text = _location;
				item.two.color = '#36A9E1';
				e.section.updateItemAt(e.itemIndex, item);
			});

			windowStack.push(dataToLoad);

			if (isAndroid) {
				dataToLoad.open();
			} else {
				_navigation.openWindow(dataToLoad);
			}
		} else if (e.itemId == 5) {
			var LoadData = require('ui/training/keypad');
			var dataToLoad = new LoadData('Workload', _id, windowStack, function(_workload) {
				if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE) {
					item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
				}
				item.two.text = _workload;
				item.two.color = '#36A9E1';
				e.section.updateItemAt(e.itemIndex, item);
			});

			windowStack.push(dataToLoad);

			if (isAndroid) {
				dataToLoad.open();
			} else {
				_navigation.openWindow(dataToLoad);
			}
		} else if (e.itemId == 4) {
			var LoadData = require('ui/training/keypad');
			var dataToLoad = new LoadData('Target Performance', _id, windowStack, function(_workload) {
				if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE) {
					item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
				}
				item.two.text = _workload;
				item.two.color = '#36A9E1';
				e.section.updateItemAt(e.itemIndex, item);
			});

			windowStack.push(dataToLoad);

			if (isAndroid) {
				dataToLoad.open();
			} else {
				_navigation.openWindow(dataToLoad);
			}
		} else if (e.itemId == 3) {
			var LoadData = require('ui/training/keypad');
			var dataToLoad = new LoadData('Heart Rate @Load', _id, windowStack, function(_workload) {
				item.two.text = _workload;
				item.two.color = '#36A9E1';
				e.section.updateItemAt(e.itemIndex, item);
			});

			windowStack.push(dataToLoad);

			if (isAndroid) {
				dataToLoad.open();
			} else {
				_navigation.openWindow(dataToLoad);
			}
		} else if (e.itemId == 2) {
			var LoadData = require('ui/training/keypad');
			var dataToLoad = new LoadData('HR @10 min CD', _id, windowStack, function(_workload) {
				item.two.text = _workload;
				item.two.color = '#36A9E1';
				e.section.updateItemAt(e.itemIndex, item);
			});

			windowStack.push(dataToLoad);

			if (isAndroid) {
				dataToLoad.open();
			} else {
				_navigation.openWindow(dataToLoad);
			}
		} else if (e.itemId == 1) {
			var LoadData = require('ui/training/keypad');
			var dataToLoad = new LoadData('Body Temperature', _id, windowStack, function(_workload) {
				item.two.text = _workload;
				item.two.color = '#36A9E1';
				e.section.updateItemAt(e.itemIndex, item);
			});

			windowStack.push(dataToLoad);

			if (isAndroid) {
				dataToLoad.open();
			} else {
				_navigation.openWindow(dataToLoad);
			}
		} else if (e.itemId == 0) {
			var LoadData = require('ui/training/instruction');
			var dataToLoad = new LoadData('Instructions', _id, windowStack, function(_instruction) {
				item.two.text = _instruction;
				item.two.color = '#36A9E1';
				e.section.updateItemAt(e.itemIndex, item);
			});

			windowStack.push(dataToLoad);

			if (isAndroid) {
				dataToLoad.open();
			} else {
				_navigation.openWindow(dataToLoad);
			}
		}
	});

	win.add(listView);

	//Loading previous saved data from database to a array
	function previous_saved_data(argument) {
		var db = Titanium.Database.open('Horsecount');
		var array = [],
		    Rows;
		try {
			Rows = db.execute('SELECT * FROM TrainingDetails WHERE id = ?', _id);
			if (Rows.isValidRow()) {
				array.push(Rows.fieldByName('time'));
				array.push(Rows.fieldByName('location'));
				array.push(Rows.fieldByName('workload'));
				array.push(Rows.fieldByName('workload_unit'));
				array.push(Rows.fieldByName('performance'));
				array.push(Rows.fieldByName('performance_unit'));
				array.push(Rows.fieldByName('instruction'));
			}
		} catch(e) {
			alert(e);
		} finally {
			Rows.close();
			db.close();
			return array;
		}
	}

	//Get previous saved data to an array
	var array = previous_saved_data();

	//Array with row title names
	var CustomData = [{
		title : "Instructions",
		text : array[6]
	}, {
		title : "Body Temperature",
		text : ""
	}, {
		title : "Heart Rate @10 min CD",
		text : ""
	}, {
		title : "Heart Rate @Load",
		text : ""
	}, {
		title : "Target Performance",
		text : array[4] + ' ' + array[5]
	}, {
		title : "Workload",
		text : array[2] + ' ' + array[3]
	}, {
		title : "Location",
		text : array[1]
	}, {
		title : "End Time",
		text : array[0]
	}];

	//Adding data to list view template
	var arraySize = CustomData.length;
	var data = [];
	for (var i = arraySize - 1; i >= 0; i--) {
		data.push({
			one : {
				text : CustomData[i].title
			},
			two : {
				text : CustomData[i].text
			},
			properties : {
				itemId : i,
				accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
			}
		});
	}

	//Adding section to the list view
	var section = Ti.UI.createListSection({
		items : data
	});

	listView.sections = [section];

	//iterate through the rows to find out which ones are selected
	function checkedRowsAre() {
		var selected = [];
		for (var i = 0; i < arraySize; i++) {
			var item = listView.sections[0].getItemAt(i);
			if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK) {
				selected.push(i);
			}
		}
		if (selected.length) {
			return selected.length;
		} else {
			return '';
		}
	}

	//Get feedback upon submit button click
	function submitToFeedback(e) {
		var SystemUrl = require('ui/handheld/system_urls');
		var system_url = new SystemUrl();
		var param = {};

		if (checkedRowsAre() === 4) {
			var item = listView.sections[0].getItemAt(0);
			param.end_date = item.two.text;
			var item = listView.sections[0].getItemAt(1);
			param.location = item.two.text;
			var item = listView.sections[0].getItemAt(2);
			param.workload = item.two.text;
			var item = listView.sections[0].getItemAt(3);
			param.performance = item.two.text;
			var item = listView.sections[0].getItemAt(4);
			param.HR_load = item.two.text;
			var item = listView.sections[0].getItemAt(5);
			param.HR_load_10min = item.two.text;
			var item = listView.sections[0].getItemAt(6);
			param.temperature = item.two.text;
			var item = listView.sections[0].getItemAt(7);
			param.instructions = item.two.text;

			var API_Call = require('ui/apiCalling/call_for_train_feedback');
			new API_Call(system_url.getFeedback_url(_id), param, function(e) {
				updateByFeedback();
				closeWindow();
			});
		} else {
			var alertDialog = Titanium.UI.createAlertDialog({
				title : 'Alert!',
				message : 'First four fields must be selected.',
				buttonNames : ['OK']
			});
			alertDialog.show();
		}
	}

	//Bottom toolbar view & it's functionality
	var Feedback = require('ui/bottomToolbar/submit_to_feedback');
	var btmToolview = new Feedback('Submit', _dimentions.toolViewHeight, submitToFeedback);
	win.add(btmToolview);

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/withBtmToolbar');
	new OnOrientaionChange(toolView, btmToolview, listView);

	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;
};

module.exports = loadData;
