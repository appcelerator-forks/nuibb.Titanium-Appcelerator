var mainTab = Titanium.UI.currentTab;
var mainTabWindow = Titanium.UI.currentWindow;
var tabGroup = Titanium.UI.createTabGroup();

var style;
if (Ti.Platform.name === 'iPhone OS') {
	style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
} else {
	style = Ti.UI.ActivityIndicatorStyle.DARK;
}

var activityIndicatorNearBy = Ti.UI.createActivityIndicator({
	style : style,
	message:'Loading...',
	top : '45%',
	left : '45%',
	height : Ti.UI.SIZE,
	width :Ti.UI.SIZE,
	zIndex : 1000
});

var activityIndicatorCountyList = Ti.UI.createActivityIndicator({
	style : style,
	message:'Loading...',
	top : '45%',
	left : '45%',
	height : Ti.UI.SIZE,
	width :Ti.UI.SIZE,
	zIndex : 1000
});

var activityIndicatorRegionList = Ti.UI.createActivityIndicator({
	style : style,
	message:'Loading...',
	top : '45%',
	left : '45%',
	height : Ti.UI.SIZE,
	width :Ti.UI.SIZE,
	zIndex : 1000
});

var countyListWindow = Titanium.UI.createWindow({
	title : 'Counties',
	url : 'countyList.js',
	fullscreen : false
});

countyListWindow.add(activityIndicatorCountyList);

countyListWindow.addEventListener('open', function(e) {
	//alert('maintabs 49 : counties clicked');
	activityIndicatorCountyList.show();
});

countyListWindow.activityIndicator = activityIndicatorCountyList;

var countyTab = Titanium.UI.createTab({
	// icon:'KS_nav_views.png',
	title : 'Counties',
	window : countyListWindow
});

var regionListWindow = Titanium.UI.createWindow({
	title : 'Regions',
	url : 'regionList.js',
	fullscreen : false
});

regionListWindow.add(activityIndicatorRegionList);

regionListWindow.addEventListener('open', function(e) {
	activityIndicatorRegionList.show();
});

regionListWindow.activityIndicator = activityIndicatorRegionList;

var regionTab = Titanium.UI.createTab({
	// icon:'KS_nav_ui.png',
	title : 'Regions',
	window : regionListWindow
});

var nearByWindow = Titanium.UI.createWindow({
	title : 'Nearby',
	url : 'nearByOffer.js',
	fullscreen : false
});

nearByWindow.add(activityIndicatorNearBy);

nearByWindow.addEventListener('open', function(e) {
	//activityIndicatorNearBy.show();
});

nearByWindow.activityIndicator = activityIndicatorNearBy;

var nearByTab = Titanium.UI.createTab({
	// icon:'KS_nav_ui.png',
	title : 'Nearby',
	window : nearByWindow
});

var settingsWindow = Titanium.UI.createWindow({
	title : 'Settings',
	backgroundColor : '#F1F1F1',
	url : 'settings.js',
	fullscreen : false
});
var settingsTab = Titanium.UI.createTab({
	// icon:'KS_nav_ui.png',
	title : 'Settings',
	window : settingsWindow
});

nearByWindow.persistenceToken = mainTabWindow.persistenceToken;
countyListWindow.persistenceToken = mainTabWindow.persistenceToken;
regionListWindow.persistenceToken = mainTabWindow.persistenceToken;
// settingsWindow.persistenceToken = mainTabWindow.persistenceToken;

tabGroup.addTab(nearByTab);
tabGroup.addTab(countyTab);
tabGroup.addTab(regionTab);
// tabGroup.addTab(settingsTab);

tabGroup.open(); 