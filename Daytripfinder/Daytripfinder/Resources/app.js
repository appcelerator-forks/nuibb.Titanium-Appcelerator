/*Ti.App.Properties.setString('token', '');
Titanium.UI.setBackgroundColor('#FFF');
var tabGroup = Ti.UI.createTabGroup();

var homeWindow;
if (Ti.Android) {

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

homeWindow = Titanium.UI.createWindow({
backgroundColor : '#fff',
tabBarHidden : true,
navBarHidden : true,
url : 'home.js',
fullscreen : false,
exitOnClose : true
});
} else {
homeWindow = Titanium.UI.createWindow({
title : '',
backgroundColor : '#fff',
tabBarHidden : true,
url : 'home.js'
});
}

var homeTab = Titanium.UI.createTab({
title : '',
window : homeWindow
});

if (Ti.Android) {
homeWindow.open();
} else {
tabGroup.addTab(homeTab);
tabGroup.open();
}*/

//For android without home tab
var mainTabWindow = Ti.UI.createWindow({
	title : '',
	url : 'mainTabs.js',
	exitOnClose : true,
	fullscreen : false
});

if (Ti.Android) {
	mainTabWindow.open();
} else {
	var tabGroup = Ti.UI.createTabGroup();
	var homeTab = Titanium.UI.createTab({
		title : '',
		window : mainTabWindow
	});
	tabGroup.addTab(homeTab);
	tabGroup.open();
}

