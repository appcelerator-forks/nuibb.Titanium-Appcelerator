function PostCommentView(_post_id, _from, windowStack, go_to_friend_profile) {
	var isAndroid = Ti.Platform.osname === 'android';
	//Pagination related
	var pageIndex = 1,
	    sectionThreshold = 10;

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

	var winMain;
	if (isAndroid) {
		var ActionBarItems = require('ui/android/actionbar');
		winMain = new ActionBarItems('', 'vertical');
		winMain.windowSoftInputMode = Titanium.UI.Android.SOFT_INPUT_ADJUST_PAN;
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
	var toolView = new upperToolView(imagePath.newsfeed_focus, "Comment", _dimentions.toolViewHeight);
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

	//Listview default template
	var Template = require('ui/community/comment_template/comment_textfield_template');
	var newCommentTemplate = new Template(postCommentCallback);

	//Listview template for comment list
	var Template = require('ui/community/comment_template/comment_list_template');
	var commentListTemplate = new Template();

	var listView = Ti.UI.createListView({
		top : '1%',
		left : '5dp',
		right : '5dp',
		height : _dimentions.listViewHeight,
		borderRadius : 5,
		templates : {
			'new_comment' : newCommentTemplate,
			'comments_list' : commentListTemplate.getCommentsListTemplate(onProfileClick)

		},
		defaultItemTemplate : 'new_comment'
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

		listView.setMarker({
			sectionIndex : sectionThreshold,
			itemIndex : 0
		});
	});

	winMain.add(listView);

	//Resetting section threshold for new tab clicking
	function setSectionThreshold() {
		listView.setSections([]);
		pageIndex = 1;
		sectionThreshold = 9;
		listView.setMarker({
			sectionIndex : sectionThreshold,
			itemIndex : 0
		});
	}

	//Insert new comment to the listview
	function postCommentCallback(param) {
		var API_Call_POST = require('ui/apiCalling/call_without_indicator');
		new API_Call_POST('POST', getURL('push'), param, function(json) {
			if (json.is_success) {
				setSectionThreshold();
				setListViewNewComment();
				getDataFromWebservice(pageIndex);
			}
		});
	}

	function getURL(_type) {
		if (_type === 'pull')
			return _from === 'normal' ? system_url.getAllComment_url(_post_id, pageIndex) : system_url.getAllCommentGroup_url(_post_id, pageIndex);
		else if (_type === 'push')
			return _from === 'normal' ? system_url.getPostComment_url(_post_id) : system_url.getPostCommentGroup_url(_post_id);
	}

	/*
	 * Get all comments through invoking the corresponding web service
	 */
	function getDataFromWebservice(pageIndex) {
		var Indicator = require('ui/common/activityIndicator');
		var activityIndicator = new Indicator('35%', '10%');
		var API_Call = require('ui/apiCalling/call_with_indicator');
		new API_Call('GET', getURL('pull'), null, activityIndicator, function(json) {
			if (json.comments.length) {
				listView.appendSection(commentListTemplate.setDataToCommentsListTemplate(json.comments));
			}
		});
	}

	//First section with text field in list view
	function setListViewNewComment() {
		var section = Ti.UI.createListSection();
		section.setItems([{
			template : 'new_comment',
			comment_text : {
				value : ''
			}
		}]);
		listView.appendSection(section);
	}

	//Get data from api call
	setListViewNewComment();
	getDataFromWebservice(pageIndex);

	winMain.addEventListener('close', function(e) {
		windowStack.pop();
		winMain = null;
	});

	return winMain;

}

module.exports = PostCommentView;

