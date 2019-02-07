function menu2(_title, _navigation, _id, windowStack) {
	var isAndroid = Ti.Platform.osname === 'android';
	//Getting activity indicator object
	var Indicator = require('ui/common/activityIndicator');
	var activityIndicator = new Indicator('40%', '20%');

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

	//Dynamically select icon path for the upper toolbar
	function selectIconPath() {
		if (_title === 'Feed & Care') {
			return imagePath.feed;
		} else if (_title === 'Health') {
			return imagePath.health;
		} else if (_title === 'Gestation') {
			return imagePath.gestation;
		}
	}

	//Back to the previous window while click on the back button of upper toolbar
	function closeWindow() {
		win.close();
	}

	//Event listener for right button of upper toolbar
	function onRightBtnClick() {
		var FeedBack = require('ui/training/feedback');
		var feed = new FeedBack(_id, _navigation, windowStack, updateByFeedback);
		windowStack.push(feed);
		isAndroid ? feed.open() : _navigation.openWindow(feed);
	}

	//Upper Toolbar design and it's functionality
	var toolView;
	if (_title !== 'Training') {
		var upperToolView = require('ui/upperToolbar/excluding_right_btn');
		toolView = new upperToolView(selectIconPath(), _title, _dimentions.toolViewHeight);
		toolView.children[0].addEventListener('touchend', closeWindow);
		win.add(toolView);
	} else {
		var ToolBar = require('ui/upperToolbar/including_right_btn');
		toolView = new ToolBar(imagePath.train, 'Training Details', imagePath.nextArrow, _dimentions.toolViewHeight);
		toolView.children[0].addEventListener('touchend', closeWindow);
		toolView.children[2].addEventListener('touchend', onRightBtnClick);
		win.add(toolView);
	}

	//Holder view to show activity indicator on middle of the view
	var holderView = Titanium.UI.createView({
		height : Ti.UI.SIZE,
		left : '5dp',
		right : '5dp',
		top : '1%'
	});

	//Main view that holds different label with texts
	var mainView = Titanium.UI.createView({
		backgroundColor : '#fff',
		top : '0dp',
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		borderWidth : 1,
		borderColor : '#000',
		borderRadius : 5
	});

	var time = Ti.UI.createLabel({
		color : '#000',
		text : '', //item1,
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : '17dp'
		},
		textAlign : 'left',
		height : Ti.UI.SIZE,
		width : '50dp',
		left : '5dp',
		top : '3dp'
	});

	var view = Ti.UI.createView({
		layout : 'vertical',
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		left : '65dp',
		top : '3dp'
	});

	var horseName = Ti.UI.createLabel({
		text : '', //item2,
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : '17dp'
		},
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		left : '0dp'
	});

	var values = Ti.UI.createLabel({
		text : '', //item3,
		font : {
			fontFamily : 'Arial',
			fontSize : '12dp'
		},
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		left : '0dp'
	});

	view.add(horseName);
	view.add(values);

	mainView.add(time);
	mainView.add(view);
	holderView.add(activityIndicator);
	holderView.add(mainView);
	win.add(holderView);

	//Deleting db table before re-inserting data in database from json under window title consideration
	function deleteTable(query) {
		var db = Titanium.Database.open('Horsecount');
		try {
			db.execute('BEGIN');
			db.execute(query, _id);
			db.execute('COMMIT');
		} catch(e) {
			alert(e);
		} finally {
			db.close();
		}
	}

	//Insert data into database under window title consideration
	function insertTable(query, array) {
		var db = Titanium.Database.open('Horsecount');
		try {
			db.execute('BEGIN');
			db.execute(query, array);
			db.execute('COMMIT');
		} catch(e) {
			alert(e);
		} finally {
			db.close();
		}
	}

	//Function of filling details view section by either from database or json data
	function Fill_With_Data(json) {
		if (json) {
			var array = [];

			if (_title === 'Feed & Care') {
				var item1,
				    quantity;
				var query = 'DELETE FROM FeedAndCareDetails WHERE id = ?';
				deleteTable(query);

				if (json.care_and_feed.feed_time) {
					item1 = json.care_and_feed.feed_time;
				} else {
					item1 = '12:00';
				}

				if (json.care_and_feed.unit) {
					quantity = json.care_and_feed.quantity + ' ' + json.care_and_feed.unit;
				} else {
					quantity = '';
				}

				array.push(json.care_and_feed.id);
				array.push(item1);
				array.push(json.care_and_feed.horse.official_name);
				array.push(json.care_and_feed.feed_act);
				array.push(quantity);
				array.push(json.care_and_feed.location);
				item3 = array[3] + '\n' + quantity + '\n' + array[5];

				var query = 'INSERT INTO FeedAndCareDetails (id, time, horseName, feed_act, quantity, location) VALUES (?, ?, ?, ?, ?, ?)';
				insertTable(query, array);
			} else if (_title === 'Training') {
				var query = 'DELETE FROM TrainingDetails WHERE id = ?';
				deleteTable(query);
				var workload,
				    performance;
				if (json.training_detail.work_load_atp) {
					workload = json.training_detail.work_load;
				} else {
					workload = json.training_detail.work_load_adj;
				}

				if (json.training_detail.target_p_atp) {
					performance = json.training_detail.target_p;
				} else {
					performance = json.training_detail.target_p_adj;
				}

				array.push(json.training_detail.id);
				array.push(json.training_detail.scheduled_time_str);
				array.push(json.training_detail.training.horse.official_name);
				array.push(json.training_detail.location);
				array.push(json.training_detail.training.training_type);
				array.push(json.training_detail.discipline);
				array.push(workload);
				array.push(json.training_detail.work_load_unit);
				array.push(performance);
				array.push(json.training_detail.target_p_unit);
				array.push(json.training_detail.instruction);
				item3 = array[3] + '\n' + 'Type : ' + array[4] + '\n' + 'Discipline : ' + array[5] + '\n' + 'Workload : ' + workload + ' ' + array[7] + '\n' + 'Performance : ' + performance + ' ' + array[9] + '\n' + 'Instructions :' + '\n' + array[10];

				var query = 'INSERT INTO TrainingDetails (id, time, horseName, location, training_type, discipline, workload, workload_unit, performance, performance_unit, instruction) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
				insertTable(query, array);
			} else if (_title === 'Health') {
				var query = 'DELETE FROM HealthDetails WHERE id = ?';
				deleteTable(query);
				var schedule;
				if (json.health_and_care.schedule) {
					schedule = json.health_and_care.schedule;
				} else {
					schedule = '';
				}

				array.push(json.health_and_care.id);
				array.push(json.health_and_care.time);
				array.push(json.health_and_care.horse.official_name);
				array.push(json.health_and_care.location);
				array.push(json.health_and_care.therapy_treatment);
				array.push(schedule);
				item3 = array[3] + '\n' + array[4] + '\n' + schedule;

				var query = 'INSERT INTO HealthDetails (id, time, horseName, location, therapy_treatment, schedule) VALUES (?, ?, ?, ?, ?, ?)';
				insertTable(query, array);
			}

			time.text = array[1];
			horseName.text = array[2];
			values.text = item3;
			activityIndicator.hide();
		} else {
			var db = Titanium.Database.open('Horsecount');
			var Rows;
			try {
				if (_title === 'Feed & Care') {
					Rows = db.execute('SELECT * FROM FeedAndCareDetails WHERE id = ?', _id);
					if (Rows.isValidRow()) {
						time.text = Rows.fieldByName('time');
						horseName.text = Rows.fieldByName('horseName');
						var quantity = Rows.fieldByName('quantity');
						values.text = Rows.fieldByName('feed_act') + '\n' + quantity + '\n' + Rows.fieldByName('location');
					}
				} else if (_title === 'Training') {
					Rows = db.execute('SELECT * FROM TrainingDetails WHERE id = ?', _id);
					if (Rows.isValidRow()) {
						time.text = Rows.fieldByName('time');
						horseName.text = Rows.fieldByName('horseName');
						values.text = Rows.fieldByName('location') + '\n' + 'Type : ' + Rows.fieldByName('training_type') + '\n' + 'Discipline : ' + Rows.fieldByName('discipline') + '\n' + 'Workload : ' + Rows.fieldByName('workload') + ' ' + Rows.fieldByName('workload_unit') + '\n' + 'Performance : ' + Rows.fieldByName('performance') + ' ' + Rows.fieldByName('performance_unit') + '\n' + 'Instructions :' + '\n' + Rows.fieldByName('instruction');
					}
				} else if (_title === 'Health') {
					Rows = db.execute('SELECT * FROM HealthDetails WHERE id = ?', _id);
					if (Rows.isValidRow()) {
						time.text = Rows.fieldByName('time');
						horseName.text = Rows.fieldByName('horseName');
						values.text = Rows.fieldByName('location') + '\n' + Rows.fieldByName('therapy_treatment') + '\n' + Rows.fieldByName('schedule');
					}
				}

			} catch(e) {
				alert(e);
			} finally {
				Rows.close();
				db.close();
			}
		}
	}

	//Initially filling detail view from the database untill we get the json response
	var json = 0;
	Fill_With_Data(json);

	//Getting exact url for api calling with dynamic window title
	function getUrl(itemName, _id) {
		var SystemUrl = require('ui/handheld/system_urls');
		var system_url = new SystemUrl();
		var url;
		if (itemName === 'Feed & Care') {
			url = system_url.getId_url('/api/v1/care_and_feeds/', _id);
		} else if (itemName === 'Training') {
			url = system_url.getId_url('/api/v1/training_details/', _id);
		} else if (itemName === 'Health') {
			url = _url = system_url.getId_url('/api/v1/health_and_cares/', _id);
		}

		return url;
	}

	//API calling to get json data from server
	function httpClientRequest() {
		var API_Call = require('ui/apiCalling/call_with_indicator');
		new API_Call('GET', getUrl(_title, _id), null, activityIndicator, function(json) {
			Fill_With_Data(json);
		});
	}

	httpClientRequest();

	//Again api calling and update the details view data from the feedback call on training feedback window
	function updateByFeedback() {
		httpClientRequest();
	}

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

module.exports = menu2;
