function HorseList(_title, windowStack, onCreate) {
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();
	var isAndroid = Ti.Platform.osname === 'android';
	var searchTop,
	    searchHeight,
	    tableTop,
	    tableHeight,
	    toolview,
	    toolviewHeight;
	var _array = [];

	//Getting activity indicator object
	var Indicator = require('ui/common/activityIndicator');
	var activityIndicator = new Indicator('35%', '10%');

	var win;
	if (isAndroid) {
		var Window = require('ui/android/actionBarForhbDetails');
		win = new Window();
	} else {
		var Window = require('ui/iPhone/navbarForhbDetails');
		win = new Window();
	}

	if (isAndroid) {
		if (Titanium.Gesture.orientation == Ti.UI.PORTRAIT) {
			toolviewHeight = '7%';
			searchTop = '8%';
			searchHeight = '7%';
			tableTop = '16%';
			tableHeight = '83%';
		} else if (Titanium.Gesture.orientation == Ti.UI.LANDSCAPE_LEFT || Titanium.Gesture.orientation == Ti.UI.LANDSCAPE_RIGHT) {
			toolviewHeight = '10%';
			searchTop = '11%';
			searchHeight = '10%';
			tableTop = '21%';
			tableHeight = '78%';
		}
	} else {
		if (Ti.UI.orientation == Ti.UI.PORTRAIT) {
			var iPhone4 = Ti.Platform.displayCaps.platformHeight == 480 ? true : false;
			searchTop = '43dp';
			searchHeight = '43dp';
			if (iPhone4) {
				tableTop = '89dp';
				tableHeight = '78%';
			} else {
				tableTop = '88dp';
				tableHeight = '82%';
			}
		} else if (Ti.UI.orientation == Ti.UI.LANDSCAPE_LEFT || Ti.UI.orientation == Ti.UI.LANDSCAPE_RIGHT) {
			searchTop = '32dp';
			searchHeight = '32dp';
			tableTop = '67dp';
			tableHeight = '74%';
		}
	}

	Ti.Gesture.addEventListener('orientationchange', function(e) {
		if (e.orientation == Ti.UI.LANDSCAPE_LEFT || e.orientation == Ti.UI.LANDSCAPE_RIGHT) {
			var searchTop,
			    searchHeight,
			    tableTop,
			    tableHeight;
			if (isAndroid) {
				searchTop = '11%';
				searchHeight = '10%';
				tableTop = '21%';
				tableHeight = '78%';

				toolview.applyProperties({
					height : '10%'
				});

			} else {
				searchTop = '32dp';
				searchHeight = '32dp';
				tableTop = '67dp';
				tableHeight = '74%';
			}

			search.applyProperties({
				top : searchTop,
				height : searchHeight
			});

			listView.applyProperties({
				top : tableTop,
				height : tableHeight
			});

		} else if (e.orientation == Ti.UI.PORTRAIT) {
			var searchTop,
			    searchHeight,
			    tableTop,
			    tableHeight;
			if (isAndroid) {
				searchTop = '8%';
				searchHeight = '7%';
				tableTop = '16%';
				tableHeight = '83%';

				toolview.applyProperties({
					height : '7%'
				});

			} else {
				var iPhone4 = Ti.Platform.displayCaps.platformHeight == 480 ? true : false;
				searchTop = '43dp';
				searchHeight = '43dp';
				if (iPhone4) {
					tableTop = '89dp';
					tableHeight = '78%';
				} else {
					tableTop = '88dp';
					tableHeight = '82%';
				}
			}

			search.applyProperties({
				top : searchTop,
				height : searchHeight
			});

			listView.applyProperties({
				top : tableTop,
				height : tableHeight
			});
		}
	});

	//Upper Toolbar
	if (isAndroid) {
		var UpperToolBar = require('ui/upperToolbar/android/hbHorseListToolbar');
		toolview = new UpperToolBar(win, "/images/Search.png", _title, toolviewHeight);
		toolview.children[2].addEventListener('touchend', function(e) {
			if (_title !== 'Find by Horse Name') {
				onCreate(_array);
				win.close();
			} else {
				if (_array.length === 1) {
					onCreate(_array[0]);
					win.close();
				} else {
					alert('You must select only one horse here!');
				}
			}
		});

		win.add(toolview);
	} else {
		var UpperToolBar = require('ui/upperToolbar/iPhone/hbHorseListToolbar');
		var toolbar = new UpperToolBar(win, "Search@2x.png", _title, '60dp');
		toolbar.items[5].addEventListener('touchend', function(e) {
			if (_title !== 'Find by Horse Name') {
				onCreate(_array);
				win.close();
			} else {
				if (_array.length === 1) {
					onCreate(_array[0]);
					win.close();
				} else {
					alert('You must select only one horse here!');
				}
			}
		});

		win.add(toolbar);
	}

	var search = Ti.UI.createSearchBar({
		hintText : "Write Search Keyword",
		barColor : 'silver',
		//tintColor : '#27AAE1',
		showCancel : true,
		height : searchHeight,
		top : searchTop
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
		top : tableTop,
		height : tableHeight,
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
			_array.push(e.itemId);
		} else if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK) {
			item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
			_array.pop(e.itemId);
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
					text : json[i].horse.official_name.toString().trim()
				},
				// Sets the regular list data properties
				properties : {
					itemId : json[i].horse.id,
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
				}
			});
		}

		var _section = Ti.UI.createListSection({
			items : data
		});

		sections.push(_section);
		listView.setSections(sections);
		activityIndicator.hide();
	}

	function Fill_With_JSON(_term) {
		var param = {};
		param.term = _term;
		//Ti.API.info(_term);
		if (_title === 'Find by Sire') {
			param.gender = 'Stallion';
		}
		if (_title === 'Find by Dam') {
			param.gender = 'Mare';
		}
		var _url = system_url.getBoardAllHorse_url();
		var API_Call = require('ui/apiCalling/call_with_indicator');
		new API_Call('POST', _url, param, activityIndicator, function(json) {
			renderJson(json);
		});
	}

	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;
};

module.exports = HorseList;
