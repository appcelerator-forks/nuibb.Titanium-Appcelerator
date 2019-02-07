function todoList(_title, _navigation, windowStack) {
	var isAndroid = Ti.Platform.osname === 'android';
	//To get application url's object
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();

	//Getting activity indicator object
	var Indicator = require('ui/common/activityIndicator');
	var activityIndicator = new Indicator('40%', '50%');

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
		Ti.App.fireEvent('ModuleHiding');
		win.close();
	}

	//Upper toolbar's views
	var upperToolView = require('ui/upperToolbar/excluding_right_btn');
	var toolView = new upperToolView(imagePath.todo, _title, _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', closeWindow);
	win.add(toolView);

	//Adding table view to the window
	var table = Ti.UI.createTableView({
		top : _dimentions.listViewTop,
		left : '5dp',
		right : '5dp',
		height : _dimentions.listViewHeight,
		borderRadius : 5
	});

	var checkedRows = [];
	//If checkbox in a row of table view is clicked
	table.addEventListener('click', function(e) {
		if (e.source.type === 'checkbox' && e.source.id && !e.source.done) {
			e.source.image = imagePath.tick;
			checkedRows.push(e.source.id);
		}
	});

	win.add(activityIndicator);
	win.add(table);

	//Deleting ToDoList table before re-insertion in database
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

	//For customization view in each table row with checkbox at the right
	function customViewRow(array) {
		var row = Ti.UI.createTableViewRow({
			backgroundColor : '#FFF',
			height : Ti.UI.SIZE
		});

		var time = Ti.UI.createLabel({
			text : array[1],
			font : {
				fontFamily : 'Arial',
				fontWeight : 'bold',
				fontSize : '15dp'
			},
			height : Ti.UI.SIZE,
			width : '40dp',
			left : '5dp',
			top : '2dp',
			color : '#000'
		});

		var View = Ti.UI.createView({
			//backgroundColor:'red',
			layout : 'vertical',
			height : Ti.UI.SIZE,
			width : '73%',
			left : '50dp',
			color : '#000'
		});

		var horseName = Ti.UI.createLabel({
			text : array[2],
			font : {
				fontFamily : 'Arial',
				fontWeight : 'bold',
				fontSize : '15dp'
			},
			height : '20dp',
			width : Ti.UI.FILL,
			left : '5dp',
			color : '#000',
			top : '2dp'
		});

		var values = Ti.UI.createLabel({
			text : array[3] + '\n' + array[4],
			font : {
				fontFamily : 'Arial',
				fontSize : '12dp'
			},
			height : Ti.UI.SIZE,
			width : Ti.UI.FILL,
			left : '5dp',
			color : '#000'
		});

		var checkBox = Ti.UI.createImageView({
			type : 'checkbox', // use this to know we clicked a checkbox
			id : array[0],
			done : true,
			width : '25dp',
			height : '25dp',
			top : '13dp',
			right : '6dp',
			borderWidth : 1,
			borderRadius : 5,
			borderColor : '#36A9E1',
			image : ''
		});

		View.add(horseName);
		View.add(values);

		row.selectedBackgroundColor = 'transparent';
		row.add(time);
		row.add(View);

		if (array[5]) {
			checkBox.image = imagePath.tick;
		} else {
			checkBox.done = false;
		}

		row.add(checkBox);
		row.className = 'ToDoList';
		return row;
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

	//Function of filling table view by either from database or json data
	function fill_With_Data(json) {
		if (json) {
			deleteTable('DELETE FROM ToDoList');
			table.setData([]);
			var j = json.length;
			if (!j) {
				alertMessage('Message!', 'There is no data in the server.');
			}

			var db = Titanium.Database.open('Horsecount');

			try {
				db.execute('BEGIN');
				for (var i = 0; i < j; i++) {
					if (json[i].to_do.task_id) {
						var array = [];

						array.push(json[i].to_do.task_id);

						if (json[i].to_do.time) {
							array.push(json[i].to_do.time);
						} else {
							array.push('06:00');
						}

						if (json[i].to_do.horse) {
							if (json[i].to_do.horse.alias_name) {
								array.push(json[i].to_do.horse.alias_name);
							} else {
								array.push(json[i].to_do.horse.official_name);
							}
						} else {
							array.push('No Horse');
						}

						array.push(json[i].to_do.activity);
						array.push(json[i].to_do.location);

						if (json[i].to_do.task_done !== null) {

							if (json[i].to_do.task_done) {
								array.push(1);
							} else {
								array.push(0);
							}
						} else {
							array.push(0);
						}

						var query = 'INSERT INTO ToDoList (task_id, time, horseName, activity, location, done) VALUES (?, ?, ?, ?, ?, ?)';
						db.execute(query, array);

						table.appendRow(customViewRow(array));
					}
				}
				db.execute('COMMIT');
			} catch(e) {
				alert(e);
			} finally {
				db.close();
			}
			activityIndicator.hide();
		} else {
			var db = Titanium.Database.open('Horsecount');
			var Rows;
			try {
				Rows = db.execute('SELECT * FROM ToDoList');
				while (Rows.isValidRow()) {
					var array = [];
					array.push(Rows.fieldByName('task_id'));
					array.push(Rows.fieldByName('time'));
					array.push(Rows.fieldByName('horseName'));
					array.push(Rows.fieldByName('activity'));
					array.push(Rows.fieldByName('location'));
					array.push(Rows.fieldByName('done'));

					table.appendRow(customViewRow(array));
					Rows.next();
				}
			} catch(e) {
				alert(e);
			} finally {
				Rows.close();
				db.close();
			}
		}
	}

	//Creating Database Table for To Do List
	function createDBTable() {
		var db = Titanium.Database.open('Horsecount');
		try {
			db.execute('BEGIN');
			db.execute('CREATE TABLE IF NOT EXISTS ToDoList (task_id INTEGER, time TEXT, horseName TEXT, activity TEXT, location TEXT, done INTEGER);');
			db.execute('COMMIT');
		} catch(e) {
			alert(e);
		} finally {
			db.close();
		}
	}

	//Calling the function to create database table for To Do List
	createDBTable();

	//Filling table view from the database untill we get the json response
	var json = 0;
	fill_With_Data(json);

	//API calling to get json data from server and updating database as well as replacing table view data by this json data
	var API_Call = require('ui/apiCalling/call_with_indicator');
	new API_Call('GET', system_url.getTDL_url(), null, activityIndicator, function(json) {
		fill_With_Data(json);
	});

	//After successful submission of submit button functionality
	function updateToDo() {
		alertMessage('Message', 'Todo list successfully updated.');
	}

	//iterate through the rows in the table view to find out which ones are selected
	function checkedRowsAre(_checkedRows) {
		var selected = '';
		for (var i = 0; i < _checkedRows.length; i++) {
			selected = selected + _checkedRows[i] + ', ';
		}
		return selected;
	}

	//Get feedback upon submit button click
	function submitToFeedback() {
		var selectedItems = checkedRowsAre(checkedRows);
		var _url = system_url.getTodoUpdate_url(selectedItems);
		if (selectedItems !== '') {
			var API_Call = require('ui/apiCalling/call_without_indicator');
			new API_Call('POST', system_url.getTodoUpdate_url(selectedItems), null, function(json) {
				updateToDo();
			});
		} else {
			alert('Check at least one item');
		}
	}

	//Bottom toolbar view & it's functionality
	var Feedback = require('ui/bottomToolbar/submit_to_feedback');
	var btmToolView = new Feedback('Submit', _dimentions.toolViewHeight, submitToFeedback);
	win.add(btmToolView);

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/withBtmToolbar');
	new OnOrientaionChange(toolView, btmToolView, table);

	//Event listener when window is close down
	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;
}

module.exports = todoList;
