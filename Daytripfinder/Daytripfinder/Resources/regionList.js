var osName = Titanium.Platform.osname;
var regionListTab = Titanium.UI.currentTab;
var regionListWindow = Titanium.UI.currentWindow;
regionListWindow.backgroundColor = '#F1F1F1';
regionListWindow.color = '#000000';
var data = [];

var style;
if (Ti.Platform.name === 'iPhone OS') {
	style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
} else {
	style = Ti.UI.ActivityIndicatorStyle.DARK;
}

var activityIndicatorRegionOffer = Ti.UI.createActivityIndicator({
	style : style,
	message:'Loading...',
	top : '5%',
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

	var regions = doc.getElementsByTagName("region");
	for (i = 0; i < regions.length; i++) {
		data.push(Ti.UI.createTableViewRow({
			title : regions.item(i).getElementsByTagName("name").item(0).text,
			hasChild : true,
			color : '#000000',
			backgroundColor : '#F1F1F1',
			font: {
				fontSize: normalTextSize
			}
		}));
	}

	regionListWindow.activityIndicator.hide();
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

		regionListWindow.activityIndicator.hide();

		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'WARNING!',
			message : '67.',
			buttonNames : ['OK']
		});
		alertDialog.show();
	}

}

var xhr = Titanium.Network.createHTTPClient();
xhr.onload = renderXML;
xhr.onerror = errorMessage;
xhr.open('GET', 'http://www.daytripfinder.co.uk/offers/filters/regions.xml');
xhr.send();

var tableView = Titanium.UI.createTableView({
	data : data
});

var regionOfferWindow = Titanium.UI.createWindow({
	title : 'daytripfinder.co.uk',
	url : 'regionOffer.js',
	tabBarHidden : true,
	fullscreen : false
});

tableView.addEventListener('click', function(e) {
	Titanium.API.info("sdfsdfsdF " + e.rowData.title);
	regionOfferWindow.regionName = e.rowData.title;
	regionOfferWindow.persistenceToken = regionListWindow.persistenceToken;
	regionOfferWindow.add(activityIndicatorRegionOffer);

	regionOfferWindow.activityIndicator = activityIndicatorRegionOffer;

	if (Ti.Android) {
		// regionListWindow.close();		
		regionOfferWindow.open({
			modal : true
		});

	} else {
		regionListTab.open(regionOfferWindow);
	}
});

var homeWindow = Titanium.UI.createWindow({
	title : '',
	url : 'home.js',
	tabBarHidden : true,
	navBarHidden : true,
	backgroundColor : '#FFF',
	fullscreen : false,
	exitOnClose : true
});

var homeButton = Ti.UI.createButton({
	title : 'home'
});

homeButton.addEventListener('click', function() {
	Titanium.API.info('clicked', 'homebutton was clicked');
	homeWindow.persistenceToken = regionListWindow.persistenceToken;
	regionListTab.open(homeWindow);
});

if (osName === 'iphone' || osName === 'ipad') {
	regionListWindow.setRightNavButton(homeButton);
} else if (osName === 'android') {
	var activity = regionListWindow.activity;

	activity.onCreateOptionsMenu = function(e) {
		var menu = e.menu;
		var menuItem = menu.add({
			title : "Home",
			showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
		});
		menuItem.addEventListener("click", function(e) {
			homeWindow.persistenceToken = regionListWindow.persistenceToken;
			homeWindow.open();
		});
	};

	regionListWindow.addEventListener('android:back', function(e) {
		homeWindow.persistenceToken = regionListWindow.persistenceToken;
		homeWindow.open();
		regionListWindow.close();
		regionListWindow.remove(tableView);
		regionListWindow = null;
		tableView = null;		
		data = null;
	});
}

regionListWindow.add(tableView);
