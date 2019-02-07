function logBook(_navigation, windowStack, _index, _param) {
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();
	var API_Call = require('ui/apiCalling/call_without_indicator');
	var _authorName;

	var Window = require('ui/iPhone/navbar');
	var win = new Window('', 'vertical');

	//Getting activity indicator object
	var Indicator = require('ui/common/activityIndicator');
	var activityIndicator = new Indicator('40%', '50%');

	//Get Images path object
	var ImagesObject = require('ui/iPhone/imagesPath');
	var imagePath = new ImagesObject();

	var tabBar = Titanium.UI.iOS.createTabbedBar({
		labels : ['Edit/View', 'Add'],
		backgroundColor : '#336699',
		style : Titanium.UI.iPhone.SystemButtonStyle.BAR,
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		index : 0
	});

	//Back to the previous window while click on the back button of upper toolbar
	function closeWindow() {
		Ti.App.fireEvent('ModuleHiding');
		win.close();
	}

	var UpperToolBar = require('ui/upperToolbar/logbook_iPhone');
	var toolbar = new UpperToolBar(tabBar, closeWindow);
	win.add(toolbar);

	var textBox5 = Titanium.UI.createLabel({
		id : '',
		backgroundColor : '#fff',
		text : 'Horse Name',
		font : {
			fontFamily : 'Arial',
			fontSize : '14dp'
		},
		textAlign : 'center',
		borderWidth : 1,
		borderColor : '#000',
		borderRadius : 5,
		top : '10dp',
		left : '5dp',
		right : '5dp',

		height : 30
	});

	var nextArrow5 = Ti.UI.createImageView({
		image : Ti.Filesystem.resourcesDirectory + 'nextArrow@2x.png',
		height : '10dp',
		width : '10dp',
		right : '5dp'
	});

	textBox5.add(nextArrow5);

	textBox5.addEventListener('touchstart', function(e) {
		var LoadData = require('ui/logbook/horseList');
		var dataToLoad = new LoadData('add', windowStack, function(_id, _horseName) {
			textBox5.id = _id;
			textBox5.text = _horseName;
			textBox5.color = '#36A9E1';
		});

		windowStack.push(dataToLoad);
		_navigation.openWindow(dataToLoad);
	});

	var textBox6 = Titanium.UI.createLabel({
		backgroundColor : '#fff',
		text : 'Subject',
		font : {
			fontFamily : 'Arial',
			//fontWeight : 'bold',
			fontSize : '14dp'
		},
		textAlign : 'center',
		borderWidth : 1,
		borderColor : '#000',
		borderRadius : 5,
		top : '5dp',
		left : '5dp',
		right : '5dp',
		height : 30
	});

	var nextArrow6 = Ti.UI.createImageView({
		image : Ti.Filesystem.resourcesDirectory + 'nextArrow@2x.png', //NextBtn.png',
		height : '10dp',
		width : '10dp',
		right : '5dp'
	});

	textBox6.add(nextArrow6);

	textBox6.addEventListener('touchstart', function(e) {
		var LoadData = require('ui/logbook/logbook_details');
		var dataToLoad = new LoadData('addTab', 'Subject', windowStack, function(param) {
			textBox6.text = param.subject;
			if (param.author) {
				_authorName = param.author;
			}
			textBox6.color = '#36A9E1';
		});

		windowStack.push(dataToLoad);
		_navigation.openWindow(dataToLoad);
	});

	var textBox7 = Titanium.UI.createLabel({
		backgroundColor : '#fff',
		text : 'Write logbook item',
		font : {
			fontFamily : 'Arial',
			//fontWeight : 'bold',
			fontSize : '14dp'
		},
		textAlign : 'center',
		borderWidth : 1,
		borderColor : '#000',
		borderRadius : 5,
		top : '5dp',
		left : '5dp',
		right : '5dp',
		height : 30
	});

	var nextArrow7 = Ti.UI.createImageView({
		image : Ti.Filesystem.resourcesDirectory + 'nextArrow@2x.png', //NextBtn.png',
		height : '10dp',
		width : '10dp',
		right : '5dp'
	});

	textBox7.add(nextArrow7);

	textBox7.addEventListener('touchstart', function(e) {
		var param = {};
		param.text = e.source.text;
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
		var data = new JsonData('Write logbook item', param, windowStack, function(_notes) {
			textBox7.applyProperties({
				height : Ti.UI.SIZE
			});
			textBox7.text = _notes + '\n' + '\n';
			textBox7.color = '#36A9E1';
		});
		windowStack.push(data);
		_navigation.openWindow(data);
	});

	//Toolbar
	var flexSpace = Ti.UI.createButton({
		systemButton : Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});

	var btnSubmit = Titanium.UI.createButton({
		title : 'Submit'
	});

	function checkedRowsForAdd() {
		// iterate through the rows to find out which ones are selected
		var param = {};

		if (textBox5.id !== '') {
			param.horse_id = textBox5.id;
		}

		if (textBox6.text !== 'Subject') {
			param.subject = textBox6.text;
		}

		if (textBox7.text !== 'Write logbook item') {
			param.writeItem = textBox7.text;
		}

		return param;
	}


	btnSubmit.addEventListener('click', function(e) {
		if (tabBar.index) {
			var param = checkedRowsForAdd();
			if (param.subject && param.writeItem) {
				win.remove(textBox5);
				win.remove(textBox6);
				win.remove(textBox7);
				win.setToolbar(null, {});
				win.add(listView);
				detect_tab(tabBar.index, param);
				tabBar.index = 0;
			} else {
				var alertDialog = Titanium.UI.createAlertDialog({
					title : 'WARNING!',
					message : "You must select Subject and Write logbook item.",
					buttonNames : ['OK']
				});
				alertDialog.show();
			}
		}
	});

	// Listview
	var plainTemplate = {

		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'date',
			properties : {
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
				height : '25dp',
				width : Ti.UI.FILL,
				left : '10dp',
				top : '20dp'
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'subject',
			properties : {
				height : '25dp',
				width : Ti.UI.FILL,
				left : '10dp',
				top : '40dp'
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'userName',
			properties : {
				height : '25dp',
				width : Ti.UI.FILL,
				left : '10dp',
				top : '60dp'
			}
		}],
		properties : {
			height : Ti.UI.SIZE//'80dp'
		}
	};

	var listView = Ti.UI.createListView({
		// Maps the plainTemplate object to the 'plain' style name
		left : '5dp',
		right : '5dp',
		top : '1%',
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
		_navigation.openWindow(data);
	});

	var section = Ti.UI.createListSection();

	listView.add(activityIndicator);
	win.add(listView);

	tabBar.addEventListener('click', function(e) {
		//Layout for Add
		if (e.index) {
			win.remove(listView);
			win.add(textBox5);
			win.add(textBox6);
			win.add(textBox7);

			win.setToolbar([flexSpace, btnSubmit, flexSpace], {
				bottom : 0,
				animated : false,
				translucent : true,
				barColor : '#C7EAFB',
				tintColor : '#27AAE1'
			});

		} else {//Layout for Edit/View
			win.remove(textBox5);
			win.remove(textBox6);
			win.remove(textBox7);
			win.setToolbar(null, {});

			win.add(listView);
		}
	});

	function render_edit_Json(json) {
		var data = [];
		if (tabBar.index) {
			tabBar.index = 0;
		}

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
				render_add_Json();
			});
		} else {
			new API_Call('POST', system_url.getEdit_View_url(), _param, function(json) {
				render_edit_Json(json);
			});
		}
	}

	detect_tab(_index, _param);

	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;

}

module.exports = logBook;
