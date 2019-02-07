function FindMemberInGroup(_group_id, _navigation, windowStack, go_to_friend_profile) {
	var isAndroid = Ti.Platform.osname === 'android';
	//Get all System URLs
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();

	var Indicator = require('ui/common/activityIndicator');
	var activityIndicator = new Indicator('35%', '10%');

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
	var Dimentions = require('dimension/withoutBtmToolbar');
	var _dimentions = new Dimentions();

	var winMain;
	if (isAndroid) {
		var ActionBarItems = require('ui/android/actionbar');
		winMain = new ActionBarItems('', 'vertical');
	} else {
		var Window = require('ui/iPhone/navbar');
		winMain = new Window('', 'vertical');
	}
	
	//Get all windows and states
	var SysEnum = require('ui/community/wrapper_classes/system_enums');

	//close window on back button click
	function closeWindow() {
		winMain.close();
	}

	//Upper toolbar's views
	var upperToolView = require('ui/upperToolbar/excluding_right_btn');
	var toolView = new upperToolView(imagePath.group_focus, "Find Member", _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', closeWindow);
	winMain.add(toolView);

	//Go to friend Profile from comment list
	function onProfileClick(e) {
		var item = e.section.getItemAt(e.itemIndex);
		if (e.bindId === "profile_pic" || e.bindId === "profile_name") {
			go_to_friend_profile(SysEnum.WINDOWS_AND_STATES.PROFILE_BY_ID, item.properties.user_id);
			closeWindow();
		}
	}

	// Function to create a footer view
	var createCustomFooter = function() {
		var view = Ti.UI.createView({
			backgroundColor : 'silver',
			width : Ti.UI.FILL,
			height : '80dp'
		});

		view.add(activityIndicator);
		return view;
	};

	//Listview template for Find Member from Group
	var FindMemberTemplate = require('ui/community/template/find_member_template');
	var findMemberTemplate = new FindMemberTemplate();

	var listView = Ti.UI.createListView({
		top : '1%',
		left : '5dp',
		right : '5dp',
		height : _dimentions.listViewHeight,
		borderRadius : 5,
		templates : {
			'plain' : findMemberTemplate.getFindMemberTemplate(onProfileClick)
		},
		defaultItemTemplate : 'plain',
		footerView : createCustomFooter()
	});

	/*
	 * Create and add SearchView into ListView
	 */
	var searchView = Ti.UI.createSearchBar({
		hintText : "Enter Name here...",
		// barColor : 'silver',
		backgroundColor : '#FFF',
		left : '5dp',
		right : '5dp',
		top : '3dp',
		bottom : '3dp',
		height : '40dp',
		width : Ti.UI.FILL,
		// borderColor : '#36A9E1',	//
		// borderWidth : '2dp',	   // Enabling these three attributes results instant crash in Android
		// borderRadius : '3dp',  //
		showCancel : true
	});
	listView.setSearchView(searchView);

	winMain.add(listView);

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

		listView.setMarker({
			sectionIndex : sectionThreshold,
			itemIndex : 0
		});
	});

	/*
	 * Get all comments through invoking the corresponding web service
	 */
	var API_Call = require('ui/apiCalling/call_with_indicator');
	new API_Call('GET', system_url.getFindMember_url(_group_id, pageIndex), null, activityIndicator, function(json) {
		if (pageIndex === 1) {
			listView.setSections(findMemberTemplate.setDataToFindMemberTemplate(json));
		} else {
			listView.appendSection(findMemberTemplate.setDataToFindMemberTemplate(json));
		}
	});

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/withoutBtmToolbar');
	new OnOrientaionChange(toolView, listView);

	winMain.addEventListener('close', function(e) {
		windowStack.pop();
		winMain = null;
	});

	return winMain;
}

module.exports = FindMemberInGroup;
