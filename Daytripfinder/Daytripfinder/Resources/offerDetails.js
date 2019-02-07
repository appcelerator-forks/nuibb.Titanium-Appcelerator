var offerDetailsTab = Titanium.UI.currentTab;
var offerDetailsWindow = Titanium.UI.currentWindow;
var basePath = "http://www.daytripfinder.co.uk";

attraction = offerDetailsWindow.attraction;
offer = offerDetailsWindow.offer;

var style;
if (Ti.Platform.name === 'iPhone OS') {
	style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
} else {
	style = Ti.UI.ActivityIndicatorStyle.DARK;
}

var activityIndicatorWebview = Ti.UI.createActivityIndicator({
	style : style,
	message:'Loading...',
	top : '45%',
	left : '45%',
	height : Ti.UI.SIZE,
	width : Ti.UI.SIZE,
	zIndex : 1000
});

var smallTextSize, smallTextHeight, normalTextSize, normalTextHeight, lowerTextTop, offerTopViewHeight, offerDetailsViewTop, smallViewHeight, addressViewHeight, termsViewTop, addressViewTop, phoneViewTop, leftDetails;

if (Ti.Android && Ti.Platform.displayCaps.platformHeight > 640) {
	offerTopViewHeight = 95;
	offerDetailsViewTop = 95;
	smallTextSize = 14;
	smallTextHeight = 19;
	normalTextSize = 19;
	normalTextHeight = 48;
	smallViewHeight = 50;
	addressViewHeight = 130;
	leftDetails = 100;

	lowerTextTop = 75;
	termsViewTop = 20;
	addressViewTop = 90;
	phoneViewTop = 250;
} else {
	offerTopViewHeight = 82;
	offerDetailsViewTop = 82;

	smallTextSize = 11;
	smallTextHeight = 16;
	normalTextSize = 16;
	normalTextHeight = 38;
	smallViewHeight = 40;
	addressViewHeight = 100;
	leftDetails = 75;

	lowerTextTop = 65;
	termsViewTop = 10;
	addressViewTop = 60;
	phoneViewTop = 170;
}

//create offer top view
var offerTopView = Titanium.UI.createView({
	top : 0,
	height : offerTopViewHeight,
	backgroundColor : '#E1E1E1'
});

var imgURL = basePath + attraction.getElementsByTagName('primary-photo-thumbnail-path').item(0).text;
var expiaryDate = new Date(offer.getElementsByTagName("expire-date").item(0).text);

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
	text : attraction.getElementsByTagName("name").item(0).text,
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
	text : offer.getElementsByTagName("description").item(0).text,
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

offerTopView.add(img);
offerTopView.add(title);
offerTopView.add(upperText);
offerTopView.add(lowerText);

//create term view
var termsView = Titanium.UI.createView({
	left : 5,
	right : 5,
	top : termsViewTop,
	height : smallViewHeight,
	backgroundColor : '#FFF',
	borderColor : '#EEE',
	borderRadius : 10,
	borderWidth : 3

});

var termLabel = Titanium.UI.createLabel({
	color : '#000',
	text : 'Terms & Conditions Apply',
	font : {
		fontSize : normalTextSize,
		fontWeight : 'bold'
	},
	textAlign : 'center',
	width : 'auto'
});

termsView.add(termLabel);

//create address view
var addressView = Titanium.UI.createView({
	left : 5,
	right : 5,
	top : addressViewTop,
	height : addressViewHeight,
	backgroundColor : '#FFF',
	borderColor : '#EEE',
	borderRadius : 10,
	borderWidth : 3

});

var addressLabel = Titanium.UI.createLabel({
	color : '#000',
	text : 'Address',
	font : {
		fontSize : normalTextSize,
		fontWeight : 'normal'
	},
	textAlign : 'left',
	left : 10,
	top : 10
});

var addressDetailsLabel = Titanium.UI.createLabel({
	color : '#000',
	text : attraction.getElementsByTagName("address1").item(0).text,
	font : {
		fontSize : normalTextSize,
		fontWeight : 'bold'
	},
	textAlign : 'left',
	left : leftDetails,
	top : 10
});

addressView.add(addressLabel);
addressView.add(addressDetailsLabel);

//create term view
var phoneView = Titanium.UI.createView({
	left : 5,
	right : 5,
	top : phoneViewTop,
	height : smallViewHeight,
	backgroundColor : '#FFF',
	borderColor : '#EEE',
	borderRadius : 10,
	borderWidth : 3

});

var phoneLabel = Titanium.UI.createLabel({
	color : '#000',
	text : 'Phone',
	font : {
		fontSize : normalTextSize,
		fontWeight : 'normal'
	},
	textAlign : 'left',
	left : 10,
	top : 10
});

