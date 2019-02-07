function HorseList(_title, _cityCode, windowStack, onCreate) {
	var isAndroid = Ti.Platform.osname === 'android';
	var _array = [];

	//Getting activity indicator object
	var Indicator = require('ui/common/activityIndicator');
	var activityIndicator = new Indicator('35%', '10%');

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
	//Event listener for right button of upper toolbar
	function onRightBtnClick(e) {
		if (_array.length) {
			onCreate(_array);
			win.close();
		}
	}

	//Back to the previous window while click on the back button of upper toolbar
	function closeWindow() {
		win.close();
	}

	//Upper toolbar's views
	var ToolBar = require('ui/upperToolbar/including_right_btn');
	var upperToolView = new ToolBar(imagePath.search_focus, _title, imagePath.tick, _dimentions.toolViewHeight);
	upperToolView.children[0].addEventListener('touchend', closeWindow);
	upperToolView.children[2].addEventListener('touchend', onRightBtnClick);
	win.add(upperToolView);

	var search = Ti.UI.createSearchBar({
		hintText : "Write Search Keyword",
		barColor : 'silver',
		//tintColor : '#27AAE1',
		top : '0dp',
		showCancel : true,
		height : isAndroid ? '10%' : Ti.UI.SIZE
	});

	search.addEventListener('cancel', function(e) {
		search.blur();
	});

	search.addEventListener('change', function(e) {
		if (e.value.length > 1) {
			Fill_With_JSON(e.value);
		}
	});

	win.add(search);

	//Listview template
	var plainTemplate = {
		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'title',
			properties : {
				color : '#000',
				height : '30dp',
				width : Ti.UI.FILL,
				left : '15dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold',
					fontSize : '14dp'
				}
			}
		}],
		properties : {
			height : '30dp',
			backgroundColor : '#FFF'
		}
	};

	var listView = Ti.UI.createListView({
		//backgroundColor:'transparent',
		left : '5dp',
		right : '5dp',
		top : '1%',
		bottom : '1%',
		borderRadius : 5,
		templates : {
			'default' : plainTemplate
		},
		defaultItemTemplate : 'default'
	});

	listView.add(activityIndicator);
	listView.addEventListener('itemclick', function(e) {
		var item = e.section.getItemAt(e.itemIndex);
		if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_NONE) {
			item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
			_array.push(item.title.text);
		} else if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK) {
			item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
			_array.pop(item.title.text);
		}
		e.section.updateItemAt(e.itemIndex, item);
	});

	win.add(listView);

	//For Edit/View and Add(All)
	function renderJson(json) {
		listView.setSections([]);
		var data = [];
		var sections = [];
		for (var i = 0,
		    j = j = json.length; i < j; i++) {
			data.push({
				title : {
					text : json[i].city.name.toString().trim()
				},
				// Sets the regular list data properties
				properties : {
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
				}
			});
		}

		var _section = Ti.UI.createListSection({
			items : data
		});

		sections.push(_section);
		listView.setSections(sections);
	}

	function Fill_With_JSON(_term) {
		var SystemUrl = require('ui/handheld/system_urls');
		var system_url = new SystemUrl();
		var API_Call = require('ui/apiCalling/call_with_indicator');
		new API_Call('GET', system_url.getCity_url(_cityCode, _term), null, activityIndicator, function(json) {
			renderJson(json);
		});
	}

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/only_upper_toolbar');
	new OnOrientaionChange(upperToolView);

	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;
};

module.exports = HorseList;
