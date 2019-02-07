function logBook(windowStack) {
	var _authorName,
	    tabIndex = 'edit';

	//Getting activity indicator object
	var Indicator = require('ui/common/activityIndicator');
	var activityIndicator = new Indicator('40%', '50%');

	var Window = require('ui/android/actionbar');
	var win = new Window('', 'composite');

	win.addEventListener('open', function(e) {
		Ti.App.Properties.removeProperty("Filter_Data");
	});

	//Get Images path object
	var ImagesObject = require('ui/android/imagesPath');
	var imagePath = new ImagesObject();

	//Dimension object
	var Dimentions = require('dimension/withBtmToolbar');
	var _dimentions = new Dimentions();

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

	//Window's properties'
	var textBox1 = Titanium.UI.createView({
		backgroundColor : '#fff',
		borderWidth : 1,
		borderColor : '#000',
		borderRadius : 5,
		top : '10dp',
		left : '5dp',
		right : '5dp',
		height : '35dp'
	});

	var Label1 = Titanium.UI.createLabel({
		color : '#000',
		text : 'Date',
		font : {
			fontFamily : 'Arial',
			fontSize : '15dp'
		},
		textAlign : 'center',
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE
	});

	var nextArrow1 = Ti.UI.createImageView({
		image : imagePath.nextArrow,
		height : '15dp',
		width : '15dp',
		right : '5dp'
	});

	textBox1.add(Label1);
	textBox1.add(nextArrow1);

	textBox1.addEventListener('touchstart', function(e) {
		var LoadData = require('ui/training/calender1');
		var dataToLoad = new LoadData('Date', 0, windowStack, function(_date) {
			textBox1.children[0].text = _date;
			textBox1.children[0].color = '#36A9E1';
		});

		windowStack.push(dataToLoad);
		dataToLoad.open();
	});

	var textBox2 = Titanium.UI.createView({
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

	var Label2 = Titanium.UI.createLabel({
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

	var nextArrow2 = Ti.UI.createImageView({
		image : imagePath.nextArrow,
		height : '15dp',
		width : '15dp',
		right : '5dp'
	});

	textBox2.add(Label2);
	textBox2.add(nextArrow2);

	textBox2.addEventListener('touchstart', function(e) {
		var LoadData = require('ui/logbook/horseList_android');
		var dataToLoad = new LoadData('edit', windowStack, function(_id, _horseName) {
			textBox2.id = _id;
			textBox2.children[0].text = _horseName;
			textBox2.children[0].color = '#36A9E1';
		});

		windowStack.push(dataToLoad);
		dataToLoad.open();
	});

	var textBox3 = Titanium.UI.createView({
		backgroundColor : '#fff',
		borderWidth : 1,
		borderColor : '#000',
		borderRadius : 5,
		top : '10dp',
		left : '5dp',
		right : '5dp',
		height : '35dp'
	});

	var Label3 = Titanium.UI.createLabel({
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

	var nextArrow3 = Ti.UI.createImageView({
		image : imagePath.nextArrow,
		height : '15dp',
		width : '15dp',
		right : '5dp'
	});

	textBox3.add(Label3);
	textBox3.add(nextArrow3);

	textBox3.addEventListener('touchstart', function(e) {
		var LoadData = require('ui/logbook/logbook_details');
		var dataToLoad = new LoadData('editTab', 'Subject', windowStack, function(_subject) {
			textBox3.children[0].text = _subject;
			textBox3.children[0].color = '#36A9E1';
		});

		windowStack.push(dataToLoad);
		dataToLoad.open();
	});

	var textBox4 = Titanium.UI.createView({
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

	var Label4 = Titanium.UI.createLabel({
		color : '#000',
		text : 'Author',
		font : {
			fontFamily : 'Arial',
			fontSize : '15dp'
		},
		textAlign : 'center',
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE
	});

	var nextArrow4 = Ti.UI.createImageView({
		image : imagePath.nextArrow,
		height : '15dp',
		width : '15dp',
		right : '5dp'
	});

	textBox4.add(Label4);
	textBox4.add(nextArrow4);

	textBox4.addEventListener('touchstart', function(e) {
		var LoadData = require('ui/logbook/logbook_details');
		var dataToLoad = new LoadData('editTab', 'Author', windowStack, function(_id, _author) {
			textBox4.id = _id;
			textBox4.children[0].text = _author;
			textBox4.children[0].color = '#36A9E1';
		});

		windowStack.push(dataToLoad);
		dataToLoad.open();
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
		image : imagePath.nextArrow,
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
		image : imagePath.nextArrow,
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
		image : imagePath.nextArrow,
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

	//Using text fields holder for composite layout to set bottom bar at the bottom window
	var textFieldHolder = Titanium.UI.createView({
		//backgroundColor:'red',
		layout : 'vertical',
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		top : _dimentions.listViewTop
	});

	//Initial text boxes after toolbar
	textFieldHolder.add(textBox1);
	textFieldHolder.add(textBox2);
	textFieldHolder.add(textBox3);
	textFieldHolder.add(textBox4);
	win.add(textFieldHolder);

	//Submit button functionality for Edit/View tab
	function checkedRowsForEdit() {
		Ti.App.Properties.removeProperty("Filter_Data");
		var param = {};
		var filter_data = ['', '', '', ''];

		if (Label1.text !== 'Date') {
			param.log_date = Label1.text;
			filter_data[0] = Label1.text;
		}

		if (textBox2.id !== '') {
			param.horse_id = textBox2.id;
			filter_data[1] = textBox2.id;
		}

		if (Label3.text !== 'Subject') {
			param.subject = Label3.text;
			filter_data[2] = Label3.text;
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

		if (Label6.text !== 'Subject') {
			param.subject = Label6.text;
		}

		if (Label7.text !== 'Write logbook item') {
			param.writeItem = Label7.text;
		}

		return param;
	}

	//Bottom Toolbar (Search icon) for Edit/View tab
	var btnSearch = Titanium.UI.createImageView({
		image : "/images/Search.png",
		height : '20dp',
		width : '20dp'
	});

	btnSearch.addEventListener('click', function(e) {
		var param = checkedRowsForEdit();
		var JsonData = require('ui/logbook/listview_logbook_android');
		var dataToLoad = new JsonData(windowStack, 0, param);
		windowStack.push(dataToLoad);
		dataToLoad.open();
	});

	//Bottom Toolbar (Submit Button) for Add tab
	var btnSubmit = Titanium.UI.createButton({
		backgroundColor : '#C7EAFB',
		color : '#27AAE1',
		title : "Submit"
	});

	btnSubmit.addEventListener('click', function(e) {
		var param = checkedRowsForAdd();
		if (param.subject && param.writeItem) {
			var JsonData = require('ui/logbook/listview_logbook_android');
			var dataToLoad = new JsonData(windowStack, 1, param);
			windowStack.push(dataToLoad);
			dataToLoad.open();
		} else {
			var alertDialog = Titanium.UI.createAlertDialog({
				title : 'WARNING!',
				message : "You must select Subject and Write logbook item.",
				buttonNames : ['OK']
			});
			alertDialog.show();
		}
	});

	var btmToolview = Ti.UI.createView({
		backgroundColor : '#C7EAFB',
		tintColor : '#27AAE1',
		bottom : '0dp',
		width : Ti.UI.FILL,
		height : _dimentions.toolViewHeight
	});

	btmToolview.add(btnSearch);
	win.add(btmToolview);

	//Edit/View or Add tab's event listener'
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
			//Removing Submit button to search icon
			btmToolview.remove(btnSubmit);
			win.remove(btmToolview);

			textFieldHolder.add(textBox1);
			textFieldHolder.add(textBox2);
			textFieldHolder.add(textBox3);
			textFieldHolder.add(textBox4);
			win.add(textFieldHolder);
			//Adding Submit button
			btmToolview.add(btnSearch);
			win.add(btmToolview);
		}
	});

	addBtn.addEventListener('click', function(e) {
		if (tabIndex === 'edit') {
			tabIndex = 'add';
			addBtn.setBackgroundColor('#336699');
			addBtn.setColor('#FFF');
			editBtn.setBackgroundColor('#C7EAFB');
			editBtn.setColor('#336699');

			textFieldHolder.remove(textBox1);
			textFieldHolder.remove(textBox2);
			textFieldHolder.remove(textBox3);
			textFieldHolder.remove(textBox4);
			win.remove(textFieldHolder);
			//Removing search icon to Submit button
			btmToolview.remove(btnSearch);
			win.remove(btmToolview);

			textFieldHolder.add(textBox5);
			textFieldHolder.add(textBox6);
			textFieldHolder.add(textBox7);
			win.add(textFieldHolder);
			//Adding Submit button
			btmToolview.add(btnSubmit);
			win.add(btmToolview);
		}
	});

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/withBtmToolbar');
	new OnOrientaionChange(toolView, btmToolview, textFieldHolder);

	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;
}

module.exports = logBook;
