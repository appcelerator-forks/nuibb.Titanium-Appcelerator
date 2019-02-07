var osName = Titanium.Platform.osname;

settingsWindow = Titanium.UI.currentWindow;
settingsTab = Titanium.UI.currentTab;

var faqButton = Titanium.UI.createButton({
	backgroundColor : '#FFF',
	color : '#000',
	title : 'FAQ',
	font : {
		fontSize : 16,
		fontWeight : 'bold',
		fontColor : '#000'
	},
	textAlign : 'left',
	left : 20,
	top : 20,
	right : 20,
	height : 45,
	borderRadius : 10,
	borderWidth : 1,
	borderColor : '#000',
	backgroundImage : 'none'
});

var versionButton = Titanium.UI.createButton({
	backgroundColor : '#FFF',
	color : '#000',
	title : 'Version',
	font : {
		fontSize : 16,
		fontWeight : 'bold',
		fontColor : '#000'
	},
	textAlign : 'left',
	left : 20,
	top : 85,
	right : 20,
	height : 45,
	borderRadius : 10,
	borderWidth : 1,
	borderColor : '#000',
	backgroundImage : 'none'
});

var tosButton = Titanium.UI.createButton({
	backgroundColor : '#FFF',
	color : '#000',
	title : 'Terms of Service',
	font : {
		fontSize : 16,
		fontWeight : 'bold',
		fontColor : '#000'
	},
	textAlign : 'left',
	left : 20,
	top : 145,
	right : 20,
	height : 45,
	borderRadius : 10,
	borderWidth : 1,
	borderColor : '#000',
	backgroundImage : 'none'
});

var policyButton = Titanium.UI.createButton({
	backgroundColor : '#FFF',
	color : '#000',
	title : 'Private Policy',
	font : {
		fontSize : 16,
		fontWeight : 'bold',
		fontColor : '#000'
	},
	textAlign : 'left',
	left : 20,
	top : 205,
	right : 20,
	height : 45,
	borderRadius : 10,
	borderWidth : 1,
	borderColor : '#000',
	backgroundImage : 'none'
});

var logoutButton = Titanium.UI.createButton({
	backgroundColor : '#FFF',
	color : '#000',
	title : 'Log Out',
	font : {
		fontSize : 16,
		fontWeight : 'bold',
		fontColor : '#000'
	},
	textAlign : 'center',
	left : 20,
	bottom : 20,
	right : 20,
	height : 45,
	borderRadius : 10,
	borderWidth : 1,
	borderColor : '#000',
	backgroundImage : 'none'
});

var messageLabel = Ti.UI.createLabel({
	color : '#000',
	font : {
		fontSize : 16
	},
	height : 30,
	width : 'auto',
	top : 255,
	textAlign : 'center'
});

function logoutRenderXML() {
	var doc = this.responseXML.documentElement;
	var success = doc.getElementsByTagName("success").item(0).text;
	if (success == 1) {
		Ti.App.Properties.setString('token', '');
		
		settingsWindow.remove(logoutButton);
		settingsWindow.persistenceToken = '';
		homeWindow.persistenceToken = '';
		// homeWindow.messageLabel.setText('Successfully logged out');
		homeWindow.notice = 'Successfully logged out';
		settingsTab.open(homeWindow);

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
});

var homeWindow = Titanium.UI.createWindow({
	title : '',
	url : 'home.js',
	tabBarHidden : true,
	navBarHidden : true,
	backgroundColor : '#FFF',
    fullscreen:false,
	exitOnClose : true
});

var homeButton = Ti.UI.createButton({
	title : 'home'
});

homeButton.addEventListener('click', function() {
	Titanium.API.info('clicked', 'homebutton was clicked');
	homeWindow.persistenceToken = settingsWindow.persistenceToken;
	settingsTab.open(homeWindow);
});

settingsWindow.add(faqButton);
settingsWindow.add(versionButton);
settingsWindow.add(tosButton);
settingsWindow.add(policyButton);

if (Ti.App.Properties.getString('token') != '') {
	settingsWindow.add(logoutButton);
}

if (osName === 'iphone' || osName === 'ipad') {
	settingsWindow.setRightNavButton(homeButton);
} else if (osName === 'android') {
	var activity = settingsWindow.activity;

	activity.onCreateOptionsMenu = function(e) {
		var menu = e.menu;
		var menuItem = menu.add({
			title : "Home",
			showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
		});
		menuItem.addEventListener("click", function(e) {
			homeWindow.persistenceToken = settingsWindow.persistenceToken;
			homeWindow.open();
		});
	};
	
	settingsWindow.addEventListener('android:back',function(e){
		homeWindow.persistenceToken = settingsWindow.persistenceToken;
		homeWindow.open();
	});
}

