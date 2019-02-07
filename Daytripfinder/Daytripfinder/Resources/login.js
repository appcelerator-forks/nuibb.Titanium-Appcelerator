var osName = Titanium.Platform.osname;

loginWindow = Titanium.UI.currentWindow;
currentTab = Titanium.UI.currentTab;
loginWindow.setBackgroundColor('#77AB15');

loginWindow.addEventListener('open', function(e) {
	if (Ti.App.Properties.getString('token') != '') {
		var homeWindow = Titanium.UI.createWindow({
			title : '',
			url : 'home.js',
			tabBarHidden : true,
			navBarHidden : true,
			backgroundColor : '#FFF',
			fullscreen : false,
			exitOnClose : true
		});
		homeWindow.open();
	}
});

var authenticationView, emailTextField, passwordTextField, emailLabel, passwordLabel, loginButton, messageLabel;
var loginFieldHeight, loginFontSize, authenticationViewHeight, loginButtonTop, loginButtonHeight, loginButtonWidth, messageLabelTop;

if (Ti.Android && Ti.Platform.displayCaps.platformHeight > 640) {
	loginFieldHeight = 70;
	loginFontSize = 18;
	
	authenticationViewHeight = 150;
	loginButtonHeight = 50;
	loginButtonWidth = 110;
	
	loginButtonTop = 170;	
	messageLabelTop = 230;	
} else {
	loginFieldHeight = 50;
	loginFontSize = 16;	
	
	authenticationViewHeight = 110;
	loginButtonHeight = 35;
	loginButtonWidth = 80;
	
	loginButtonTop = 135;
	messageLabelTop = 185;
	
}

if (Ti.Android) {
	authenticationView = Titanium.UI.createView({
		backgroundColor : '#FFF',
		color : '#000000',
		top : 10,
		left : 20,
		right : 20,
		width : 'auto',
		height : authenticationViewHeight,
		borderRadius : 10,
		borderWidth : 1,
		borderColor : '#EEE'
	});

	emailLabel = Titanium.UI.createLabel({
		text : "email",
		height : loginFieldHeight - 5,
		width : 100,
		top : 8,
		left : 10,
		color : "#000",
		textAlign : "left",
		font : {
			fontSize : loginFontSize,
			fontWeight : 'bold',
			fontFamily : 'verdana'
		}
	});

	passwordLabel = Titanium.UI.createLabel({
		text : "password",
		height : loginFieldHeight - 5,
		width : 100,
		top : loginFieldHeight + 8,
		left : 10,
		color : "#000",
		textAlign : "left",
		font : {
			fontSize : loginFontSize,
			fontWeight : 'bold',
			fontFamily : 'verdana'
		}
	});

	emailTextField = Ti.UI.createTextField({
		color : '#000000',
		height : loginFieldHeight,
		top : 5,
		left : 100,
		right : 5,
		hintText : 'Your email address',
		keyboardType : Ti.UI.KEYBOARD_EMAIL,
		returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
		softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS,
		borderColor : 'none',
		backgroundColor : 'transparent',
		font : {
			fontSize : loginFontSize,
			fontFamily : 'verdana'
		}
	});

	passwordTextField = Ti.UI.createTextField({
		color : '#000000',
		height : loginFieldHeight,
		top : loginFieldHeight + 10,
		left : 100,
		right : 5,
		hintText : 'Your password',
		passwordMask : true,
		keyboardType : Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
		softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS,
		backgroundColor : 'transparent',
		font : {
			fontSize : loginFontSize,
			fontFamily : 'verdana'
		}
	});

	loginButton = Titanium.UI.createButton({
		backgroundColor : '#FFF',
		color : '#000',
		title : 'Log In',
		font : {
			fontSize : 16,
			fontWeight : 'bold',
			fontColor : '#000'
		},
		textAlign : 'center',
		top : loginButtonTop,
		height : loginButtonHeight,
		width : loginButtonWidth,
		borderRadius : 10,
		backgroundImage : 'none'
	});

	messageLabel = Ti.UI.createLabel({
		color : '#000',
		font : {
			fontSize : 16
		},
		height : 25,
		width : 'auto',
		top : messageLabelTop,
		textAlign : 'center'
	});
} else {
	authenticationView = Titanium.UI.createView({
		backgroundColor : '#FFF',
		color : '#000000',
		top : 10,
		left : 20,
		right : 20,
		width : 'auto',
		height : 75,
		borderRadius : 10,
		borderWidth : 1,
		borderColor : '#EEE'
	});

	emailLabel = Titanium.UI.createLabel({
		text : "email",
		height : 20,
		width : 100,
		top : 10,
		left : 5,
		color : "#000",
		textAlign : "left",
		font : {
			fontSize : 14,
			fontWeight : 'bold'
		}
	});

	passwordLabel = Titanium.UI.createLabel({
		text : "password",
		height : 20,
		width : 100,
		top : 40,
		left : 5,
		color : "#000",
		textAlign : "left",
		font : {
			fontSize : 14,
			fontWeight : 'bold'
		}
	});

	emailTextField = Ti.UI.createTextField({
		height : 20,
		top : 10,
		left : 100,
		right : 5,
		hintText : 'Your email address',
		keyboardType : Titanium.UI.KEYBOARD_EMAIL,
		returnKeyType : Ti.UI.RETURNKEY_DEFAULT
	});

	passwordTextField = Ti.UI.createTextField({
		height : 20,
		top : 40,
		left : 100,
		right : 5,
		hintText : 'Your password',
		passwordMask : true,
		keyboardType : Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType : Ti.UI.RETURNKEY_DEFAULT
	});

	loginButton = Titanium.UI.createButton({
		backgroundColor : '#FFF',
		color : '#000',
		title : 'Log In',
		font : {
			fontSize : 16,
			fontWeight : 'bold',
			fontColor : '#000'
		},
		textAlign : 'center',
		top : 110,
		height : 35,
		width : 80,
		borderRadius : 10,
		backgroundImage : 'none'
	});

	messageLabel = Ti.UI.createLabel({
		color : '#000',
		font : {
			fontSize : 16
		},
		height : 25,
		width : 'auto',
		top : 160,
		textAlign : 'center'
	});
}

