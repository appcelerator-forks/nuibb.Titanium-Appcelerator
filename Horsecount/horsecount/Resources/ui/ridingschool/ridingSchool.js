function RidingSchool(_title, _navigation, windowStack) {
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

	//Getting activity indicator object
	var Indicator = require('ui/common/activityIndicator');
	var activityIndicator = new Indicator('40%', '50%');

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
		Ti.App.fireEvent('ModuleHiding');
		win.close();
	}

	//Upper toolbar's views
	var upperToolView = require('ui/upperToolbar/excluding_right_btn');
	var toolView = new upperToolView(imagePath.riding, _title, _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', closeWindow);
	win.add(toolView);

	//Function to create a footer view
	var createCustomFooter = function() {
		var view = Ti.UI.createView({
			backgroundColor : 'silver',
			width : Ti.UI.FILL,
			height : '60dp'
		});

		view.add(activityIndicator);
		return view;
	};

	//Listview template
	var Template = require('ui/template/template3');
	var plainTemplate = new Template();

	//Adding list view to the window and implementing it's eventlistener
	var listView = Ti.UI.createListView({
		top : '1%',
		left : '5dp',
		right : '5dp',
		height : _dimentions.listViewHeight,
		borderRadius : 5,
		templates : {
			'plain' : plainTemplate
		},
		defaultItemTemplate : 'plain',
		footerView : createCustomFooter()
	});

	listView.addEventListener('itemclick', function(e) {
		var item = e.section.getItemAt(e.itemIndex);
		var _text = item.one.text + '\n' + item.two.text + '\n' + item.three.text;
		var Data = require('ui/ridingschool/class_management');
		var dataToLoad = new Data(e.itemId, _text, _navigation, windowStack);
		windowStack.push(dataToLoad);
		if (isAndroid) {
			dataToLoad.open();
		} else {
			_navigation.openWindow(dataToLoad);
		}
	});

	win.add(listView);

	//Function of filling list view section by json data
	function fill_listview_With_Data(json) {
		var data = [];
		var _length = json.length;
		if (_length) {
			for (var i = 0; i < _length; i++) {
				var _time = json[i].riding_class.start_time.toString().trim() + ' - ' + json[i].riding_class.end_time.toString().trim() + ', ' + json[i].riding_class.instructor.toString().trim();
				data.push({
					one : {
						text : json[i].riding_class.class_name.toString().trim()
					},
					two : {
						text : _time
					},
					three : {
						text : json[i].riding_class.location.toString().trim()
					},
					// Sets the regular list data properties
					properties : {
						itemId : json[i].riding_class.id,
						accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
					}
				});
			}

			var section = Ti.UI.createListSection({
				items : data
			});

			listView.sections = [section];
		} else {
			var alertDialog = Titanium.UI.createAlertDialog({
				title : 'Message!',
				message : 'There is no data in the server.',
				buttonNames : ['OK']
			});
			alertDialog.show();
		}
	}

	//API calling to get json data from server
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();
	var API_Call = require('ui/apiCalling/call_with_indicator');
	new API_Call('GET', system_url.getRidingSchool_url(), null, activityIndicator, function(json) {
		fill_listview_With_Data(json);
	});

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/withoutBtmToolbar');
	new OnOrientaionChange(toolView, listView);

	//Event listener when window is close down
	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;
}

module.exports = RidingSchool;

