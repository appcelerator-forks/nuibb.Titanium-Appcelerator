var countyOfferTab = Titanium.UI.currentTab;
var countyOfferWindow = Titanium.UI.currentWindow;
var basePath = "http://www.daytripfinder.co.uk";
countyOfferWindow.backgroundColor = '#F1F1F1';

var data = [];
var attractions = [];
var offers = [];

var tableView = Titanium.UI.createTableView({
	data : data
});

countyOfferWindow.addEventListener('open', function(e) {
	countyOfferWindow = Titanium.UI.currentWindow;
	countyOfferWindow.add(tableView);
	countyOfferWindow.add(countyOfferWindow.activityIndicator);
	countyOfferWindow.activityIndicator.show();
});

countyOfferWindow.addEventListener('close', function(e) {	
	countyOfferWindow.remove(tableView);
	tableView = null;
	countyOfferWindow = null;	
	data = null;
});

var xhr = Titanium.Network.createHTTPClient();
var url = 'http://www.daytripfinder.co.uk/offers/' + countyOfferWindow.countyName.replace(/ /g, '-') + '.xml';
//alert('cO 30: '+url);
xhr.onload = renderXML;
xhr.onerror = errorMessage;
xhr.open('GET', url);
xhr.send();

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
			height : 'auto',
			backgroundColor : '#FFF'
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

	tableView.data = data;
	countyOfferWindow.activityIndicator.hide();
}

function errorMessage() {
	Titanium.API.log('failed', 'could not load xml file');
	countyOfferWindow.activityIndicator.hide();

	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'WARNING!',
			message : 'Your device is not online.',
			buttonNames : ['OK']
		});
		alertDialog.show();
	} else {
		
		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'WARNING!',
			message : 'Could not load data159.',
			buttonNames : ['OK']
		});
		alertDialog.show();
	}
}

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
	offerDetailsWindow.persistenceToken = countyOfferWindow.persistenceToken;
	if (Ti.Android) {
		offerDetailsWindow.open();
	} else {
		countyOfferTab.open(offerDetailsWindow);
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
	var activity = countyOfferWindow.activity;

	activity.onCreateOptionsMenu = function(e) {
		var menu = e.menu;
		var menuItem = menu.add({
			title : "Home",
			showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
		});
		menuItem.addEventListener("click", function(e) {
			homeWindow.persistenceToken = countyOfferWindow.persistenceToken;
			homeWindow.open();
		});
	};
}
