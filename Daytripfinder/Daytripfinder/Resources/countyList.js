var osName = Titanium.Platform.osname;
var countyListTab = Titanium.UI.currentTab;
var countyListWindow = Titanium.UI.currentWindow;
countyListWindow.backgroundColor = '#F1F1F1';
countyListWindow.opacity = 1;
countyListWindow.color = '#000000';

var data = [];

var style;
if (Ti.Platform.name === 'iPhone OS') {
	style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
} else {
	style = Ti.UI.ActivityIndicatorStyle.DARK;
}

var activityIndicatorCountyOffer = Ti.UI.createActivityIndicator({
	style : style,
	message:'Loading...',
	top : '45%',
	left : '45%',
	height : Ti.UI.SIZE,
	width : Ti.UI.SIZE,
	zIndex : 1000
});

if (Ti.Android && Ti.Platform.displayCaps.platformHeight > 640) {
	normalTextSize = 21;
} else {
	normalTextSize = 16;
}

function renderXML() {
	var doc = this.responseXML.documentElement;
	var counties = doc.getElementsByTagName("county");
	for (i = 0; i < counties.length; i++) {
		data.push(Ti.UI.createTableViewRow({
			title : counties.item(i).getElementsByTagName("name").item(0).text,
			hasChild : true,
			color : '#000000',
			backgroundColor : '#F1F1F1',
			font : {
				fontSize : normalTextSize
			}
		}));
	}
	countyListWindow.activityIndicator.hide();
	tableView.data = data;
}

function errorMessage() {
	Titanium.API.log('failed', 'could not load xml file');

	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'WARNING!',
			message : 'Your device is not online.',
			buttonNames : ['OK']
		});
		alertDialog.show();
	} else {
		countyListWindow.activityIndicator.hide();

		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'WARNING!',
			message : 'Could not load data66.',
			buttonNames : ['OK']
		});
		alertDialog.show();
	}
}

var xhr = Titanium.Network.createHTTPClient();
xhr.onload = renderXML;
xhr.onerror = errorMessage;
xhr.open('GET', 'http://www.daytripfinder.co.uk/offers/filters/counties.xml');
xhr.send();

var tableView = Titanium.UI.createTableView({
	data : data
});

var win2 = Titanium.UI.createWindow({
	title : 'daytripfinder.co.uk',
	url : 'countyOffer.js',
	tabBarHidden : true,
	fullscreen : false
});

tableView.addEventListener('click', function(e) {
	win2.countyName = e.rowData.title;
	win2.persistenceToken = countyListWindow.persistenceToken;

	win2.add(activityIndicatorCountyOffer);
	win2.activityIndicator = activityIndicatorCountyOffer;
	if (Ti.Android) {
		win2.open();
	} else {
		countyListTab.open(win2);
	}
});

var homeButton = Ti.UI.createButton({
	title : 'home'
});

homeButton.addEventListener('click', function() {
	homeWindow = Titanium.UI.createWindow({
		title : '',
		url : 'home.js',
		tabBarHidden : true,
		navBarHidden : true,
		backgroundColor : '#FFF',
		fullscreen : false,
		exitOnClose : true
	});

	Titanium.API.info('clicked', 'homebutton was clicked');
	homeWindow.persistenceToken = countyListWindow.persistenceToken;
	countyListTab.open(homeWindow);
});

if (osName === 'iphone' || osName === 'ipad') {
	countyListWindow.setRightNavButton(homeButton);
} else if (osName === 'android') {
	var activity = countyListWindow.activity;

	activity.onCreateOptionsMenu = function(e) {
		var menu = e.menu;
		var menuItem = menu.add({
			title : "Home",
			showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
		});
		menuItem.addEventListener("click", function(e) {
			homeWindow.persistenceToken = countyListWindow.persistenceToken;
			homeWindow.open();
		});
	};

	countyListWindow.addEventListener('android:back', function(e) {

		countyListWindow.close();
		countyListWindow.remove(tableView);
		countyListWindow = null;
		tableView = null;
		data = null;

		homeWindow = Titanium.UI.createWindow({
			title : '',
			url : 'home.js',
			tabBarHidden : true,
			navBarHidden : true,
			backgroundColor : '#FFF',
			fullscreen : false,
			exitOnClose : true
		});

		// homeWindow.persistenceToken = countyListWindow.persistenceToken;
		homeWindow.open();
	});
}

countyListWindow.add(tableView);
 

