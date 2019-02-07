function GoToMiscPages(_title, _id, windowStack, go_to_friend_profile) {
	var isAndroid = Ti.Platform.osname === 'android';
	//Pagination related
	var pageIndex = 1,
	    sectionThreshold = 10;

	//Getting activity indicator object
	var Indicator = require('ui/common/activityIndicator');
	var activityIndicator = new Indicator('35%', '10%');

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

	//Get all System URLs
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();

	//Get all windows and states
	var SysEnum = require('ui/community/wrapper_classes/system_enums');

	var winMain;
	if (isAndroid) {
		var ActionBarItems = require('ui/android/actionbar');
		winMain = new ActionBarItems('', 'vertical');
		winMain.windowSoftInputMode = Titanium.UI.Android.SOFT_INPUT_ADJUST_PAN;
	} else {
		var Window = require('ui/iPhone/navbar');
		winMain = new Window('', 'vertical');
	}

	//close window on back button click
	function closeWindow() {
		winMain.close();
	}

	//Get window icon
	function getWindowIcon(_name) {
		if (_name === SysEnum.WINDOWS_AND_STATES.POST_COMMENTS || _name === SysEnum.WINDOWS_AND_STATES.GROUP_POST_COMMENTS) {
			return imagePath.newsfeed_focus;
		} else if (_name === SysEnum.WINDOWS_AND_STATES.DIRECT_CONTACTS) {
			return imagePath.timeline_focus;
		} else if (_name === SysEnum.WINDOWS_AND_STATES.GROUP_EVENTS) {
			return imagePath.group_focus;
		}
	}

	//Upper toolbar's views
	var upperToolView = require('ui/upperToolbar/excluding_right_btn');
	var toolView = new upperToolView(getWindowIcon(_title), (_title === SysEnum.WINDOWS_AND_STATES.POST_COMMENTS || _title === SysEnum.WINDOWS_AND_STATES.GROUP_POST_COMMENTS) ? SysEnum.WINDOWS_AND_STATES.COMMENTS_LIST : _title, _dimentions.toolViewHeight);
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

	//Listview template for comment list
	var Template = require('ui/community/comment_template/comment_list_template');
	var commentListTemplate = new Template();

	//Listview template for Find Member from Group
	var Template = require('ui/community/template/direct_contact_template');
	var directContactsTemplate = new Template();

	//Listview template for events list
	var Template = require('ui/community/template/events');
	var template_events = new Template();

	var listView = Ti.UI.createListView({
		top : '1%',
		left : '5dp',
		right : '5dp',
		height : _dimentions.listViewHeight,
		borderRadius : 5,
		templates : {
			'comments_list' : commentListTemplate.getCommentsListTemplate(onProfileClick),
			'direct_contacts' : directContactsTemplate.getDirectContactTemplate(onProfileClick),
			'events' : template_events.getEventsTemplate()
		},
		defaultItemTemplate : 'comments_list',
		footerView : createCustomFooter()
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

		apiCall(pageIndex);

		listView.setMarker({
			sectionIndex : sectionThreshold,
			itemIndex : 0
		});
	});

	winMain.add(listView);

	function getMiscPagesUrl(_name) {
		if (_name === SysEnum.WINDOWS_AND_STATES.POST_COMMENTS) {
			return system_url.getAllComment_url(_id, pageIndex);
		} else if (_name === SysEnum.WINDOWS_AND_STATES.GROUP_POST_COMMENTS) {
			return system_url.getAllCommentForGroups_url(_id, pageIndex);
		} else if (_name === SysEnum.WINDOWS_AND_STATES.DIRECT_CONTACTS) {
			return system_url.getDirectContacts_url(_id, pageIndex);
		} else if (_name === SysEnum.WINDOWS_AND_STATES.GROUP_EVENTS) {
			return system_url.getGroupEvents_url(_id, pageIndex);
		}
	}

	//API calling to server
	function apiCall() {
		var API_Call = require('ui/apiCalling/call_with_indicator');
		new API_Call('GET', getMiscPagesUrl(_title), null, activityIndicator, function(json) {
			if (_title === SysEnum.WINDOWS_AND_STATES.POST_COMMENTS || _title === SysEnum.WINDOWS_AND_STATES.GROUP_POST_COMMENTS) {
				if (json.comments.length) {
					listView.appendSection(commentListTemplate.setDataToCommentsListTemplate(json.comments));
				}
			} else if (_title === SysEnum.WINDOWS_AND_STATES.DIRECT_CONTACTS) {
				listView.appendSection(directContactsTemplate.setDataToDirectContactTemplate(json));
			} else if (_title === SysEnum.WINDOWS_AND_STATES.GROUP_EVENTS) {
				listView.appendSection(template_events.setDataToEventsTemplate(json));
			}
		});
	}

	apiCall();

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/withoutBtmToolbar');
	new OnOrientaionChange(toolView, listView);

	winMain.addEventListener('close', function(e) {
		windowStack.pop();
		winMain = null;
	});

	return winMain;
}

module.exports = GoToMiscPages;
