var regionOfferTab = Titanium.UI.currentTab;
var regionOfferWindow = Titanium.UI.currentWindow;
var basePath = "http://www.daytripfinder.co.uk";
regionOfferWindow.backgroundColor = '#F1F1F1';

var data = [];
var attractions = [];
var offers = [];

var tableView = Titanium.UI.createTableView({
	data : []
});

regionOfferWindow.add(tableView);

regionOfferWindow.addEventListener('open', function(e) {
	regionOfferWindow.activityIndicator.show();
	// tableView.setData(null);
});

regionOfferWindow.addEventListener('close', function(e) {
	regionOfferWindow.remove(tableView);
	tableView = null;
	countyOfferWindow = null;	
	data = null;
});

//measurements variable
var smallTextSize, smallTextHeight, normalTextSize, normalTextHeight, lowerTextTop, offerTopViewHeight, offerDetailsViewTop;

if (Ti.Android && Ti.Platform.displayCaps.platformHeight > 640) {
	offerTopViewHeight = 95;
	offerDetailsViewTop = 95;
	smallTextSize = 14;
	smallTextHeight = 19;
	normalTextSize = 19;
	normalTextHeight = 48;

	lowerTextTop = 75;
} else {
	offerTopViewHeight = 82;
	offerDetailsViewTop = 82;

	smallTextSize = 11;
	smallTextHeight = 16;
	normalTextSize = 16;
	normalTextHeight = 38;

	lowerTextTop = 65;
}

function renderXML() {
	var doc = this.responseXML.documentElement;

	attractions = doc.getElementsByTagName("attraction");
	offers = doc.getElementsByTagName("offer");
	for (i = 0; i < offers.length; i++) {
		var imgURL = basePath + attractions.item(i).getElementsByTagName('primary-photo-thumbnail-path').item(0).text;
		var expiaryDate = new Date(offers.item(i).getElementsByTagName("expire-date").item(0).text);

		var img = Titanium.UI.createImageView({
			defaultImage : 'placeholder-dog.png',
			image : imgURL,
			height : 60,
			width : 60,
			left : 10,
			top : 5,
			bottom : 10

		});

		var title = Titanium.UI.createLabel({
			text : attractions.item(i).getElementsByTagName("name").item(0).text,
			height : normalTextHeight,
			width : "75%",
			top : 20,
			left : 80,
			color : "#000",
			textAlign : "left",
			font : {
				fontSize : normalTextSize,
				fontWeight : 'bold'
			}
		});

		var upperText = Titanium.UI.createLabel({
			text : offers.item(i).getElementsByTagName("description").item(0).text,
			height : smallTextHeight,
			top : 5,
			left : 80,
			color : "#000",
			textAlign : "left",
			font : {
				fontSize : smallTextSize
			}
		});

		var lowerText = Titanium.UI.createLabel({
			text : 'valid until: ' + expiaryDate.toDateString(),
			height : smallTextHeight,
			top : lowerTextTop,
			left : 80,
			bottom : 5,
			color : "#000",
			textAlign : "left",
			font : {
				fontSize : smallTextSize
			}
		});

		var row = Titanium.UI.createTableViewRow({
			height : 'auto'
		});

		row.add(img);
		row.add(upperText);
		row.add(title);
		row.add(lowerText);

		if (i % 2) {
			row.backgroundColor = '#E0E0E0';
		} else {
			row.backgroundColor = '#F1F1F1';
		}

		data.push(row);
	}
	regionOfferWindow.activityIndicator.hide();
	tableView.data = data;
}

function errorMessage() {
	regionOfferWindow.activityIndicator.hide();
	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'WARNING!',
			message : 'Your device is not online.',
			buttonNames : ['OK']
		});
		alertDialog.show();
	} else {
		Titanium.API.log('failed', 'could not load xml file');

		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'WARNING!',
			message : 'Could not load data146.',
			buttonNames : ['OK']
		});
		alertDialog.show();
	}
}

var xhr = Titanium.Network.createHTTPClient();
var url = 'http://www.daytripfinder.co.uk/offers/region/' + encodeURIComponent(regionOfferWindow.regionName) + '.xml';
xhr.onload = renderXML;
xhr.onerror = errorMessage;
xhr.open('GET', url);
xhr.send();

var offerDetailsWindow = Titanium.UI.createWindow({
	title : 'daytripfinder.co.uk',
	url : 'offerDetails.js',
	tabBarHidden : true,
	fullscreen : false
});

tableView.addEventListener('click', function(e) {
	offerDetailsWindow.index = e.index;
	offerDetailsWindow.offer = offers.item(e.index);
	offerDetailsWindow.attraction = attractions.item(e.index);
	offerDetailsWindow.persistenceToken = regionOfferWindow.persistenceToken;
	if (Ti.Android) {
		// regionOfferWindow.close();
		offerDetailsWindow.open();
	} else {
		regionOfferTab.open(offerDetailsWindow);
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

if (Ti.Android) {
	var activity = regionOfferWindow.activity;

	activity.onCreateOptionsMenu = function(e) {
		var menu = e.menu;
		var menuItem = menu.add({
			title : "Home",
			showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
		});
		menuItem.addEventListener("click", function(e) {
			homeWindow.persistenceToken = regionOfferWindow.persistenceToken;
			homeWindow.open();
		});
	};
}
