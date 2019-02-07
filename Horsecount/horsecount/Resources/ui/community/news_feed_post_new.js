function NewsFeedPostNew(_userOrGroupId, _from, _imageLink, _navigation, windowStack) {
	var isAndroid = Ti.Platform.osname === 'android';
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();

	var activityIndicator = Ti.UI.createActivityIndicator({
		color : '#A0A0A0',
		font : {
			fontFamily : 'Helvetica Neue',
			fontSize : '15dp',
			fontWeight : 'bold'
		},
		message : "Uploading",
		style : isAndroid ? Ti.UI.ActivityIndicatorStyle.DARK : Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		zIndex : 1000
	});

	var winMain;
	if (isAndroid) {
		var ActionBarItems = require('ui/android/actionbar');
		winMain = new ActionBarItems('', 'composite');
	} else {
		var Window = require('ui/iPhone/navbar');
		winMain = new Window('', 'composite');
	}

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

	var Utilities = require('ui/community/wrapper_classes/utils');
	var utilities = new Utilities();

	//Get all windows and states
	var SysEnum = require('ui/community/wrapper_classes/system_enums');

	var API_Call_POST = require('ui/apiCalling/call_without_indicator');

	//close window on back button click
	function closeWindow() {
		winMain.close();
	}

	var upperToolbarTitle = SysEnum.WINDOWS_AND_STATES.NEWSFEED,
	    upperToolabarImage = imagePath.newsfeed_focus;
	if (_from === 'group') {
		upperToolbarTitle = SysEnum.WINDOWS_AND_STATES.GROUP;
		upperToolabarImage = imagePath.group_focus;
	}

	//Upper toolbar's views
	var upperToolView = require('ui/upperToolbar/excluding_right_btn');
	var toolView = new upperToolView(upperToolabarImage, upperToolbarTitle, _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', closeWindow);
	winMain.add(toolView);

	//Main Content goes here.
	var vPostWhole = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		borderRadius : '2dp',
		borderWidth : '1dp',
		borderColor : '#000',
		top : _dimentions.listViewTop,
		layout : 'composite',
		backgroundColor : 'white',
		left : '2%',
		right : '2%'
	});

	// Ti.API.log(Ti.App.Properties.getObject('Current_User_Data'));
	//User's profile picture
	var imgHeightWidth = '60dp';
	var vProfilePicHolder = Ti.UI.createView({
		height : imgHeightWidth,
		width : imgHeightWidth,
		backgroundColor : '#000',
		top : '5dp',
		left : '5dp'
	});
	var ivProfilePic = Ti.UI.createImageView({
		image : _imageLink
	});
	vProfilePicHolder.add(ivProfilePic);
	vPostWhole.add(vProfilePicHolder);

	// Dummy View to extend the height
	var vDummyView = Ti.UI.createView({
		height : '50dp',
		width : imgHeightWidth,
		left : '5dp',
		bottom : '1dp',
		top : (parseFloat(imgHeightWidth) + 5) + 'dp'
	});
	vPostWhole.add(vDummyView);

	//New Post
	var _hintText = 'Write Something';
	var taPostNew = Ti.UI.createTextArea({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		backgroundColor : '#FFF',
		color : '#000',
		hintText : _hintText
		// ,
		// left : (parseFloat(imgHeightWidth) + 10) + 'dp',
		// top : '1dp',
		// right : '1dp',
		// bottom : '3dp'
	});

	//The following code is to show hintText for TextArea in iOS.
	utilities.getHintForTextAreaiOS(_hintText, taPostNew);

	// vPostWhole.add(taPostNew);

	var imageViewsHolder = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		// top : '50dp',
		// left : imgHeightWidth,
		layout : 'horizontal'
	});
	var imageDimention = '50dp';
	// var urlPrefix = "http://192.168.1.113:3001";

	function addImageToArray(json) {
		var subImageViewsHolder = Ti.UI.createView({
			height : Ti.UI.SIZE,
			width : Ti.UI.SIZE,
			layout : 'composite',
			left : '0dp',
			right : '5dp',
			bottom : '10dp'
		});
		var crossImageView = Ti.UI.createImageView({
			height : '20dp',
			width : '20dp',
			top : '0dp',
			right : '0dp',
			image : imagePath.cross_focus,
			image_id : json.image_id
		});

		crossImageView.addEventListener('click', function(e) {
			var imageId = e.source.image_id;
			var existingImagesLength = imageViewsHolder.getChildren().length;
			for (var i = 0; i < existingImagesLength; i++) {
				if (imageId === imageViewsHolder.children[i].children[1].image_id) {
					new API_Call_POST('DELETE', system_url.getStatusImageRemove_url(imageId), null, function(json) {
						if (json.is_success) {
							imageViewsHolder.remove(imageViewsHolder.children[i]);
						}
					});

					break;
				}
			}
		});

		subImageViewsHolder.add(Ti.UI.createImageView({
			height : imageDimention,
			width : imageDimention,
			image : system_url.getHostUrl() + json.image_url
		}));
		subImageViewsHolder.add(crossImageView);

		imageViewsHolder.add(subImageViewsHolder);
	}

	var vSubPostWhole = Ti.UI.createScrollView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		layout : 'vertical',
		left : (parseFloat(imgHeightWidth) + 10) + 'dp',
		top : '1dp',
		right : '1dp',
		bottom : '35dp'
	});
	
	vSubPostWhole.add(taPostNew);
	vSubPostWhole.add(imageViewsHolder);
	vPostWhole.add(vSubPostWhole);

	winMain.add(vPostWhole);

	//Post section
	var vCommentSectionWhole = Ti.UI.createView({
		backgroundColor : '#c7eafb',
		layout : 'composite',
		bottom : '0dp',
		height : _dimentions.toolViewHeight,
		width : Ti.UI.FILL
	});

	//Camera icon
	var ivCameraIcon = Ti.UI.createImageView({
		height : '30dp',
		width : '30dp',
		left : '10dp',
		image : imagePath.camera_blur
	});

	ivCameraIcon.addEventListener('click', function() {
		if (isAndroid) {
			var UploadPhoto = require('ui/community/media/open_gallery');
			new UploadPhoto(_userOrGroupId, _from, activityIndicator, addImageToArray);
		} else {
			var UploadPhoto = require('ui/community/media/camera_roll');
			var _uploadPhoto = new UploadPhoto(_userOrGroupId, _from, _navigation, windowStack, activityIndicator, addImageToArray);
			windowStack.push(_uploadPhoto);
			_navigation.openWindow(_uploadPhoto);
		}
	});

	vCommentSectionWhole.add(ivCameraIcon);
	vCommentSectionWhole.add(activityIndicator);

	//Post icon
	var ivPostIcon = Ti.UI.createImageView({
		height : '30dp',
		width : '30dp',
		right : '10dp',
		image : imagePath.mail_blur
	});

	ivPostIcon.addEventListener('click', function() {
		postStatusToWeb(taPostNew.value);
	});

	vCommentSectionWhole.add(ivPostIcon);

	winMain.add(vCommentSectionWhole);

	function postStatusToWeb(_status_value) {
		if (_status_value != "" && _status_value != "Write Something") {
			var param = {
				status : _status_value,
				accessor_id : _userOrGroupId,
				uploaded_image_ids : function() {
					var ids,
					    existingImagesLength = imageViewsHolder.getChildren().length;

					for (var i = 0; i < existingImagesLength; i++) {
						ids = i === 0 ? imageViewsHolder.children[i].children[1].image_id : ids + "," + imageViewsHolder.children[i].children[1].image_id;
					}
					return ids;
				}()
			};

			new API_Call_POST('POST', function() {
				return _from === 'newsfeed' ? system_url.getPostStatus_url() : system_url.getPostStatusGroup_url();
			}(), param, function(json) {
				if (json.is_success && winMain)
					winMain.close();
			});
		} else {
			alert("Please write something before posting");
		}
	}

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/withBtmToolbar');
	new OnOrientaionChange(toolView, vCommentSectionWhole, vPostWhole);

	winMain.addEventListener('close', function(e) {
		windowStack.pop();
		winMain = null;
	});

	return winMain;
}

module.exports = NewsFeedPostNew;