var mainTabWindow = Ti.UI.createWindow({
	title : '',
	url : 'mainTabs.js',
	fullscreen : false
});

function renderXML() {
	var doc = this.responseXML.documentElement;
	var success = doc.getElementsByTagName("success").item(0).text;
	if (success == 1) {
		Ti.App.Properties.setString('token', doc.getElementsByTagName("persistence-token").item(0).text);
		messageLabel.setText('');

		loginWindow.persistenceToken = doc.getElementsByTagName("persistence-token").item(0).text;
		mainTabWindow.persistenceToken = doc.getElementsByTagName("persistence-token").item(0).text;

		if (loginWindow.notice) {
			var offerDetailsWindow = Titanium.UI.createWindow({
				title : 'daytripfinder.co.uk',
				url : 'offerDetails.js',
				tabBarHidden : true,
				fullscreen : false
			});

			offerDetailsWindow.offer = loginWindow.offer;
			offerDetailsWindow.attraction = loginWindow.attraction;
			offerDetailsWindow.persistenceToken = loginWindow.persistenceToken;

			if (Ti.Android) {
				offerDetailsWindow.open();
			} else {
				currentTab.open(offerDetailsWindow);
			}
		} else {
			if (Ti.Android) {
				mainTabWindow.open();
			} else {
				currentTab.open(mainTabWindow);
			}
		}
	} else {
		messageLabel.setText('Invalid username/password');
	}
	Titanium.API.info('success', success);
}

function errorMessage() {
	messageLabel.setText('Could not log in, please try again later');
	Titanium.API.log('failed', 'could not load xml file');
}

loginButton.addEventListener('click', function(e) {
	var params = "<user_session><email>" + emailTextField.getValue() + "</email><password>" + passwordTextField.getValue() + "</password></user_session>";
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = renderXML;
	xhr.onerror = errorMessage;
	xhr.open('POST', 'http://www.daytripfinder.co.uk/user_session.xml');
	xhr.setRequestHeader("Content-type", "application/xml; charset=utf-8");
	xhr.send(params);
});

emailTextField.addEventListener('return', function(e) {
	emailTextField.blur();
});

passwordTextField.addEventListener('return', function(e) {
	passwordTextField.blur();
});

authenticationView.add(emailLabel);
authenticationView.add(passwordLabel);
authenticationView.add(emailTextField);
authenticationView.add(passwordTextField);

loginWindow.add(authenticationView);
loginWindow.add(loginButton);
loginWindow.add(messageLabel);

if (loginWindow.notice) {
	messageLabel.setText(loginWindow.notice);
}

var homeWindow = Titanium.UI.createWindow({
	title : '',
	url : 'home.js',
	tabBarHidden : true,
	navBarHidden : true,
	backgroundColor : '#FFF',
	fullscreen : false,
	exitOnClose : true
});

if (osName === 'iphone' || osName === 'ipad') {
	loginWindow.showNavBar();
	loginWindow.backButtonTitle = 'back';
} else if (osName === 'android') {

	var activity = loginWindow.activity;

	activity.onCreateOptionsMenu = function(e) {
		var menu = e.menu;
		var menuItem = menu.add({
			title : "Home",
			showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
		});
		menuItem.addEventListener("click", function(e) {
			homeWindow.persistenceToken = loginWindow.persistenceToken;
			homeWindow.open();
		});
	};
}

