var osName = Titanium.Platform.osname;
var homeWindow = Titanium.UI.currentWindow;
var homeTab = Titanium.UI.currentTab;
var signUpUrl = 'http://www.daytripfinder.co.uk/users/new?role_id=4';

homeWindow.addEventListener('android:back', function(e) {
	homeWindow.close();
});


var dayTripFinderButton, offerLabel, signUpButton, loginButton, logoutButton, messageLabel,img;
var dtfButtonHeight, dtfButtonFontSize;
var dtfButtonfontleft = 100, dtfButtonfontRight = 100;
var imageDirectory, dayTripFinderButtonTop, offerLabelTop, signUpButtonTop, loginButtonTop, messageLabelTop, messageLabelFontSize, messageLabelHeight;

if (Ti.Android && Ti.Platform.displayCaps.platformHeight > 640) {
	dtfButtonHeight = 60;
	dtfButtonFontSize = 30;
	
	imageDirectory = 'home-icon.jpg';
	iamgeHeight = 250;
	
	dayTripFinderButtonTop = 270;
	offerLabelTop = 330;
	signUpButtonTop = 440;
	loginButtonTop = 520;
	messageLabelTop = 590;
	
	messageLabelFontSize = 18;
	messageLabelHeight = 40;
} else {
	dtfButtonHeight = 40;	
	dtfButtonFontSize = 20;
	
	imageDirectory = 'home-icon2.png';
	iamgeHeight = 200;
	
	dayTripFinderButtonTop = 215; 
	offerLabelTop = 255;
	signUpButtonTop = 300;
	loginButtonTop = 350;
	messageLabelTop = 405;
	
	messageLabelFontSize = 12;
	messageLabelHeight = 30;
}

if(osName === 'iphone' || Ti.Platform.displayCaps.platformWidth < 480){
	dtfButtonfontleft = 50; 
	dtfButtonfontRight = 50;
}


img = Titanium.UI.createImageView({
	image : imageDirectory,
	height : iamgeHeight,
	width : 170,
	top : 5,
	bottom : 10
});

dayTripFinderButton = Titanium.UI.createButton({
	title : 'daytripfinder',
	backgroundColor : '#74B214',
	color : '#FFF',
	font : {
		fontSize : dtfButtonFontSize,
		fontWeight : 'bold',
		fontColor : '#FFF'
	},
	textAlign : 'center',
	top : dayTripFinderButtonTop,
	//left : dtfButtonfontleft,
	//right : dtfButtonfontRight,
	height : dtfButtonHeight,
	width: "200dp",
	borderRadius : 10,
	backgroundImage : 'none'
});

/*offerLabel = Titanium.UI.createLabel({
	color : '#74B214',
	text : 'Offers',
	font : {
		fontSize : dtfButtonFontSize
	},
	textAlign : 'center',
	top : offerLabelTop,
	height : dtfButtonHeight,
});*/

/*signUpButton = Titanium.UI.createButton({
	backgroundColor : '#74B214',
	color : '#FFF',
	title : 'Sign Up',
	font : {
		fontSize : dtfButtonFontSize,
		fontWeight : 'bold',
		fontColor : '#FFF'
	},
	textAlign : 'center',
	left : dtfButtonfontleft,
	top : signUpButtonTop,
	right : dtfButtonfontRight,
	height : dtfButtonHeight,
	borderRadius : 10,
	backgroundImage : 'none'
});

loginButton = Titanium.UI.createButton({
	backgroundColor : '#74B214',
	color : '#FFF',
	title : 'Log In',
	font : {
		fontSize : dtfButtonFontSize,
		fontWeight : 'bold',
		fontColor : '#FFF'
	},
	textAlign : 'center',
	left : dtfButtonfontleft,
	top : loginButtonTop,
	right : dtfButtonfontRight,
	height : dtfButtonHeight,
	borderRadius : 10,
	backgroundImage : 'none'
});

logoutButton = Titanium.UI.createButton({
	backgroundColor : '#74B214',
	color : '#FFF',
	title : 'Log Out',
	font : {
		fontSize : dtfButtonFontSize,
		fontWeight : 'bold',
		fontColor : '#FFF'
	},
	textAlign : 'center',
	left : dtfButtonfontleft,
	top : loginButtonTop,
	right : dtfButtonfontRight,
	height : dtfButtonHeight,
	borderRadius : 10,
	backgroundImage : 'none'
});*/

messageLabel = Ti.UI.createLabel({
	color : '#000',
	font : {
		fontSize : messageLabelFontSize
	},
	height : messageLabelHeight,
	width : 'auto',
	top : messageLabelTop,
	textAlign : 'center'
});

var mainTabWindow = Ti.UI.createWindow({
	title : '',
	url : 'mainTabs.js',
	fullscreen : false
});