var phoneDetailsLabel = Titanium.UI.createLabel({
	color : '#000',
	text : attraction.getElementsByTagName("phone").item(0).text,
	font : {
		fontSize : normalTextSize,
		fontWeight : 'bold'
	},
	textAlign : 'left',
	left : leftDetails,
	top : 8
});

phoneView.add(phoneLabel);
phoneView.add(phoneDetailsLabel);

//create term view
var getOfferView = Titanium.UI.createView({
	left : 0,
	right : 0,
	bottom : 0,
	height : 60,
	backgroundColor : '#000'
});

var getOfferButton = Titanium.UI.createButton({
	backgroundColor : '#74B214',
	title : 'Get Offer',
	font : {
		fontSize : 20,
		fontWeight : 'bold',
		fontColor : '#FFF'
	},
	textAlign : 'center',
	left : 15,
	top : 10,
	bottom : 5,
	right : 15,
	height : 50,
	borderRadius : 10,
	backgroundImage : 'none'
});

getOfferView.add(getOfferButton);

//create offerDetailsView
var offerDetailsView = Titanium.UI.createView({
	top : offerDetailsViewTop,
	height : 'auto',
	backgroundColor : '#F1F1F1'
});

offerDetailsView.add(termsView);
offerDetailsView.add(addressView);
offerDetailsView.add(phoneView);
offerDetailsView.add(getOfferView);

offerDetailsWindow.add(offerTopView);
offerDetailsWindow.add(offerDetailsView);

/*function IsPdf(url) {

var fileExtention = '';
//Define the http client
var myHttpClient = Ti.Network.createHTTPClient();
//Open the url to download
myHttpClient.open("GET", url);
//Send request
myHttpClient.send();
//On success of downloading
myHttpClient.onload = function() {
fileExtention = this.getResponseHeader('Content-Type');
Ti.API.info("Received text: " + fileExtention);
alert('oD 283' + fileExtention);
return fileExtention;
};
};*/

//create webview
var url = '';
var attachFilePath = offer.getElementsByTagName('attachment-path').item(0).text;
var offerLink = offer.getElementsByTagName('offer-link').item(0).text;
if (offerLink && offerLink.length > 0) {
	var url = offerLink;
} else if (attachFilePath && attachFilePath.length > 0) {
	url = basePath + attachFilePath;
	//alert('OD 282: '+ url);
}

var webView = Titanium.UI.createWebView();

var webViewContainer = Titanium.UI.createWebView({
	top : 0,
	left : 0,
	right : 0,
	bottom : 0
});

webViewContainer.add(webView);

var webWindow = Titanium.UI.createWindow({
	fullscreen : false
});

if (Ti.Android) {
	webView.addEventListener("load", function(e) {
		activityIndicatorWebview.hide();
	});
	webWindow.add(activityIndicatorWebview);
}

webWindow.add(webViewContainer);

getOfferButton.addEventListener('click', function(e) {
	//if (Ti.App.Properties.getString('token') != '') {
	if (Ti.Android) {
		//alert('oD 311 : get offer clicked');
		activityIndicatorWebview.show();
	}
	Titanium.API.info('url', url);
	Titanium.API.info('attachFileName', attachFilePath);
	Titanium.API.info('offerLink', offerLink);

	if (url.length > 0) {
		//url = 'http://docs.google.com/viewer?embedded=true&url='+offerLink;
		var isPdf = '';
		if (url.indexOf('.pdf') > 0) {
			isPdf = 'http://docs.google.com/viewer?embedded=true&url=' + url;
		} else {
			isPdf = url;
		}

		webView.url = isPdf;
	} else {
		webView.html = '<p>Sorry, this offer is not valid</p>';
	}
	if (Ti.Android) {
		webWindow.open();
	} else {
		offerDetailsTab.open(webWindow);
	}
	/*} else {
	 var loginWindow;
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

	 loginWindow.notice = 'Please login to see the offer';
	 loginWindow.offer = offerDetailsWindow.offer;
	 loginWindow.attraction = offerDetailsWindow.attraction;
	 loginWindow.persistenceToken = offerDetailsWindow.persistenceToken;

	 if (Ti.Android) {
	 loginWindow.open();
	 } else {
	 offerDetailsTab.open(loginWindow);
	 }
	 }*/
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
	var activity = offerDetailsWindow.activity;

	activity.onCreateOptionsMenu = function(e) {
		var menu = e.menu;
		var menuItem = menu.add({
			title : "Home",
			showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
		});
		menuItem.addEventListener("click", function(e) {
			homeWindow.persistenceToken = offerDetailsWindow.persistenceToken;
			homeWindow.open();
		});
	};
}

offerDetailsWindow.addEventListener('close', function(e) {
	if (webView !== null) {
		offerDetailsWindow.remove(webView);
		webView = null;
	}
	offerDetailsWindow = null;
});
