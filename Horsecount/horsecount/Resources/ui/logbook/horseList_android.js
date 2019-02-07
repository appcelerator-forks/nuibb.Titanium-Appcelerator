function HorseList(_title, windowStack, onCreate) {
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();
	var tabIndex = 'All';

	//Getting activity indicator object
	var Indicator = require('ui/common/activityIndicator');
	var activityIndicator = new Indicator('40%', '50%');

	var Window = require('ui/android/actionbar');
	var win = new Window('', _title === 'edit' ? 'vertical' : 'composite');

	//Image object
	var ImagesObject = require('ui/android/imagesPath');
	var imagePath = new ImagesObject();

	//Dimension object
	var _dimentions;
	if (_title === 'edit') {
		var Dimentions = require('dimension/withoutBtmToolbar');
		_dimentions = new Dimentions();
	} else if (_title === 'add') {
		var Dimentions = require('dimension/withBtmToolbar');
		_dimentions = new Dimentions();
	}

	//Back to the previous window while click on the back button of upper toolbar
	function closeWindow() {
		win.close();
	}

	//Upper toolbar's views
	var upperToolView = require('ui/upperToolbar/excluding_right_btn');
	var toolView = new upperToolView(imagePath.search_focus, 'Horses', _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', closeWindow);
	win.add(toolView);

	//Table View
	var search = Titanium.UI.createSearchBar({
		showCancel : true,
		icon : Ti.Android.R.drawable.ic_menu_search,
		color : '#000',
		barColor : 'silver'
	});

	var table = Ti.UI.createTableView({
		backgroundColor : '#fff',
		left : '5dp',
		right : '5dp',
		top : _title === 'edit' ? '1%' : _dimentions.listViewTop,
		height : _dimentions.listViewHeight,
		borderRadius : 5,
		search : search,
		searchAsChild : true,
		rowHeight : '30dp'
	});

	table.add(activityIndicator);
	table.addEventListener('click', function(e) {
		if (_title === 'add') {
			if (tabIndex === 'All') {
				onCreate(e.row.id, e.row.title);
				win.close();
			} else if (tabIndex === 'Recent') {
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
		table.setData([]);
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
				color : '#000',
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
				color : '#000',
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

	//For Edit/View and Add(allBtn)
	function renderJson(json) {
		table.setData([]);
		var curheader = '0';
		var rows = [];

		for (var i = 0,
		    j = json.horses.length; i < j; i++) {

			var item1,
			    item2;

			item1 = json.horses[i].id;
			item2 = json.horses[i].name.toString().trim();

			var row = Ti.UI.createTableViewRow({
				color : '#000',
				id : item1,
				title : item2
			});

			if (item2.substring(0, 1) != curheader) {
				curheader = item2.substring(0, 1);
				row.header = curheader;
			}
			row.className = 'horseList';
			rows.push(row);
		}

		//Tweak to the table set
		table.setData(rows);
	}

	function Fill_With_JSON(_url) {
		var API_Call = require('ui/apiCalling/call_with_indicator');
		new API_Call('GET', _url, null, activityIndicator, function(json) {
			renderJson(json);
		});
	}

	//Bottom Bar
	var btmToolview;
	if (_title === 'add') {
		btmToolview = Ti.UI.createView({
			bottom : '0dp',
			backgroundColor : '#C7EAFB',
			tintColor : '#27AAE1',
			width : '100%',
			height : _dimentions.toolViewHeight
		});

		var recentBtn = Titanium.UI.createButton({
			backgroundColor : '#C7EAFB',
			color : '#336699',
			title : 'Recent',
			borderWidth : 1,
			borderColor : '#336699',
			height : '30dp',
			width : '90dp',
			left : '5dp'
		});

		var allBtn = Titanium.UI.createButton({
			backgroundColor : '#336699',
			color : '#FFF',
			title : 'All',
			borderWidth : 1,
			borderColor : '#336699',
			height : '30dp',
			width : '90dp',
			left : '0dp'
		});

		recentBtn.addEventListener('click', function(e) {
			if (tabIndex === 'All') {
				tabIndex = 'Recent';
				recentBtn.setBackgroundColor('#336699');
				recentBtn.setColor('#FFF');
				allBtn.setBackgroundColor('#C7EAFB');
				allBtn.setColor('#336699');
				var _url = system_url.getAdd_Recent_url();
				Fill_With_Recent(_url);
			}
		});

		allBtn.addEventListener('click', function(e) {
			if (tabIndex === 'Recent') {
				tabIndex = 'All';
				allBtn.setBackgroundColor('#336699');
				allBtn.setColor('#FFF');
				recentBtn.setBackgroundColor('#C7EAFB');
				recentBtn.setColor('#336699');
				var _url = system_url.getAdd_Logbook_url();
				Fill_With_JSON(_url);
			}
		});

		var middleView = Ti.UI.createView({
			layout : 'horizontal',
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE
		});

		middleView.add(recentBtn);
		middleView.add(allBtn);
		btmToolview.add(middleView);
		win.add(btmToolview);
	}

	if (_title === 'edit') {
		var _url = system_url.getEdit_Logbook_url();
		Fill_With_JSON(_url);

		//Changing UI dimension while device orientation occurs
		var OnOrientaionChange = require('orientation/withoutBtmToolbar');
		new OnOrientaionChange(toolView, table);
	} else if (_title === 'add') {
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
