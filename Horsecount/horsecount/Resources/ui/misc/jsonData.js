function Json_Data(_title, _navigation, windowStack) {
	var isAndroid = Ti.Platform.osname === 'android';

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

	//Dynamically select icon path for the upper toolbar
	function selectIconPath() {
		if (_title === 'Feed & Care') {
			return imagePath.feed;
		} else if (_title === 'Training') {
			return imagePath.train;
		} else if (_title === 'Health') {
			return imagePath.health;
		} else if (_title === 'Gestation') {
			return imagePath.gestation;
		}
	}

	//Back to the previous window while click on the back button of upper toolbar
	function closeWindow() {
		Ti.App.fireEvent('ModuleHiding');
		win.close();
	}

	//Upper toolbar's views
	var upperToolView = require('ui/upperToolbar/excluding_right_btn');
	var toolView = new upperToolView(selectIconPath(), _title, _dimentions.toolViewHeight);
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

	//Listview template
	var Template = require('ui/template/template4');
	var plainTemplate = new Template();

	//Adding list view to the window and implementing it's eventlistener
	var listView = Ti.UI.createListView({
		left : '5dp',
		right : '5dp',
		top : '1%',
		height : _dimentions.listViewHeight,
		borderRadius : 5,
		templates : {
			'plain' : plainTemplate
		},
		defaultItemTemplate : 'plain',
		footerView : createCustomFooter()
	});

	listView.addEventListener('itemclick', function(e) {
		if (e.itemId) {
			var JsonData = require('ui/misc/json_details');
			if (_title === 'Feed & Care') {
				var data = new JsonData(_title, _navigation, e.itemId, windowStack);
				windowStack.push(data);
				if (isAndroid) {
					data.open();
				} else {
					_navigation.openWindow(data);
				}
			} else if (_title === 'Training') {
				var data = new JsonData(_title, _navigation, e.itemId, windowStack);
				windowStack.push(data);
				if (isAndroid) {
					data.open();
				} else {
					_navigation.openWindow(data);
				}
			} else if (_title === 'Health') {
				var data = new JsonData(_title, _navigation, e.itemId, windowStack);
				windowStack.push(data);
				if (isAndroid) {
					data.open();
				} else {
					_navigation.openWindow(data);
				}
			}
		}
	});

	win.add(listView);

	//Creating database table under window title consideration
	function createDBTables() {
		var db = Titanium.Database.open('Horsecount');
		try {
			db.execute('BEGIN');
			if (_title === 'Feed & Care') {
				db.execute('CREATE TABLE IF NOT EXISTS FeedAndCare(id INTEGER PRIMARY KEY, time TEXT, horseName TEXT, other TEXT, location TEXT);');
				db.execute('CREATE TABLE IF NOT EXISTS FeedAndCareDetails(id INTEGER PRIMARY KEY, time TEXT, horseName TEXT, feed_act TEXT, quantity TEXT, location TEXT);');
			} else if (_title === 'Training') {
				db.execute('CREATE TABLE IF NOT EXISTS Training(id INTEGER PRIMARY KEY, time TEXT, horseName TEXT, other TEXT, location TEXT);');
				db.execute('CREATE TABLE IF NOT EXISTS TrainingDetails(id INTEGER PRIMARY KEY, time TEXT, horseName TEXT, location TEXT, training_type TEXT, discipline TEXT, workload TEXT, workload_unit TEXT, performance TEXT, performance_unit TEXT, instruction TEXT );');
			} else if (_title === 'Health') {
				db.execute('CREATE TABLE IF NOT EXISTS Health(id INTEGER PRIMARY KEY, time TEXT, horseName TEXT, other TEXT, location TEXT);');
				db.execute('CREATE TABLE IF NOT EXISTS HealthDetails(id INTEGER PRIMARY KEY, time TEXT, horseName TEXT, location TEXT, therapy_treatment TEXT, schedule TEXT);');
			} else if (_title === 'Gestation') {
				db.execute('CREATE TABLE IF NOT EXISTS Gestation(id INTEGER PRIMARY KEY, time TEXT, horseName TEXT, other TEXT, location TEXT);');
			}
			db.execute('COMMIT');
		} catch(e) {
			alert(e);
		} finally {
			db.close();
		}
	}

	//Deleting db table before re-inserting data in database from json under window title consideration
	function deleteTable(query) {
		var db = Titanium.Database.open('Horsecount');
		try {
			db.execute('BEGIN');
			db.execute(query);
			db.execute('COMMIT');
		} catch(e) {
			alert(e);
		} finally {
			db.close();
		}
	}

	//alert dialogue
	function alertMessage(_title, msg) {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : _title,
			message : msg,
			buttonNames : ['OK']
		});
		alertDialog.show();
	}

	//Function of filling list view section by either from database or json data
	function fill_With_Data(json) {
		var _hasChild;
		if (json) {
			var data = [],
			    flag = 1;
			var j = json.length;
			if (!j) {
				alertMessage('Message!', 'There is no data in the server.');
			}

			if (_title === 'Feed & Care') {
				deleteTable('DELETE FROM FeedAndCare');
				deleteTable('DELETE FROM FeedAndCareDetails');
				_hasChild = Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE;
			} else if (_title === 'Training') {
				deleteTable('DELETE FROM Training');
				deleteTable('DELETE FROM TrainingDetails');
				_hasChild = Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE;
			} else if (_title === 'Health') {
				deleteTable('DELETE FROM Health');
				deleteTable('DELETE FROM HealthDetails');
				_hasChild = Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE;
			} else if (_title === 'Gestation') {
				deleteTable('DELETE FROM Gestation');
				_hasChild = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
			}

			var db = Titanium.Database.open('Horsecount');

			try {
				db.execute('BEGIN');

				for (var i = 0; i < j; i++) {
					var array = [];
					var item1,
					    item2,
					    item3,
					    item4,
					    item5;

					if (_title === 'Feed & Care') {
						array.push(json[i].care_and_feed.id);
						if (json[i].care_and_feed.feed_time) {
							array.push(json[i].care_and_feed.feed_time);
						} else {
							array.push('12:00');
						}
						array.push(json[i].care_and_feed.horse.official_name);
						array.push(json[i].care_and_feed.feed_act);
						array.push(json[i].care_and_feed.location);

						var query = 'INSERT INTO FeedAndCare (id, time, horseName, other, location) VALUES (?, ?, ?, ?, ?)';
						db.execute(query, array);
					} else if (_title === 'Training') {
						array.push(json[i].training_detail.id);
						if (json[i].training_detail.scheduled_time_str) {
							array.push(json[i].training_detail.scheduled_time_str);
						} else {
							array.push('12:00');
						}
						array.push(json[i].training_detail.training.horse.official_name);
						array.push(json[i].training_detail.training.training_type);
						array.push(json[i].training_detail.location);

						var query = 'INSERT INTO Training (id, time, horseName, other, location) VALUES (?, ?, ?, ?, ?)';
						db.execute(query, array);
					} else if (_title === 'Health') {
						array.push(json[i].health_and_care.id);
						item2 = json[i].health_and_care.time;
						if (json[i].health_and_care.time) {
							array.push(json[i].health_and_care.time);
						} else {
							array.push('12:00');
						}
						array.push(json[i].health_and_care.horse.official_name);
						array.push(json[i].health_and_care.therapy_treatment);
						array.push(json[i].health_and_care.location);

						var query = 'INSERT INTO Health (id, time, horseName, other, location) VALUES (?, ?, ?, ?, ?)';
						db.execute(query, array);
					} else if (_title === 'Gestation') {

						flag = 0;
						array.push(json[i].horse.id);
						array.push(json[i].horse.days_remaining);
						if (json[i].horse.alias_name.toString().trim() === "") {
							array.push(json[i].horse.official_name);
						} else {
							array.push(json[i].horse.alias_name);
						}
						array.push(json[i].horse.foal_date);
						array.push('');
						var query = 'INSERT INTO Gestation (id, time, horseName, other, location) VALUES (?, ?, ?, ?, ?)';
						db.execute(query, array);
					}

					if (flag) {
						data.push({
							one : {
								text : array[1]
							},
							two : {
								text : array[2]
							},
							three : {
								text : array[3]
							},
							four : {
								text : array[4]
							},
							// Sets the regular list data properties
							properties : {
								itemId : array[0],
								accessoryType : _hasChild
							}
						});

					}

				}
				db.execute('COMMIT');
			} catch(e) {
				alert(e);
			} finally {
				db.close();
			}

			if (flag === 0) {
				var db = Titanium.Database.open('Horsecount');
				var Rows;
				try {
					Rows = db.execute('SELECT * FROM Gestation ORDER BY time ASC');
					_hasChild = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
					while (Rows.isValidRow()) {
						data.push({
							one : {
								text : Rows.fieldByName('time')
							},
							two : {
								text : Rows.fieldByName('horseName')
							},
							three : {
								text : Rows.fieldByName('other')
							},
							four : {
								text : Rows.fieldByName('location')
							},
							// Sets the regular list data properties
							properties : {
								itemId : Rows.fieldByName('id'),
								accessoryType : _hasChild
							}
						});

						Rows.next();
					}
				} catch(e) {
					alert(e);
				} finally {
					Rows.close();
					db.close();
				}
			}

			var section = Ti.UI.createListSection({
				items : data
			});

			listView.sections = [section];
			activityIndicator.hide();

		} else {
			var db = Titanium.Database.open('Horsecount');
			try {
				var Rows,
				    data = [];

				if (_title === 'Feed & Care') {
					Rows = db.execute('SELECT * FROM FeedAndCare');
					_hasChild = Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE;
				} else if (_title === 'Training') {
					//db.execute('DELETE FROM Training');
					Rows = db.execute('SELECT * FROM Training');
					_hasChild = Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE;

				} else if (_title === 'Health') {
					//db.execute('DELETE FROM Training');
					Rows = db.execute('SELECT * FROM Health');
					_hasChild = Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE;
				} else if (_title === 'Gestation') {
					Rows = db.execute('SELECT * FROM Gestation ORDER BY time ASC');
					_hasChild = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
				}

				while (Rows.isValidRow()) {
					data.push({
						one : {
							text : Rows.fieldByName('time')
						},
						two : {
							text : Rows.fieldByName('horseName')
						},
						three : {
							text : Rows.fieldByName('other')
						},
						four : {
							text : Rows.fieldByName('location')
						},
						// Sets the regular list data properties
						properties : {
							itemId : Rows.fieldByName('id'),
							accessoryType : _hasChild
						}
					});

					Rows.next();
				}

			} catch(e) {
				alert(e);
			} finally {
				if (Rows) {
					Rows.close();
				}
				db.close();
			}

			var section = Ti.UI.createListSection({
				items : data
			});

			listView.sections = [section];
		}
	}

	//Calling the function to create database table for To Do List
	createDBTables();

	//Filling list view section from the database untill we get the json response
	var json = 0;
	fill_With_Data(json);

	//Getting exact url for api calling with dynamic window title
	function getUrl(itemName) {
		var SystemUrl = require('ui/handheld/system_urls');
		var system_url = new SystemUrl();
		var url;
		if (itemName === 'Feed & Care') {
			url = system_url.getCnF_url();
		} else if (itemName === 'Training') {
			url = system_url.getTraining_url();
		} else if (itemName === 'Health') {
			url = system_url.getHealth_url();
		} else if (itemName === 'Gestation') {
			url = system_url.getGestation_url();
		}

		return url;
	}

	//API calling to get json data from server and updating database as well as replacing list view section's data by this json data
	var API_Call = require('ui/apiCalling/call_with_indicator');
	new API_Call('GET', getUrl(_title), null, activityIndicator, function(json) {
		fill_With_Data(json);
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
};

module.exports = Json_Data;
