function Community(_title, _navigation, windowStack) {
	var isAndroid = Ti.Platform.osname === 'android';
	var pageIndex = 1,
	    sectionThreshold = 9;

	var param = {};
	var isNewPostEventListenerExist = true;

	/*
	* ==================================================================================================================================================
	* Importing necessary Modules
	* ==================================================================================================================================================
	*/
	//Get System URLs for API calling
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();

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

	//Getting activity indicator object
	var Indicator = require('ui/common/activityIndicator');
	var activityIndicator = new Indicator('35%', '10%');

	//Get all windows and states
	var SysEnum = require('ui/community/wrapper_classes/system_enums');

	/*
	* ************************* ListView Templates ********************************************
	*/

	//Listview default template that includes profile pic, post text, count icons and footer link
	var Template = require('ui/community/template/post_without_image');
	var template_post_without_image = new Template();

	//Listview template for posting with image that includes profile pic, post text, post image, count icons and footer link
	var Template = require('ui/community/template/post_with_image');
	var template_post_with_image = new Template();

	//Listview template for share block at the top of each listview's section
	var Template = require('ui/community/template/share_block');
	var template_share_block = new Template(go_to_friend_profile);

	//Listview default template that includes profile pic, post text, count icons and footer link
	var Template = require('ui/community/template/shared_without_image');
	var template_shared_without_image = new Template();

	//Listview template for posting with image that includes profile pic, post text, post image, count icons and footer link
	var Template = require('ui/community/template/shared_with_image');
	var template_shared_with_image = new Template();

	//Listview template for profile info with timeline footer link
	var Template = require('ui/community/template/profile_block');
	var template_profile_block = new Template();

	//Listview template for groups list
	var Template = require('ui/community/template/groups_list');
	var template_groups_list = new Template();

	//Listview template for groups list
	var Template = require('ui/community/template/group_block');
	var template_group_block = new Template();

	//Listview template for birthday lists
	var Template = require('ui/community/template/birthday');
	var template_birthday = new Template();

	//Listview template for events list
	var Template = require('ui/community/template/events');
	var template_events = new Template();

	/*
	* ************************* ListView section footers********************************************
	*/

	//List view section's footer view for news feed
	var newsfeedSectionFooter = require('ui/community/newsfeed_section_footer');

	//List view section's footer view for personal timeline
	var profileSectionFooter = require('ui/community/profile_section_footer');

	//List view section's footer view for group
	var groupSectionFooter = require('ui/community/group_section_footer');

	//Image and Video viewer and Photo Gallery
	var ViewerVideo = require('ui/community/media/viewer_video');
	var ViewerPhoto = require('ui/community/media/viewer_photo');
	var PhotoGallery = require('ui/community/media/photo_gallery');

	//Wrapper Classes
	var CommunityWrapperClass = require('ui/community/wrapper_classes/community_wrapper');
	var communityWrapperClass = new CommunityWrapperClass();

	/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	 * Main Code goes beyond this point
	 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	 */

	var STATE = SysEnum.WINDOWS_AND_STATES.NEWSFEED;

	var win;
	if (isAndroid) {
		var Window = require('ui/android/actionbar');
		win = new Window('', 'composite');
	} else {
		var Window = require('ui/iPhone/navbar');
		win = new Window('', 'composite');
	}

	//Always back to news feed tab from another tab on backbutton click
	function back_to_newsfeed() {
		STATE = SysEnum.WINDOWS_AND_STATES.NEWSFEED;
		defuse_focused_icon();
		btmArrayToLoad[0].image = imagePath.newsfeed_focus;
		btmArrayToLoad[0].focus = true;
		update_upperToolbar(imagePath.newsfeed_focus, STATE);
		setSectionThreshold();
		apiCall(STATE);
	}

	//Function of back to the main tab if main tab is not focused while clicking navigation back button, otherwise back to the main window
	function closeWindow() {
		if (btmArrayToLoad[2].focus) {
			if (STATE === SysEnum.WINDOWS_AND_STATES.PROFILE_BY_ID) {
				STATE = SysEnum.WINDOWS_AND_STATES.GROUP;
				update_upperToolbar(imagePath.group_focus, STATE);
				reset_window(STATE, param.saved_group_id);
			} else if (STATE === SysEnum.WINDOWS_AND_STATES.GROUP) {
				STATE = SysEnum.WINDOWS_AND_STATES.GROUP_LIST;
				setSectionThreshold();
				update_upperToolbar(imagePath.group_focus, STATE);
				apiCall(STATE);
			} else {
				back_to_newsfeed();
			}
		} else if (STATE !== SysEnum.WINDOWS_AND_STATES.NEWSFEED) {
			back_to_newsfeed();
		} else {
			Ti.App.fireEvent('ModuleHiding');
			win.close();
		}
	}

	//Event listener for right button of upper toolbar
	function onRightBtnClick(e) {
		var _from,
		    _userOrGroupId,
		    imageLink = param.image;
		if (STATE === "Group") {
			_from = "group";
			_userOrGroupId = param.saved_group_id;
		} else {
			_from = "newsfeed";
			_userOrGroupId = system_url.getCurrentUserId();
		}
		var NewsFeedPostNew = require('ui/community/news_feed_post_new');
		var newsFeedNew = new NewsFeedPostNew(_userOrGroupId, _from, imageLink, _navigation, windowStack);
		windowStack.push(newsFeedNew);
		isAndroid ? newsFeedNew.open() : _navigation.openWindow(newsFeedNew);
	}

	//Upper toolbar's views
	var ToolBar = require('ui/upperToolbar/including_right_btn');
	var upperToolView = new ToolBar(imagePath.newsfeed_focus, SysEnum.WINDOWS_AND_STATES.NEWSFEED, imagePath.newpost_blur, _dimentions.toolViewHeight);
	upperToolView.children[0].addEventListener('touchend', closeWindow);
	upperToolView.children[2].addEventListener('touchend', onRightBtnClick);
	win.add(upperToolView);

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

	//Get specific Url for highlighted tab
	function getUrlForTab(_index, _state) {
		if (_state === SysEnum.WINDOWS_AND_STATES.NEWSFEED) {
			return system_url.getNewsfeedPosts_url(_index);
		} else if (_state === SysEnum.WINDOWS_AND_STATES.PROFILE) {
			return system_url.getCurrentUserProfile_url(_index);
		} else if (_state === SysEnum.WINDOWS_AND_STATES.GROUP_LIST) {
			return system_url.getGroupList_url(_index);
		} else if (_state === SysEnum.WINDOWS_AND_STATES.EVENTS) {
			return system_url.getEventsLists_url(_index);
		} else if (_state === SysEnum.WINDOWS_AND_STATES.BIRTHDAYS) {
			return system_url.getBirthdayLists_url(_index);
		}
	}

	//API calling to get the latest blocked users list and store it.
	function apiCallForBlockUsers() {
		var API_Call = require('ui/apiCalling/call_without_indicator');
		new API_Call('GET', system_url.getBlockedUsersId_url(), null, function(json) {
			Ti.App.Properties.setObject('Block_User_IDs', json.block_user_ids);
		});
	}

	//API calling to server
	function apiCall(_state) {
		var API_Call = require('ui/apiCalling/call_with_indicator');
		new API_Call('GET', getUrlForTab(pageIndex, _state), null, activityIndicator, function(json) {
			fill_With_Data(_state, json);
		});
	}

	//API calling to server
	function apiCallById(_state, _id) {
		var _url = _state === SysEnum.WINDOWS_AND_STATES.PROFILE_BY_ID ? system_url.getFriendProfile_url(pageIndex, _id) : system_url.getGroup_url(pageIndex, _id);
		var API_Call = require('ui/apiCalling/call_with_indicator');
		new API_Call('GET', _url, null, activityIndicator, function(json) {
			fill_With_Data(_state, json);
		});
	}

	//Click event listener to change profile photo only in timeline window
	function onProfileClick(e) {
		if ((STATE === SysEnum.WINDOWS_AND_STATES.PROFILE || STATE === SysEnum.WINDOWS_AND_STATES.PROFILE_BY_ID) && (param.id == Ti.App.Properties.getObject('Current_User_Data').id)) {
			if (btmActionbar.visible) {
				btmActionbar.visible = false;
			} else {
				btmActionbar.visible = true;
			}
		}
	}

	//Go to community linked pages
	function go_to_linked_pages(_title, _id) {
		var MiscPages = require('ui/community/linkWindow');
		var _linkPage = new MiscPages(_title, _id, windowStack, reset_window);
		windowStack.push(_linkPage);
		isAndroid ? _linkPage.open() : _navigation.openWindow(_linkPage);
	}

	//Go to friend's profile page on click of news feed or timeline's post profile icon
	function go_to_friend_profile(e) {
		var item = e.section.getItemAt(e.itemIndex);
		if (e.bindId === "profile_pic" || e.bindId === "profile_name") {
			STATE = SysEnum.WINDOWS_AND_STATES.PROFILE_BY_ID;
			e.section.getItems().length === 1 ? reset_window(STATE, e.section.getItems()[0].properties.user_id) : reset_window(STATE, e.section.getItems()[1].properties.user_id);
		} else if (e.bindId === "post_owner") {
			STATE = SysEnum.WINDOWS_AND_STATES.PROFILE_BY_ID;
			reset_window(STATE, e.section.getItems()[0].properties.shared_by);
		} else if (e.bindId === "shared_from") {
			STATE = SysEnum.WINDOWS_AND_STATES.PROFILE_BY_ID;
			reset_window(STATE, e.section.getItems()[0].properties.shared_from);
		} else if (e.bindId === "comment_pic" || e.bindId === "comment_count") {
			var _counts = e.section.getItems().length === 1 ? e.section.getItems()[0].comment_count.text : e.section.getItems()[1].comment_count.text;
			if (_counts) {
				var _id = e.section.getItems().length === 1 ? e.section.getItems()[0].properties.itemId : e.section.getItems()[1].properties.itemId;
				if (STATE === SysEnum.WINDOWS_AND_STATES.GROUP) {
					go_to_linked_pages(SysEnum.WINDOWS_AND_STATES.GROUP_POST_COMMENTS, _id);
				} else {
					go_to_linked_pages(SysEnum.WINDOWS_AND_STATES.POST_COMMENTS, _id);
				}
			} else {
				alert('There is no comment in the server for this post');
			}
		} else if (e.bindId === 'post_image' || e.bindId === 'post_image_shared') {
			var _id = e.bindId === 'post_image_shared' ? e.section.getItems()[0].properties.shared_id : item.properties.itemId;
			var _type = e.bindId === 'post_image_shared' ? 'image' : 'post';
			var _from = STATE === "Group" ? "groups" : "normal";

			var viewer = e.section.getItems()[0].properties.shareable_type === 'Community::Video' ? new ViewerVideo(_id, _type, _from, _navigation, windowStack) : new ViewerPhoto(_id, _type, _from, _navigation, windowStack);
			windowStack.push(viewer);
			isAndroid ? viewer.open() : _navigation.openWindow(viewer);
		}
	}

	//Reset listview
	function reset_window(_state, _id) {
		setSectionThreshold();
		param.id = _id;
		STATE = _state;
		apiCallById(_state, _id);
	}

	//Go to a group page of current user
	function go_to_a_group(e) {
		STATE = SysEnum.WINDOWS_AND_STATES.GROUP;
		update_upperToolbar(imagePath.group_focus, STATE);
		param.saved_group_id = e.itemId;
		reset_window(STATE, e.itemId);
	}

	//Adding list view to the window and implementing it's eventlistener
	var listView = Ti.UI.createListView({
		left : '5dp',
		right : '5dp',
		top : _dimentions.listViewTop,
		height : Ti.UI.FILL,
		borderRadius : 5,
		templates : {
			'postWithImage' : template_post_with_image.getPostWithImageTemplate(go_to_friend_profile),
			'postWithoutImage' : template_post_without_image.getPostWithoutImageTemplate(go_to_friend_profile),
			'share_block' : template_share_block,
			'shareWithImage' : template_shared_with_image.getSharedWithImageTemplate(go_to_friend_profile),
			'shareWithoutImage' : template_shared_without_image.getSharedWithoutImageTemplate(go_to_friend_profile),
			'profile_block' : template_profile_block.getProfileBlockTemplate(onProfileClick),
			'groups_list' : template_groups_list.getGroupListTemplate(go_to_a_group),
			'group_block' : template_group_block.getGroupBlockTemplate(),
			'birthday' : template_birthday.getBirthdayTemplate(),
			'events' : template_events.getEventsTemplate()
		},
		defaultItemTemplate : 'postWithoutImage',
		footerView : createCustomFooter()
	});

	win.add(listView);

	// Set the initial item threshold
	listView.setMarker({
		sectionIndex : sectionThreshold,
		itemIndex : 0
	});

	//Load more data and set a new threshold when item threshold is reached
	listView.addEventListener('marker', function(e) {
		pageIndex++;
		sectionThreshold = sectionThreshold + 10;

		//Call api with pagination
		if (STATE === SysEnum.WINDOWS_AND_STATES.GROUP || STATE === SysEnum.WINDOWS_AND_STATES.PROFILE_BY_ID) {
			apiCallById(STATE, param.id);
		} else {
			apiCall(STATE);
		}

		//reset listview marker after pagination
		listView.setMarker({
			sectionIndex : sectionThreshold,
			itemIndex : 0
		});
	});

	//report callback function
	function onReportBtnClick(_id) {
		var Report = require('ui/common/reports');
		var _report = STATE === SysEnum.WINDOWS_AND_STATES.GROUP ? new Report(_id, 'community_group', windowStack) : new Report(_id, 'community_post', windowStack);
		windowStack.push(_report);
		isAndroid ? _report.open() : _navigation.openWindow(_report);
	}

	//New comment callback function
	function onCommentBtnClick(_id) {
		var PostComment = require('ui/community/post_comment_view');
		var _from = STATE === SysEnum.WINDOWS_AND_STATES.GROUP ? 'group' : 'normal';
		var postComment = new PostComment(_id, _from, windowStack, reset_window);
		windowStack.push(postComment);
		isAndroid ? postComment.open() : _navigation.openWindow(postComment);
	}

	/*
	 * Function to update the count image of a post
	 */
	function onLikeBtnClick(e) {
		var urlToHit = STATE === SysEnum.WINDOWS_AND_STATES.GROUP ? system_url.getUpdateCountGroup_url(e.source.id, e.source.liked) : system_url.getUpdateCount_url(e.source.id, e.source.liked);
		var API_Call = require('ui/apiCalling/call_without_indicator');
		new API_Call('POST', urlToHit, null, function(json) {
			if (!json.is_success) {
				alert('You already ' + (e.source.liked ? 'liked ' : 'disliked ') + 'this post');
			}
		});
	}

	//Select appropriate section with specific header & footer for both group and personal timeline
	function get_section(footer_view) {
		return Ti.UI.createListSection({
			footerView : footer_view
		});
	}

	//Select dymanic template to identify whether a post is a shared post or not
	function select_dynamic_template(_sections, json) {
		for (var i = 0,
		    j = json.length; i < j; i++) {
			//Get section for a post with like button, report button and comment button at the footer
			var section = get_section(new newsfeedSectionFooter(json[i].post_id, json[i].is_liked, onLikeBtnClick, onReportBtnClick, onCommentBtnClick));

			if (!json[i].shared) {
				if (json[i].image_url) {
					section.setItems(template_post_with_image.setDataToPostWithImageTemplate(json[i]));
				} else {
					section.setItems(template_post_without_image.setDataToPostWithoutImageTemplate(json[i]));
				}
			} else {
				if (json[i].shared.shared_link) {
					section.setItems(template_shared_with_image.setDataToSharedWithImageTemplate(json[i]));
				} else {
					section.setItems(template_shared_without_image.setDataToSharedWithoutImageTemplate(json[i]));
				}
			}
			_sections.push(section);
		}
		return _sections;
	}

	//Alert Message function
	function alertMessage(_title, msg) {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : _title,
			message : msg,
			buttonNames : ['OK']
		});
		alertDialog.show();
	}

	//Adding all the sections to the listview
	function addSectionsToListView(_sections) {
		if (pageIndex === 1) {
			listView.setSections(_sections);
		} else {
			listView.appendSection(_sections);
		}
	}

	//Function of filling list view section by json data
	function fill_With_Data(_state, json) {
		var sections = [];
		if (_state === SysEnum.WINDOWS_AND_STATES.NEWSFEED) {
			param.image = system_url.getCurrentUserPic();
			addSectionsToListView(select_dynamic_template(sections, json));
		} else if (_state === SysEnum.WINDOWS_AND_STATES.PROFILE || _state === SysEnum.WINDOWS_AND_STATES.PROFILE_BY_ID) {
			if (json.about_us) {
				if (json.is_current_user) {
					update_upperToolbar(imagePath.timeline_focus, json.about_us.full_name);
				} else {
					update_upperToolbar(imagePath.timeline_blur, json.about_us.full_name);
				}

				var _section = get_section(new profileSectionFooter(json.about_us.user_id, windowStack, _navigation, reset_window));
				_section.setItems(template_profile_block.setDataToProfileBlockTemplate(json.about_us));
				sections.push(_section);
			}
			addSectionsToListView(select_dynamic_template(sections, json.posts));
		} else if (_state === SysEnum.WINDOWS_AND_STATES.GROUP_LIST) {
			if (json.length) {
				sections.push(template_groups_list.setDataToGroupListTemplate(json));
				addSectionsToListView(sections);
			} else {
				alertMessage('Message!', 'There is no Group in the server.');
			}
		} else if (_state === SysEnum.WINDOWS_AND_STATES.EVENTS) {
			if (json.length) {
				sections.push(template_events.setDataToEventsTemplate(json));
				addSectionsToListView(sections);
			} else {
				alertMessage('Message!', 'There is no Event in the server.');
			}
		} else if (_state === SysEnum.WINDOWS_AND_STATES.BIRTHDAYS) {
			if (json.length) {
				sections.push(template_birthday.setDataToBirthdayTemplate(json));
				addSectionsToListView(sections);
			} else {
				alertMessage('Message!', 'There is no Birthday in the server.');
			}
		} else if (_state === SysEnum.WINDOWS_AND_STATES.GROUP) {
			if (json.about_group) {
				param.image = system_url.schema + '://' + system_url.host + json.about_group.group_photo;
				var _section = get_section(new groupSectionFooter(json.about_group.group_id, windowStack, _navigation, reset_window));
				_section.setItems(template_group_block.setDataToGroupBlockTemplate(json.about_group));
				sections.push(_section);
			}
			addSectionsToListView(select_dynamic_template(sections, json.posts));
		}
	}

	//Change upper toolbar view
	function update_upperToolbar(_icon, _name) {
		upperToolView.children[1].children[0].image = _icon;
		upperToolView.children[1].children[1].text = _name;
		if (STATE === SysEnum.WINDOWS_AND_STATES.NEWSFEED || STATE === SysEnum.WINDOWS_AND_STATES.GROUP) {
			/*Checking whether eventlistener of upper tool bar's right button is exist.
			 * If exist then don't add it again. If not then add it while changing STATE
			 * from News feed to Group or vice versa.
			 */
			if (!isNewPostEventListenerExist) {
				isNewPostEventListenerExist = true;
				upperToolView.children[2].children[0].image = imagePath.newpost_blur;
				upperToolView.children[2].addEventListener('touchend', onRightBtnClick);
			}
		} else {
			/*Checking whether eventlistener of upper tool bar's right button is exist.
			 * If exist then don't remove it again. If not then add it while changing STATE
			 * from News feed to Group or vice versa.
			 */
			if (isNewPostEventListenerExist) {
				isNewPostEventListenerExist = false;
				upperToolView.children[2].children[0].image = '';
				upperToolView.children[2].removeEventListener('touchend', onRightBtnClick);
			}
		}
	}

	//liked image at bottom toolbar
	function liked_image(e, _image) {
		defuse_focused_icon();
		e.source.focus = true;
		e.source.image = _image;
	}

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

	//Icon event listener function
	function iconEventListener(e) {
		if (e.source.id === 1 && !e.source.focus) {
			STATE = SysEnum.WINDOWS_AND_STATES.NEWSFEED;
			setSectionThreshold();
			liked_image(e, imagePath.newsfeed_focus);
			update_upperToolbar(imagePath.newsfeed_focus, STATE);
			apiCall(STATE);
		} else if (e.source.id === 2) {
			STATE = SysEnum.WINDOWS_AND_STATES.PROFILE;
			setSectionThreshold();
			liked_image(e, imagePath.timeline_focus);
			param.id = Ti.App.Properties.getObject('Current_User_Data').id;
			apiCall(STATE);
		} else if (e.source.id === 3 && !e.source.focus) {
			STATE = SysEnum.WINDOWS_AND_STATES.GROUP_LIST;
			setSectionThreshold();
			liked_image(e, imagePath.group_focus);
			update_upperToolbar(imagePath.group_focus, STATE);
			apiCall(STATE);
		} else if (e.source.id === 4 && !e.source.focus) {
			STATE = SysEnum.WINDOWS_AND_STATES.EVENTS;
			setSectionThreshold();
			liked_image(e, imagePath.event_focus);
			update_upperToolbar(imagePath.event_focus, STATE);
			apiCall(STATE);
		} else if (e.source.id === 5 && !e.source.focus) {
			STATE = SysEnum.WINDOWS_AND_STATES.BIRTHDAYS;
			setSectionThreshold();
			liked_image(e, imagePath.birthday_focus);
			update_upperToolbar(imagePath.birthday_focus, STATE);
			apiCall(STATE);
		}
	}

	//Array of botton icons
	var LoadArray = require('ui/community/arrayOfBottomIcons');
	var btmArrayToLoad = new LoadArray();

	//Bottom Icons Add Event Listener
	btmArrayToLoad[0].addEventListener('touchend', iconEventListener);
	btmArrayToLoad[1].addEventListener('touchend', iconEventListener);
	btmArrayToLoad[2].addEventListener('touchend', iconEventListener);
	btmArrayToLoad[3].addEventListener('touchend', iconEventListener);
	btmArrayToLoad[4].addEventListener('touchend', iconEventListener);

	//Selecting which bottom icon is focused now and defocus that
	function defuse_focused_icon() {
		for (var i = 0,
		    j = btmArrayToLoad.length; i < j; i++) {
			if (btmArrayToLoad[i].focus) {
				btmArrayToLoad[i].focus = false;
				if (i === 0) {
					btmArrayToLoad[i].image = imagePath.newsfeed_blur;
				} else if (i === 1) {
					btmArrayToLoad[i].image = imagePath.timeline_blur;
				} else if (i === 2) {
					btmArrayToLoad[i].image = imagePath.group_blur;
				} else if (i === 3) {
					btmArrayToLoad[i].image = imagePath.event_blur;
				} else if (i === 4) {
					btmArrayToLoad[i].image = imagePath.birthday_blur;
				}
				return;
			}
		}
	}

	//Update community page while changing prifile pic of current user
	function changeProfilePic(_response) {
		if (_response.image_id) {
			reset_window(SysEnum.WINDOWS_AND_STATES.PROFILE_BY_ID, Ti.App.Properties.getObject('Current_User_Data').id);
			btmActionbar.visible = false;
			communityWrapperClass.updateCurrentUserDataProfilePicture(_response);
		}
	}

	function btmActionbarCallback(_from, _indicator) {
		if (_from === 'upload_image') {
			if (isAndroid) {
				var UploadPhoto = require('ui/community/media/open_gallery');
				new UploadPhoto(null, 'Profile', _indicator, changeProfilePic);
			} else {
				var UploadPhoto = require('ui/community/media/camera_roll');
				var _uploadPhoto = new UploadPhoto(null, 'Profile', _navigation, windowStack, _indicator, changeProfilePic);
				windowStack.push(_uploadPhoto);
				_navigation.openWindow(_uploadPhoto);
			}
		} else {
			var photoGallery = new PhotoGallery(Ti.App.Properties.getObject('Current_User_Data').id, 'profile_image_selection', changeProfilePic, _navigation, windowStack);
			windowStack.push(photoGallery);
			isAndroid ? photoGallery.open() : _navigation.openWindow(photoGallery);
		}
	}

	//Get the block users list first and store it.
	apiCallForBlockUsers();
	//Iniatiall loading data to the news feed window
	apiCall(SysEnum.WINDOWS_AND_STATES.NEWSFEED);

	//Check whether current user like the post or not
	function like_by_current_user(_array) {
		var _length = _array.length;
		for (var i = _array.length - 1; i >= 0; i--) {
			if (_array[i] === system_url.getCurrentUserId()) {
				return true;
			}
		}
		return false;
	}

	//Update like counts in the specific listview's section
	function update_like_counts(_checkState, _attributes) {
		if ((_checkState === SysEnum.WINDOWS_AND_STATES.POST && (STATE === SysEnum.WINDOWS_AND_STATES.NEWSFEED || STATE === SysEnum.WINDOWS_AND_STATES.PROFILE || STATE === SysEnum.WINDOWS_AND_STATES.PROFILE_BY_ID)) || (_checkState === SysEnum.WINDOWS_AND_STATES.GROUP_POST && STATE === SysEnum.WINDOWS_AND_STATES.GROUP)) {
			var section_list = listView.getSections();
			for (var i = 0,
			    j = section_list.length; i < j; i++) {
				var items = section_list[i].getItems();
				if (items.length === 1) {
					if (items[0].properties.itemId === _attributes.post_id) {
						if (like_by_current_user(_attributes.post_like_ids)) {
							section_list[i].getFooterView().children[0].children[0].liked = true;
							section_list[i].getFooterView().children[0].children[0].image = imagePath.like_already_focus;
						} else {
							section_list[i].getFooterView().children[0].children[0].liked = false;
							section_list[i].getFooterView().children[0].children[0].image = imagePath.like_blur;
						}
						items[0].like_count.text = _attributes.post_likes_count;
						section_list[i].updateItemAt(0, items[0]);
						break;
					}
				} else {
					if (items[1].properties.itemId === _attributes.post_id) {
						if (like_by_current_user(_attributes.post_like_ids)) {
							section_list[i].getFooterView().children[0].children[0].liked = true;
							section_list[i].getFooterView().children[0].children[0].image = imagePath.like_already_focus;
						} else {
							section_list[i].getFooterView().children[0].children[0].liked = false;
							section_list[i].getFooterView().children[0].children[0].image = imagePath.like_blur;
						}
						items[1].like_count.text = _attributes.post_likes_count;
						section_list[i].updateItemAt(1, items[1]);
						break;
					}
				}
			}
		}
	}

	//Update listview by assigning new post at the top of the table/listview
	function assign_new_post(json) {
		var blockUserIDs = Ti.App.Properties.getObject('Block_User_IDs');
		var isUserBlocked = false;
		for (var i = 0; i < blockUserIDs.length; i++) {
			if (json.user_id == blockUserIDs[i]) {
				isUserBlocked = true;
				break;
			}
			// Ti.API.info(blockUserIDs[i]);
		}
		// Ti.API.info(json);
		if (!isUserBlocked) {
			var section = get_section(new newsfeedSectionFooter(json.post_id, false, onLikeBtnClick, onReportBtnClick, onCommentBtnClick));
			if (json.image_url) {
				section.setItems(template_post_with_image.setDataToPostWithImageTemplate(json));
			} else {
				section.setItems(template_post_without_image.setDataToPostWithoutImageTemplate(json));
			}

			if (STATE === SysEnum.WINDOWS_AND_STATES.NEWSFEED) {
				listView.insertSectionAt(0, section);
			} else if (STATE === SysEnum.WINDOWS_AND_STATES.PROFILE_BY_ID && (param.id == json.user_id)) {
				listView.insertSectionAt(1, section);
			} else if (STATE === SysEnum.WINDOWS_AND_STATES.GROUP && (json.group_id == param.saved_group_id)) {
				listView.insertSectionAt(1, section);
			}
		}
	}

	//Update listview for a new comment
	function update_comment_counts(_checkState, _attributes) {
		if ((_checkState === SysEnum.WINDOWS_AND_STATES.POST && (STATE === SysEnum.WINDOWS_AND_STATES.NEWSFEED || STATE === SysEnum.WINDOWS_AND_STATES.PROFILE || STATE === SysEnum.WINDOWS_AND_STATES.PROFILE_BY_ID)) || (_checkState === SysEnum.WINDOWS_AND_STATES.GROUP_POST && STATE === SysEnum.WINDOWS_AND_STATES.GROUP)) {
			var section_list = listView.getSections();
			for (var i = 0,
			    j = section_list.length; i < j; i++) {
				var items = section_list[i].getItems();
				if (items.length === 1) {
					if (items[0].properties.itemId === _attributes.post_id) {
						items[0].comment_count.text = _attributes.commentable_comments_count;
						section_list[i].updateItemAt(0, items[0]);
						break;
					}
				} else {
					if (items[1].properties.itemId === _attributes.post_id) {
						items[1].comment_count.text = _attributes.commentable_comments_count;
						section_list[i].updateItemAt(1, items[1]);
						break;
					}
				}
			}
		}
	}

	// Update the block users list
	function update_blocked_user_list(json) {
		var blockUserIDs = Ti.App.Properties.getObject('Block_User_IDs');
		// Ti.API.info("Before => " + blockUserIDs);
		blockUserIDs.push(json.user_id);
		Ti.App.Properties.setObject('Block_User_IDs', blockUserIDs);
		// Ti.API.info("After => " + Ti.App.Properties.getObject('Block_User_IDs'));
	}

	//Pubnub handler
	var Handler = require('ui/pubnub/pubnub_handler');
	new Handler(update_like_counts, update_comment_counts, assign_new_post, update_blocked_user_list);

	//Bottom toolbar section
	var BtmToolbar = require('ui/bottomToolbar/btmToolbar');
	var btmToolview = new BtmToolbar(btmArrayToLoad, _dimentions.toolViewHeight);
	win.add(btmToolview);

	//Action bar to change profile pic
	var ActionView = require('ui/community/btmActionbar');
	var btmActionbar = new ActionView(btmActionbarCallback);
	win.add(btmActionbar);
	btmActionbar.visible = false;

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/withBtmToolbar');
	new OnOrientaionChange(upperToolView, btmToolview, listView);

	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;
}

module.exports = Community;
