var osName = Titanium.Platform.osname;

var nearByOfferTab = Titanium.UI.currentTab;
var nearByOfferWindow = Titanium.UI.currentWindow;
var Universal_url = require('system_URLs');
var system_url = new Universal_url();
var basePath = system_url.getBaseUrl();
nearByOfferWindow.backgroundColor = '#F1F1F1';

var data = [];
var attractions = [];
var offers = [];

var latitude = null,
    longitude = null;

Ti.Geolocation.purpose = "Find attractions near you";
Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = 10;
Titanium.Geolocation.getCurrentPosition(function(e) {
	if (e.error) {
		Titanium.API.info('cant load', 'Cannot get your current location');

		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'WARNING!',
			message : 'Daytripfinder cannot get your current location.',
			buttonNames : ['OK']
		});
		alertDialog.show();

		//nearByOfferWindow.activityIndicator.hide();

		return;
	} else {
		longitude = e.coords.longitude;
		latitude = e.coords.latitude;
		var accuracy = e.coords.accuracy;
		Http_Client(system_url.getLatAndLong(), latitude, longitude);
		Titanium.API.info('longitude', longitude);
		Titanium.API.info('latitude', latitude);
		Titanium.API.info('accuracy', accuracy);
	}
});

var smallTextSize,
    smallTextHeight,
    normalTextSize,
    normalTextHeight,
    lowerTextTop;

if (Ti.Android && Ti.Platform.displayCaps.platformHeight > 640) {
	smallTextSize = 14;
	smallTextHeight = 19;
	normalTextSize = 19;
	normalTextHeight = 48;

	lowerTextTop = 75;
} else {
	smallTextSize = 11;
	smallTextHeight = 16;
	normalTextSize = 16;
	normalTextHeight = 38;

	lowerTextTop = 65;
}

function renderXML() {
	var doc = this.responseXML.documentElement;
	//alert('success');

	attractions = doc.getElementsByTagName("attraction");
	 offers = doc.getElementsByTagName("offer");

	 if (offers && offers.length < 1) {
	 nearByOfferWindow.activityIndicator.hide();

	 var alertDialog = Titanium.UI.createAlertDialog({
	 title : 'No Attraction!',
	 message : 'Daytripfinder cannot get any attraction near your current location.',
	 buttonNames : ['OK']
	 });
	 alertDialog.show();
	 }

	 for ( i = 0; i < offers.length; i++) {
	 var imgURL = basePath + attractions.item(i).getElementsByTagName('primary-photo-thumbnail-path').item(0).text;
	 var expiaryDate = new Date(offers.item(i).getElementsByTagName("expire-date").item(0).text);
	 var distance = Math.round(parseFloat(offers.item(i).getElementsByTagName("distance").item(0).text));

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

	 var distanceText = Titanium.UI.createLabel({
	 text : distance + ' km',
	 height : smallTextHeight,
	 top : lowerTextTop,
	 right : 15,
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
	 row.add(distanceText);

	 if (i % 2) {
	 row.backgroundColor = '#E0E0E0';
	 } else {
	 row.backgroundColor = '#F1F1F1';
	 }

	 data.push(row);
	 }

	 nearByOfferWindow.activityIndicator.hide();
	 tableView.data = data;
}

function errorMessage() {
	//Titanium.API.log('failed', 'could not load xml file');
	//nearByOfferWindow.activityIndicator.hide();

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
			message : 'Could not load dataa.',
			buttonNames : ['OK']
		});
		alertDialog.show();
	}
}

function Http_Client(_url, _lat, _long) {
	var xhr = Titanium.Network.createHTTPClient();

	if (_lat != null && _long != null) {
		var url = _url + '/' + _lat + '/' + _long;
		xhr.onload = renderXML;
		xhr.onerror = errorMessage;
		xhr.open('GET', url);
		xhr.send();
	}
}

var tableView = Titanium.UI.createTableView({
	data : data
});

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
	offerDetailsWindow.persistenceToken = nearByOfferWindow.persistenceToken;

	if (Ti.Android) {
		offerDetailsWindow.open();
	} else {
		nearByOfferTab.open(offerDetailsWindow);
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
	homeWindow.persistenceToken = nearByOfferWindow.persistenceToken;
	nearByOfferTab.open(homeWindow);
});

nearByOfferWindow.add(tableView);

if (osName === 'iphone' || osName === 'ipad') {
	nearByOfferWindow.setRightNavButton(homeButton);
} else if (osName === 'android') {
	var activity = nearByOfferWindow.activity;

	activity.onCreateOptionsMenu = function(e) {
		var menu = e.menu;
		var menuItem = menu.add({
			title : "Home",
			showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
		});
		menuItem.addEventListener("click", function(e) {
			homeWindow.persistenceToken = nearByOfferWindow.persistenceToken;
			homeWindow.open();
		});
	};

	nearByOfferWindow.addEventListener('android:back', function(e) {
		homeWindow.persistenceToken = nearByOfferWindow.persistenceToken;
		homeWindow.open();
		nearByOfferWindow.close();
		nearByOfferWindow.remove(tableView);
		nearByOfferWindow = null;
		tableView = null;
		data = null;
	});
}

