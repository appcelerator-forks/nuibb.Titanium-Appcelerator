function logBook(windowStack, _index, _param) {
	var _authorName,
	    tabIndex = 'edit';

	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();
	var API_Call = require('ui/apiCalling/call_without_indicator');

	//Getting activity indicator object
	var Indicator = require('ui/common/activityIndicator');
	var activityIndicator = new Indicator('40%', '50%');

	//Dimension object
	var Dimentions = require('dimension/withBtmToolbar');
	var _dimentions = new Dimentions();

	//Get Images path object
	var ImagesObject = require('ui/iPhone/imagesPath');
	var imagePath = new ImagesObject();

	//Window
	var Window = require('ui/android/actionbar');
	var win = new Window('', 'composite');

	//Upper Tool Bar Buttons
	var editBtn = Titanium.UI.createButton({
		backgroundColor : '#336699',
		color : '#FFF',
		title : 'Edit/View',
		borderWidth : 1,
		//borderRadius : 10,
		borderColor : '#336699',
		height : '30dp',
		width : '90dp',
		left : '5dp'
	});

	var addBtn = Titanium.UI.createButton({
		backgroundColor : '#C7EAFB',
		color : '#336699',
		title : 'Add',
		borderWidth : 1,
		//borderRadius : 10,
		borderColor : '#336699',
		height : '30dp',
		width : '90dp',
		left : '0dp'
	});

	//Back to the previous window while click on the back button of upper toolbar
	function closeWindow() {
		Ti.App.fireEvent('ModuleHiding');
		win.close();
	}

	var UpperToolBar = require('ui/upperToolbar/logbook_android');
	var toolView = new UpperToolBar(editBtn, addBtn, _dimentions.toolViewHeight, closeWindow);
	win.add(toolView);

	//Using text fields holder for composite layout to set bottom bar at the bottom window
	var textFieldHolder = Titanium.UI.createView({
		//backgroundColor:'red',
		layout : 'vertical',
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		top : _dimentions.toolViewHeight
	});

	var textBox5 = Titanium.UI.createView({
		id : '',
		backgroundColor : '#fff',
		borderWidth : 1,
		borderColor : '#000',
		borderRadius : 5,
		top : '10dp',
		left : '5dp',
		right : '5dp',
		height : '35dp'
	});

	var Label5 = Titanium.UI.createLabel({
		color : '#000',
		text : 'Horse Name',
		font : {
			fontFamily : 'Arial',
			fontSize : '15dp'
		},
		textAlign : 'center',
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE
	});

	var nextArrow5 = Ti.UI.createImageView({
		image : Ti.Filesystem.resourcesDirectory + '/images/nextArrow.png', //NextBtn.png',
		height : '15dp',
		width : '15dp',
		right : '5dp'
	});

	textBox5.add(Label5);
	textBox5.add(nextArrow5);

	textBox5.addEventListener('touchstart', function(e) {
		var LoadData = require('ui/logbook/horseList_android');
		var dataToLoad = new LoadData('add', windowStack, function(_id, _horseName) {
			textBox5.id = _id;
			textBox5.children[0].text = _horseName;
			textBox5.children[0].color = '#36A9E1';
		});

		windowStack.push(dataToLoad);
		dataToLoad.open();
	});

	var textBox6 = Titanium.UI.createView({
		backgroundColor : '#fff',
		borderWidth : 1,
		borderColor : '#000',
		borderRadius : 5,
		top : '10dp',
		left : '5dp',
		right : '5dp',
		height : '35dp'
	});

	var Label6 = Titanium.UI.createLabel({
		color : '#000',
		text : 'Subject',
		font : {
			fontFamily : 'Arial',
			fontSize : '15dp'
		},
		textAlign : 'center',
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE
	});

	var nextArrow6 = Ti.UI.createImageView({
		image : Ti.Filesystem.resourcesDirectory + '/images/nextArrow.png', //NextBtn.png',
		height : '15dp',
		width : '15dp',
		right : '5dp'
	});

	textBox6.add(Label6);
	textBox6.add(nextArrow6);

	textBox6.addEventListener('touchstart', function(e) {
		var LoadData = require('ui/logbook/logbook_details');
		var dataToLoad = new LoadData('addTab', 'Subject', windowStack, function(param) {
			textBox6.children[0].text = param.subject;
			if (param.author) {
				_authorName = param.author;
			}
			textBox6.children[0].color = '#36A9E1';
		});

		windowStack.push(dataToLoad);
		dataToLoad.open();
	});

	var textBox7 = Titanium.UI.createView({
		backgroundColor : '#fff',
		borderWidth : 1,
		borderColor : '#000',
		borderRadius : 5,
		top : '10dp',
		left : '5dp',
		right : '5dp',
		height : '35dp'
	});

	var Label7 = Titanium.UI.createLabel({
		color : '#000',
		text : 'Write logbook item',
		font : {
			fontFamily : 'Arial',
			fontSize : '15dp'
		},
		textAlign : 'center',
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE
	});

	var nextArrow7 = Ti.UI.createImageView({
		image : Ti.Filesystem.resourcesDirectory + '/images/nextArrow.png',
		height : '15dp',
		width : '15dp',
		right : '5dp'
	});

	textBox7.add(Label7);
	textBox7.add(nextArrow7);

	textBox7.addEventListener('touchstart', function(e) {
		var param = {};
		param.text = textBox7.children[0].text;
		if (textBox5.id !== '') {
			param.horseName = textBox5.text;
		}
		if (textBox6.text !== 'Subject') {
			param.subject = textBox6.text;
		}
		if (_authorName) {
			param.author = _authorName;
		}

		var JsonData = require('ui/logbook/writeLogbook');
		var dataToLoad = new JsonData('Write logbook item', param, windowStack, function(_notes) {
			textBox7.applyProperties({
				height : Ti.UI.SIZE
			});
			textBox7.children[0].text = _notes + '\n';
			textBox7.children[0].color = '#36A9E1';
		});
		windowStack.push(dataToLoad);
		dataToLoad.open();
	});

	function checkedRowsForAdd() {
		// iterate through the rows to find out which ones are selected
		var param = {};

		if (textBox5.id !== '') {
			param.horse_id = textBox5.id;
		}

		if (Label6.text !== 'Subject') {
			param.subject = Label6.text;
		}

		if (Label7.text !== 'Write logbook item') {
			param.writeItem = Label7.text;
		}

		return param;
	}

	// Listview
	var plainTemplate = {

		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'date',
			properties : {
				color : '#000',
				height : '25dp',
				width : Ti.UI.FILL,
				left : '10dp',
				top : '0dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold',
					fontSize : '14dp'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'horseName',
			properties : {
				color : '#000',
				height : '25dp',
				width : Ti.UI.FILL,
				left : '10dp',
				top : '20dp'
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'subject',
			properties : {
				color : '#000',
				height : '25dp',
				width : Ti.UI.FILL,
				left : '10dp',
				top : '40dp'
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'userName',
			properties : {
				color : '#000',
				height : '25dp',
				width : Ti.UI.FILL,
				left : '10dp',
				top : '60dp'
			}
		}],
		properties : {
			height : Ti.UI.SIZE,
			backgroundColor : '#FFF'
		}
	};

	var listView = Ti.UI.createListView({
		// Maps the plainTemplate object to the 'plain' style name
		left : '5dp',
		right : '5dp',
		top : _dimentions.listViewTop,
		bottom : '1%',
		borderRadius : 5,
		templates : {
			'plain' : plainTemplate
		},
		defaultItemTemplate : 'plain'
	});

	listView.addEventListener('itemclick', function(e) {
		var JsonData = require('ui/logbook/editLogbook');
		var data = new JsonData('Edit logbook item', e.itemId, windowStack);
		windowStack.push(data);
		data.open();
	});

	var section = Ti.UI.createListSection();

	listView.add(activityIndicator);
	win.add(listView);

	//Bottom Toolbar
	var btmToolview = Ti.UI.createView({
		backgroundColor : '#C7EAFB',
		tintColor : '#27AAE1',
		bottom : '0dp',
		width : Ti.UI.FILL,
		height : _dimentions.toolViewHeight
	});

	var btnSubmit = Titanium.UI.createButton({
		backgroundColor : '#C7EAFB',
		color : '#27AAE1',
		title : "Submit"
	});

	btnSubmit.addEventListener('click', function(e) {
		var param = checkedRowsForAdd();
		if (param.subject && param.writeItem) {
			tabIndex = 'edit';
			editBtn.setBackgroundColor('#336699');
			editBtn.setColor('#FFF');
			addBtn.setBackgroundColor('#C7EAFB');
			addBtn.setColor('#336699');

			textFieldHolder.remove(textBox5);
			textFieldHolder.remove(textBox6);
			textFieldHolder.remove(textBox7);
			win.remove(textFieldHolder);

			btmToolview.remove(btnSubmit);
			win.remove(btmToolview);

			win.add(listView);
			detect_tab(1, param);
		} else {
			var alertDialog = Titanium.UI.createAlertDialog({
				title : 'WARNING!',
				message : "You must select Subject and Write logbook item.",
				buttonNames : ['OK']
			});
			alertDialog.show();
		}
	});

	function render_edit_Json(json) {
		var data = [];

		if (listView.sectionCount) {
			listView.sections[0].setItems([]);
		}

		for (var i = json.length - 1; i >= 0; i--) {
			var item1 = '',
			    item2 = '',
			    item3 = '',
			    item4 = '';

			if (json[i].logbook_item.logbook_date) {
				item1 = json[i].logbook_item.logbook_date.toString().trim();
			}

			if (json[i].logbook_item.horse) {
				if (json[i].logbook_item.horse.official_name) {
					item2 = json[i].logbook_item.horse.official_name.toString().trim();
				}
			}

			if (json[i].logbook_item.subject) {
				item3 = json[i].logbook_item.subject.toString().trim();
			}

			if (json[i].logbook_item.user) {
				if (json[i].logbook_item.user.name) {
					item4 = json[i].logbook_item.user.name.toString().trim();
				}
			}

			data.push({
				date : {
					text : item1
				},
				horseName : {
					text : item2
				},
				subject : {
					text : item3
				},
				userName : {
					text : item4
				},
				// Sets the regular list data properties
				properties : {
					itemId : json[i].logbook_item.id,
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
				}
			});
		}

		section.setItems(data);

		listView.sections = [section];
	}

	//Submit button functionality for Add tab
	function render_add_Json() {
		var param = {};
		var _filterData = Ti.App.Properties.getList("Filter_Data");
		if (_filterData) {
			if (_filterData[0] !== '') {
				param.log_date = _filterData[0];
			}

			if (_filterData[1] !== '') {
				param.horse_id = _filterData[1];
			}

			if (_filterData[2] !== '') {
				param.subject = _filterData[2];
			}

			if (_filterData[3] !== '') {
				param.author_id = _filterData[3];
			}
		}

		new API_Call('POST', system_url.getEdit_View_url(), param, function(json) {
			render_edit_Json(json);
		});
	}

	function detect_tab(indexNumber, param) {
		if (indexNumber) {
			new API_Call('POST', system_url.getAdd_feedback_url(), param, function(json) {
				render_add_Json(json);
			});
		} else {
			new API_Call('POST', system_url.getEdit_View_url(), _param, function(json) {
				render_edit_Json(json);
			});
		}
	}

	detect_tab(_index, _param);

	//Edit/View or Add tab's event listener
	editBtn.addEventListener('click', function(e) {
		if (tabIndex === 'add') {
			tabIndex = 'edit';
			editBtn.setBackgroundColor('#336699');
			editBtn.setColor('#FFF');
			addBtn.setBackgroundColor('#C7EAFB');
			addBtn.setColor('#336699');

			textFieldHolder.remove(textBox5);
			textFieldHolder.remove(textBox6);
			textFieldHolder.remove(textBox7);
			win.remove(textFieldHolder);

			btmToolview.remove(btnSubmit);
			win.remove(btmToolview);

			win.add(listView);
		}
	});

	addBtn.addEventListener('click', function(e) {
		if (tabIndex === 'edit') {
			tabIndex = 'add';
			addBtn.setBackgroundColor('#336699');
			addBtn.setColor('#FFF');
			editBtn.setBackgroundColor('#C7EAFB');
			editBtn.setColor('#336699');

			win.remove(listView);
			textFieldHolder.add(textBox5);
			textFieldHolder.add(textBox6);
			textFieldHolder.add(textBox7);
			win.add(textFieldHolder);

			btmToolview.add(btnSubmit);
			win.add(btmToolview);
		}
	});

	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;

}

module.exports = logBook;
