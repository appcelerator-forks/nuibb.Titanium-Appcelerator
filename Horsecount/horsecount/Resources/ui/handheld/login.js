function LoginWindow(windowStack) {
	var isAndroid = Ti.Platform.osname === 'android';

	//Get activity indicator object
	var Indicator = require('ui/common/activityIndicator');
	var activityIndicator = new Indicator('40%', '2%');

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

	//Create window object
	var win,
	    navigation;
	if (isAndroid) {
		var Window = require('ui/android/actionbar_login');
		win = new Window(imagePath);
	} else {
		var Window = require('ui/iPhone/navbar_login');
		win = new Window(imagePath);
		navigation = Ti.UI.iOS.createNavigationWindow({
			window : win
		});
	}

	//Add scrollview as container of other views
	var scrollView = Ti.UI.createScrollView({
		//backgroundColor: 'green',
		layout : 'vertical',
		contentWidth : Ti.UI.SIZE,
		contentHeight : Ti.UI.SIZE,
		showVerticalScrollIndicator : true,
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		top : '0dp'
	});

	//Upper label
	var HomeTitleLabel1 = Ti.UI.createLabel({
		//backgroundColor: 'green',
		color : '#FFF',
		text : 'Welcome to Horsecount',
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : '18dp'
		},
		textAlign : 'center',
		top : '20dp',
		height : Ti.UI.SIZE,
		width : '250dp'
	});

	//username textfield
	var username = Titanium.UI.createTextField({
		color : '#336699',
		value : '',
		top : '20dp',
		height : Ti.UI.SIZE,
		width : '250dp',
		hintText : 'Username',
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : '14dp'
		},
		keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});

	//password textfield
	var password = Titanium.UI.createTextField({
		color : '#336699',
		value : '',
		top : '10dp',
		height : Ti.UI.SIZE,
		width : '250dp',
		hintText : 'Password',
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : '14dp'
		},
		passwordMask : true,
		keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});

	//Add checkbox to select "Remember me" option
	var checkbox;
	if (isAndroid) {
		username.setBackgroundColor('#FFF');
		password.setBackgroundColor('#FFF');

		username.addEventListener('focus', function f(e) {
			username.blur();
			username.removeEventListener('focus', f);
		});

		password.addEventListener('focus', function f(e) {
			password.blur();
			password.removeEventListener('focus', f);
		});

		/*checkbox = Ti.UI.createSwitch({
			color : '#FFF',
			top : '10dp',
			style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
			title : "Remember me",
			value : false
		});

		checkbox.addEventListener("change", function(e) {
			Ti.API.info("The checkbox has been set to " + e.value);

		});*/

	} else {
		/*var Check = require('ui/iPhone/checkBox');
		var iphoneCheckBox = new Check(25, 25, 5, 3, 20);

		checkbox = Titanium.UI.createView({
			layout : 'horizontal',
			top : '10dp',
			height : Ti.UI.SIZE,
			width : '250dp'
		});

		var Label = Titanium.UI.createLabel({
			color : '#fff',
			text : 'Remember me',
			font : {
				fontFamily : 'Arial',
				fontWeight : 'bold',
				fontSize : '16dp'
			},
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE
		});
		checkbox.add(Label);
		checkbox.add(iphoneCheckBox);*/
	}

	//Large horse icon in the login window
	var HomeImg = Titanium.UI.createImageView({
		//backgroundColor: 'red',
		image : imagePath.icon_horse,
		height : '100dp',
		width : '100dp',
		top : '50dp'
	});

	scrollView.add(HomeTitleLabel1);
	scrollView.add(username);
	scrollView.add(password);
	//scrollView.add(checkbox);
	scrollView.add(HomeImg);
	scrollView.add(activityIndicator);
	win.add(scrollView);

	//Show alert message function
	function alertMessage(_title, msg) {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : _title,
			message : msg,
			buttonNames : ['OK']
		});
		alertDialog.show();
	}

	//Callback function of login button
	function loginCallback() {//have to remove eventlistener for consecutive click
		if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
			alertMessage('WARNING!', 'Your device is not online.');
		} else {
			if (username.value !== "" && password.value !== "") {
				var param = {};
				param.username = username.value;
				param.password = password.value;
				var LoadData = require('ui/apiCalling/apiCallToLogin');
				new LoadData(param, activityIndicator, function(json) {
					if (json.auth_token !== '') {
						Ti.App.Properties.setString('Token', json.auth_token);
						Ti.App.Properties.setObject('Current_User_Data', json.user);
						
						//Open Main window
						var MainUI = require('ui/handheld/ApplicationWindow');
						var main_ui = new MainUI(navigation, windowStack, true);
						windowStack.push(main_ui);
						if (isAndroid) {
							main_ui.open();
						} else {
							navigation.openWindow(main_ui);
						}
					} else {
						alertMessage('WARNING!', json.error);
					}
				});
			} else {
				alertMessage('WARNING!', 'Username and Password must be filled');
			}
		}
	}

	//Bottom toolbar view & it's functionality
	var Feedback = require('ui/bottomToolbar/submit_to_feedback');
	var btmToolView = new Feedback('Login', _dimentions.toolViewHeight, loginCallback);
	win.add(btmToolView);

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/only_upper_toolbar');
	new OnOrientaionChange(btmToolView);

	//Event listener when window is close down
	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	//Return window/navigation object
	if (isAndroid) {
		return win;
	} else {
		return navigation;
	}
};

module.exports = LoginWindow;

