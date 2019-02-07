function logBook(_navigation, windowStack) {
	var _authorName;
	var Window = require('ui/iPhone/navbar');
	var win = new Window('', 'vertical');

	win.addEventListener('open', function(e) {
		Ti.App.Properties.removeProperty("Filter_Data");
	});

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

	var textBox1 = Titanium.UI.createLabel({
		backgroundColor : '#fff',
		text : 'Date',
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
		height : '30dp'
	});

	var nextArrow1 = Ti.UI.createImageView({
		image : imagePath.nextArrow,
		height : '10dp',
		width : '10dp',
		right : '5dp'
	});

	textBox1.add(nextArrow1);

	textBox1.addEventListener('touchstart', function(e) {
		var LoadData = require('ui/training/calender1');
		var dataToLoad = new LoadData("Date", 0, windowStack, function(_date) {
			textBox1.text = _date;
			textBox1.color = '#36A9E1';
		});

		windowStack.push(dataToLoad);
		_navigation.openWindow(dataToLoad);
	});

	var textBox2 = Titanium.UI.createLabel({
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
		top : '5dp',
		left : '5dp',
		right : '5dp',
		height : '30dp'
	});

	var nextArrow2 = Ti.UI.createImageView({
		image : imagePath.nextArrow,
		height : '10dp',
		width : '10dp',
		right : '5dp'
	});

	textBox2.add(nextArrow2);

	textBox2.addEventListener('touchstart', function(e) {
		var LoadData = require('ui/logbook/horseList');
		var dataToLoad = new LoadData('edit', windowStack, function(_id, _horseName) {
			textBox2.id = _id;
			textBox2.text = _horseName;
			textBox2.color = '#36A9E1';
		});

		windowStack.push(dataToLoad);
		_navigation.openWindow(dataToLoad);
	});

	var textBox3 = Titanium.UI.createLabel({
		backgroundColor : '#fff',
		text : 'Subject',
		font : {
			fontFamily : 'Arial',
			fontSize : '14dp'
		},
		textAlign : 'center',
		borderWidth : 1,
		borderColor : '#000',
		borderRadius : 5,
		top : '5dp',
		left : '5dp',
		right : '5dp',
		height : '30dp'
	});

	var nextArrow3 = Ti.UI.createImageView({
		image : imagePath.nextArrow,
		height : '10dp',
		width : '10dp',
		right : '5dp'
	});

	textBox3.add(nextArrow3);

	textBox3.addEventListener('touchstart', function(e) {
		var LoadData = require('ui/logbook/logbook_details');
		var dataToLoad = new LoadData('editTab', 'Subject', windowStack, function(_subject) {
			textBox3.text = _subject;
			textBox3.color = '#36A9E1';
		});

		windowStack.push(dataToLoad);
		_navigation.openWindow(dataToLoad);
	});

	var textBox4 = Titanium.UI.createLabel({
		id : '',
		backgroundColor : '#fff',
		text : 'Author',
		font : {
			fontFamily : 'Arial',
			fontSize : '14dp'
		},
		textAlign : 'center',
		borderWidth : 1,
		borderColor : '#000',
		borderRadius : 5,
		top : '5dp',
		left : '5dp',
		right : '5dp',
		height : '30dp'
	});

	var nextArrow4 = Ti.UI.createImageView({
		image : imagePath.nextArrow,
		height : '10dp',
		width : '10dp',
		right : '5dp'
	});

	textBox4.add(nextArrow4);

	textBox4.addEventListener('touchstart', function(e) {
		var LoadData = require('ui/logbook/logbook_details');
		var dataToLoad = new LoadData('editTab', 'Author', windowStack, function(_id, _author) {
			textBox4.id = _id;
			textBox4.text = _author;
			textBox4.color = '#36A9E1';
		});

		windowStack.push(dataToLoad);
		_navigation.openWindow(dataToLoad);
	});

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
		height : '30dp'
	});

	var nextArrow5 = Ti.UI.createImageView({
		image : imagePath.nextArrow,
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
			fontSize : '14dp'
		},
		textAlign : 'center',
		borderWidth : 1,
		borderColor : '#000',
		borderRadius : 5,
		top : '5dp',
		left : '5dp',
		right : '5dp',
		height : '30dp'
	});

	var nextArrow6 = Ti.UI.createImageView({
		image : imagePath.nextArrow,
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
			fontSize : '14dp'
		},
		textAlign : 'center',
		borderWidth : 1,
		borderColor : '#000',
		borderRadius : 5,
		top : '5dp',
		left : '5dp',
		right : '5dp',
		height : '30dp'
	});

	var nextArrow7 = Ti.UI.createImageView({
		image : imagePath.nextArrow,
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

	win.add(textBox1);
	win.add(textBox2);
	win.add(textBox3);
	win.add(textBox4);

	//Submit button functionality for Edit/View tab
	function checkedRowsForEdit() {
		Ti.App.Properties.removeProperty("Filter_Data");
		var param = {};
		var filter_data = ['', '', '', ''];

		if (textBox1.text !== 'Date') {
			param.log_date = textBox1.text;
			filter_data[0] = textBox1.text;
		}

		if (textBox2.id !== '') {
			param.horse_id = textBox2.id;
			filter_data[1] = textBox2.id;
		}

		if (textBox3.text !== 'Subject') {
			param.subject = textBox3.text;
			filter_data[2] = textBox3.text;
		}

		if (textBox4.id !== '') {
			param.author_id = textBox4.id;
			filter_data[3] = textBox4.id;
		}

		Ti.App.Properties.setList("Filter_Data", filter_data);

		return param;
	}

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

	//Bottom Toolbar
	var flexSpace = Ti.UI.createButton({
		systemButton : Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});

	// Button search for Edit/View tab bar
	var btnSearch = Titanium.UI.createImageView({
		image : "Search@2x.png",
		height : '20dp',
		width : '20dp'
	});

	btnSearch.addEventListener('click', function(e) {
		var param = checkedRowsForEdit();
		var JsonData = require('ui/logbook/listView_logbook');
		var data = new JsonData(_navigation, windowStack, tabBar.index, param);
		windowStack.push(data);
		_navigation.openWindow(data);
	});

	win.setToolbar([flexSpace, btnSearch, flexSpace], {
		bottom : 0,
		animated : false,
		translucent : true,
		barColor : '#C7EAFB',
		tintColor : '#27AAE1'
	});

	//Button Submit for Add tab bar
	var btnSubmit = Titanium.UI.createButton({
		title : "Submit"
	});

	btnSubmit.addEventListener('click', function(e) {
		var param = checkedRowsForAdd();
		if (param.subject && param.writeItem) {
			var JsonData = require('ui/logbook/listView_logbook');
			var data = new JsonData(_navigation, windowStack, tabBar.index, param);
			windowStack.push(data);
			_navigation.openWindow(data);
		} else {
			var alertDialog = Titanium.UI.createAlertDialog({
				title : 'WARNING!',
				message : "You must select Subject and Write logbook item.",
				buttonNames : ['OK']
			});
			alertDialog.show();
		}
	});

	tabBar.addEventListener('click', function(e) {
		//Layout for Add
		if (e.index) {
			win.setToolbar(null, {});
			win.remove(textBox1);
			win.remove(textBox2);
			win.remove(textBox3);
			win.remove(textBox4);

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
			win.setToolbar(null, {});
			win.remove(textBox5);
			win.remove(textBox6);
			win.remove(textBox7);

			win.add(textBox1);
			win.add(textBox2);
			win.add(textBox3);
			win.add(textBox4);

			win.setToolbar([flexSpace, btnSearch, flexSpace], {
				bottom : 0,
				animated : false,
				translucent : true,
				barColor : '#C7EAFB',
				tintColor : '#27AAE1'
			});

		}
	});

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/only_upper_toolbar');
	new OnOrientaionChange(toolbar);

	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;

}

module.exports = logBook;