/*var loginWindow;
if (Ti.Android) {
	loginWindow = Ti.UI.createWindow({
		title : '',
		url : 'login.js',
		fullscreen : false,
		navBarHidden : true
	});
} else {
	loginWindow = Ti.UI.createWindow({
		title : '',
		url : 'login.js',
		fullscreen : false
	});
}

var signUpWindow = Titanium.UI.createWindow({
	fullscreen : false
});*/

dayTripFinderButton.addEventListener('click', function(e) {
	messageLabel.setText('');
	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'WARNING!',
			message : 'Your device is not online.',
			buttonNames : ['OK']
		});
		alertDialog.show();
	} else {
		mainTabWindow.persistenceToken = (homeWindow.persistenceToken && homeWindow.persistenceToken.length > 0) ? homeWindow.persistenceToken : '';
		//alert(mainTabWindow.persistenceToken);
		if (Ti.Android) {
			mainTabWindow.open();
		} else {
			homeTab.open(mainTabWindow);
		}
	}
});

//signup functionalities
//var signUpWebView = Titanium.UI.createWebView();

var style;
if (Ti.Platform.name === 'iPhone OS') {
	style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
} else {
	style = Ti.UI.ActivityIndicatorStyle.DARK;
}

var activityIndicatorWebview = Ti.UI.createActivityIndicator({
	style : style,
	message : 'Loading...',
	top : '45%',
	left : '45%',
	height : Ti.UI.SIZE,
	width : Ti.UI.SIZE,
	zIndex : 1000
});

/*var webViewContainer = Titanium.UI.createWebView({
	top : 0,
	left : 0,
	right : 0,
	bottom : 0
});

webViewContainer.add(signUpWebView);

var signUpWebWindow = Titanium.UI.createWindow({
	fullscreen : false
});

if (Ti.Android) {
	signUpWebView.addEventListener("load", function(e) {
		activityIndicatorWebview.hide();
	});
	signUpWebWindow.add(activityIndicatorWebview);
}

signUpWebWindow.add(webViewContainer);

signUpWebWindow.addEventListener('android:back', function(e) {
	var homeWindow1 = Titanium.UI.createWindow({
		title : '',
		url : 'home.js',
		tabBarHidden : true,
		navBarHidden : true,
		backgroundColor : '#FFF',
		fullscreen : false,
		exitOnClose : true
	});

	homeWindow1.persistenceToken = '';
	homeWindow1.open();
});

signUpButton.addEventListener('click', function(e) {
	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'WARNING!',
			message : 'Your device is not online.',
			buttonNames : ['OK']
		});
		alertDialog.show();
	} else {
		if (Ti.Android) {
			activityIndicatorWebview.show();
		}
		signUpWebView.url = signUpUrl;

		if (Ti.Android) {
			signUpWebWindow.open();
		} else {
			homeTab.open(signUpWebWindow);
		}
	}

});

loginButton.addEventListener('click', function(e) {
	messageLabel.setText('');
	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'WARNING!',
			message : 'Your device is not online.',
			buttonNames : ['OK']
		});
		alertDialog.show();
	} else {
		loginWindow.persistenceToken = (homeWindow.persistenceToken && homeWindow.persistenceToken.length > 0) ? homeWindow.persistenceToken : '';
		if (Ti.Android) {
			loginWindow.open();
		} else {
			homeTab.open(loginWindow);
		}
	}
});

function logoutRenderXML() {
	var doc = this.responseXML.documentElement;
	var success = doc.getElementsByTagName("success").item(0).text;
	if (success == 1) {
		Ti.App.Properties.setString('token', '');
		messageLabel.setText('Successfully logged out');
		homeWindow.remove(logoutButton);
		homeWindow.add(loginButton);
		homeWindow.add(signUpButton);

		loginWindow.persistenceToken = '';
		homeWindow.persistenceToken = '';

	} else {
		messageLabel.setText('Could not log out');
	}
	Titanium.API.info('logout success', success);
}

function logoutErrorMessage() {
	messageLabel.setText('Could not log out');
	Titanium.API.info('failed', 'could not load logout xml file');
}

logoutButton.addEventListener('click', function(e) {
	Titanium.API.info('clicked', 'log out button was clicked');
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = logoutRenderXML;
	xhr.onerror = logoutErrorMessage;
	xhr.open('DELETE', 'http://www.daytripfinder.co.uk/user_session.xml');
	xhr.setRequestHeader("Content-type", "application/xml; charset=utf-8");
	xhr.send();
});*/

if (osName === 'iphone' || osName === 'ipad') {
	homeWindow.hideNavBar();
}
homeWindow.add(img);
homeWindow.add(dayTripFinderButton);
//homeWindow.add(offerLabel);
homeWindow.add(messageLabel);

/*if (Ti.App.Properties.getString('token') != '') {
	homeWindow.add(logoutButton);
} else {
	homeWindow.add(loginButton);
	homeWindow.add(signUpButton);
}*/

if (homeWindow.notice && homeWindow.notice.length > 0) {
	messageLabel.setText(homeWindow.notice);
}

