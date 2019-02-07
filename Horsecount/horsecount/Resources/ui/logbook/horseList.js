function HorseList(_title, windowStack, onCreate) {
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();

	//Getting activity indicator object
	var Indicator = require('ui/common/activityIndicator');
	var activityIndicator = new Indicator('40%', '50%');

	//Dimension object
	var _dimentions;
	if (_title === 'edit') {
		var Dimentions = require('dimension/withoutBtmToolbar');
		_dimentions = new Dimentions();
	} else if (_title === 'add') {
		var Dimentions = require('dimension/withBtmToolbar');
		_dimentions = new Dimentions();
	}

	var ImagesObject = require('ui/iPhone/imagesPath');
	var imagePath = new ImagesObject();

	//Window Creation
	var Window = require('ui/iPhone/navbar');
	var win = new Window('', _title === 'edit' ? 'vertical' : 'composite');

	//Back to the previous window while click on the back button of upper toolbar
	function closeWindow() {
		win.close();
	}

	//Upper toolbar's views
	var upperToolView = require('ui/upperToolbar/excluding_right_btn');
	var toolView = new upperToolView(imagePath.search_focus, 'Horses', _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', closeWindow);
	win.add(toolView);

	var search = Titanium.UI.createSearchBar({
		showCancel : true
	});

	var table = Ti.UI.createTableView({
		backgroundColor : '#fff',
		left : '5dp',
		right : '5dp',
		top : _title === 'edit' ? '1%' : _dimentions.listViewTop,
		height : _dimentions.listViewHeight,
		borderRadius : 5,
		search : search,
		rowHeight : '30dp'
	});

	table.add(activityIndicator);
	table.addEventListener('click', function(e) {
		if (_title === 'add') {
			if (bottomTabs.index) {
				onCreate(e.row.id, e.row.title);
				win.close();
			} else {
				onCreate(e.row.id, e.row.children[0].text);
				win.close();
			}
		} else {
			onCreate(e.row.id, e.row.title);
			win.close();
		}
	});

	win.add(table);

	//For Add(Recent)
	function renderRecent(json) {
		table.setIndex([]);
		table.setData([]);
		//var curheader = '0';
		//var index = [];
		var Rows = [];

		for (var i = 0,
		    j = json.length; i < j; i++) {

			var item1,
			    item2,
			    item3;

			item1 = json[i].recent_horse.horse.id;
			item2 = json[i].recent_horse.horse.official_name.toString().trim();
			item3 = json[i].recent_horse.change_date.toString().trim();

			var row = Ti.UI.createTableViewRow({
				id : item1
			});

			var horseName = Ti.UI.createLabel({
				//backgroundColor:'green',
				id : item1,
				width : '69%',
				height : Ti.UI.SIZE,
				left : '10dp',
				text : item2,
				font : {
					fontFamily : 'Arial',
					fontSize : '15dp'
				},
				textAlign : 'left'
			});

			var date = Ti.UI.createLabel({
				//backgroundColor:'blue',
				id : item1,
				width : Ti.UI.FILL,
				height : Ti.UI.SIZE,
				right : '5dp',
				top : '2dp',
				text : item3,
				font : {
					fontFamily : 'Arial',
					fontSize : '15dp'
				},
				textAlign : 'right'
			});

			row.add(horseName);
			row.add(date);
			row.className = 'recentHorse';
			Rows.push(row);
		}

		//Tweak to the table set
		table.setData(Rows);
	}

	function Fill_With_Recent(_url) {
		var API_Call = require('ui/apiCalling/call_with_indicator');
		new API_Call('GET', _url, null, activityIndicator, function(json) {
			renderRecent(json);
		});
	}

	//For Edit/View and Add(All)
	function renderJson(json) {
		table.setData([]);
		var curheader = '0';
		var index = [];
		var rows = [];

		for (var i = 0,
		    j = json.horses.length; i < j; i++) {

			var item1,
			    item2;

			item1 = json.horses[i].id;
			item2 = json.horses[i].name.toString().trim();

			var row = Ti.UI.createTableViewRow({
				id : item1,
				title : item2
			});

			if (item2.substring(0, 1) != curheader) {
				curheader = item2.substring(0, 1);
				row.header = curheader;
				index.push({
					index : i,
					title : curheader
				});
			}
			row.className = 'horseList';
			rows.push(row);
		}

		//Tweak to the table set
		table.setData(rows);
		table.setIndex(index);
	}

	//API calling to get json data from server
	function Fill_With_JSON(_url) {
		var API_Call = require('ui/apiCalling/call_with_indicator');
		new API_Call('GET', _url, null, activityIndicator, function(json) {
			renderJson(json);
		});
	}

	if (_title === 'edit') {
		//Api call to fill up list view
		var _url = system_url.getEdit_Logbook_url();
		Fill_With_JSON(_url);

		//Changing UI dimension while device orientation occurs
		var OnOrientaionChange = require('orientation/withoutBtmToolbar');
		new OnOrientaionChange(toolView, table);
	} else if (_title === 'add') {
		var bottomTabs = Titanium.UI.iOS.createTabbedBar({
			labels : ['Recent', 'All'],
			backgroundColor : '#336699',
			style : Titanium.UI.iPhone.SystemButtonStyle.BAR,
			height : Ti.UI.SIZE,
			width : Ti.UI.SIZE,
			index : 1
		});

		bottomTabs.addEventListener('click', function(e) {
			if (e.index) {
				var _url = system_url.getAdd_Logbook_url();
				Fill_With_JSON(_url);
			} else {
				var _url = system_url.getAdd_Recent_url();
				Fill_With_Recent(_url);
			}
		});

		var btmToolview = Ti.UI.createView({
			backgroundColor : '#C7EAFB',
			tintColor : '#27AAE1',
			bottom : '0dp',
			width : Ti.UI.FILL,
			height : _dimentions.toolViewHeight
		});

		btmToolview.add(bottomTabs);
		win.add(btmToolview);

		//Api call to fill up list view
		var _url = system_url.getAdd_Logbook_url();
		Fill_With_JSON(_url);

		//Changing UI dimension while device orientation occurs
		var OnOrientaionChange = require('orientation/withBtmToolbar');
		new OnOrientaionChange(toolView, btmToolview, table);
	}

	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;
};

module.exports = HorseList;
