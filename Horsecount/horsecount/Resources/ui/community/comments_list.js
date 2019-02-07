function CommentsList(_post_id, _navigation, windowStack) {

	var winMain;
	var isAndroid = Ti.Platform.osname === 'android';
	var toolview,
	    toolviewHeight,
	    bottomViewHeight,
	    tableTop;
	//ListView measurement related vars
	var listViewHeight,
	    largeFont,
	    radius,
	    smallFont,
	    tableTop;

	//Pagination related
	var pageIndex = 1,
	    sectionThreshold = 9;

	//Get Images path object
	var imagePath;
	if (isAndroid) {
		var ImagesObject = require('ui/android/imagesPath');
		imagePath = new ImagesObject();
	} else {
		var ImagesObject = require('ui/iPhone/imagesPath');
		imagePath = new ImagesObject();
	}

	//Dimension object
	var Dimentions = require('dimension/withBtmToolbar');
	var _dimentions = new Dimentions();

	if (isAndroid) {
		var ActionBarItems = require('ui/android/actionbar');
		winMain = new ActionBarItems('', 'composite');
	} else {
		var Window = require('ui/iPhone/navbar');
		winMain = new Window('', 'composite');
	}

	if (isAndroid) {
		if (Titanium.Gesture.orientation == Ti.UI.PORTRAIT) {
			//ToolView related
			toolviewHeight = '7%';
			//ListView related
			listViewHeight = '84%';
			largeFont = '17dp';
			radius = 10;
			smallFont = '14dp';
			tableTop = '8%';
			//bottom view related
			bottomViewHeight = '7%';
		} else if (Titanium.Gesture.orientation == Ti.UI.LANDSCAPE_LEFT || Titanium.Gesture.orientation == Ti.UI.LANDSCAPE_RIGHT) {
			//ToolView related
			toolviewHeight = '10%';
			//ListView related
			listViewHeight = '74%';
			largeFont = '17dp';
			radius = 5;
			smallFont = '14dp';
			tableTop = '13%';
			//bottom view related
			bottomViewHeight = '12%';
		}
	} else {
		radius = 5;
		toolviewHeight = '7%';
		tableTop = '48dp';
		listViewHeight = '86%';
	}

	Ti.Gesture.addEventListener('orientationchange', function(e) {
		if (e.orientation == Ti.UI.LANDSCAPE_LEFT || e.orientation == Ti.UI.LANDSCAPE_RIGHT) {
			if (isAndroid) {
				toolview.applyProperties({
					height : '10%'
				});
			}
		} else if (e.orientation == Ti.UI.PORTRAIT) {
			if (isAndroid) {
				toolview.applyProperties({
					height : '7%'
				});
			}
		}
	});

	// close window on back button click
	function closeWindow() {
		winMain.close();
	}

	//Upper toolbar's views
	var upperToolView = require('ui/upperToolbar/excluding_right_btn');
	var toolView = new upperToolView(imagePath.news_feed, "Comments to...", _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', closeWindow);
	win.add(toolView);

	//Get all System URLs
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();

	var CommentsListTemplate = require('ui/community/template/comments_list_template');
	var commentsListTemplate = new CommentsListTemplate();

	//listview
	var listView = Ti.UI.createListView({
		// Maps the plainTemplate object to the 'plain' style name
		// height : listViewHeight,
		height : Ti.UI.SIZE,
		left : '5dp',
		right : '5dp',
		top : tableTop,
		bottom : '2dp',
		borderRadius : radius,
		templates : {
			'comments_list' : commentsListTemplate.getCommentsListTemplate()
		},
		defaultItemTemplate : 'comments_list'
	});

	// Set the initial item threshold
	listView.setMarker({
		sectionIndex : sectionThreshold,
		itemIndex : 0
	});

	// Load more data and set a new threshold when item threshold is reached
	listView.addEventListener('marker', function(e) {
		pageIndex++;
		sectionThreshold = sectionThreshold + 10;

		getDataFromWebservice(pageIndex);

		// reset listview marker after pagination
		listView.setMarker({
			sectionIndex : sectionThreshold,
			itemIndex : 0
		});
	});

	winMain.add(listView);

	getDataFromWebservice(pageIndex);

	// listView.addEventListener('itemclick', function(e) {
	// alert(e.itemId);
	// });

	/*
	 * Get all comments through invoking the corresponding web service
	 */
	function getDataFromWebservice(pageIndex) {

		//Getting activity indicator object
		var Indicator = require('ui/common/activityIndicator');
		var activityIndicator = new Indicator('35%', '10%');
		// Ti.API.log(system_url.getAllComment_url(819));
		var API_Call = require('ui/apiCalling/call_with_indicator');
		new API_Call('GET', system_url.getAllComment_url(_post_id, pageIndex), null, activityIndicator, function(json) {
			if (json != null) {
				setListViewCommentData(json.comments);
			}
		});
	}

	function setListViewCommentData(jsonComments) {
		// Ti.API.log(jsonComments);
		for (var i = 0; i < jsonComments.length; i++) {
			commentsListTemplate.setDataToCommentsListTemplate("comments_list", jsonComments[i], listView);
		};
	}

	//Bottom toolbar section
	var BtmToolbar = require('ui/bottomToolbar/btmToolbar');
	var btmToolview = new BtmToolbar(btmArrayToLoad);
	win.add(btmToolview);

	winMain.addEventListener('close', function(e) {

	});

	return winMain;
}

module.exports = CommentsList;
