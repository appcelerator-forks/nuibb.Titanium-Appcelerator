function ViewerPhoto(_id, _type, _from, navigation, windowStack) {
	var isAndroid = Ti.Platform.osname === 'android';
	//Get Images path object
	var imagePath;
	if (isAndroid) {
		var ImagesObject = require('ui/android/imagesPath');
		imagePath = new ImagesObject();
	} else {
		var ImagesObject = require('ui/iPhone/imagesPath');
		imagePath = new ImagesObject();
	}

	//Get all System URLs
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();

	// Dimension object
	var Dimentions = require('dimension/withBtmToolbar');
	var _dimentions = new Dimentions();

	//Window object
	var winMain;
	if (isAndroid) {
		var ActionBarItems = require('ui/android/actionbar');
		winMain = new ActionBarItems('', 'composite');
	} else {
		var Window = require('ui/iPhone/navbar');
		winMain = new Window('', 'composite');
	}
	// close window on back button click
	function closeWindow() {
		winMain.close();
	}

	//Upper toolbar's views
	var upperToolView = require('ui/upperToolbar/excluding_right_btn');
	var toolView = new upperToolView(imagePath.photo_video_viewer_focus, 'Photo Viewer', _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', closeWindow);
	winMain.add(toolView);

	var scrollableView = Titanium.UI.createScrollableView({
		backgroundColor : '#000',
		borderRadius : 1,
		height : '70%',
		width : '98%',
		contentWidth : Ti.UI.SIZE,
		contentHeight : Ti.UI.SIZE,
		// showHorizontalScrollIndicator : true,
		minZoomScale : 0, // your view can not zoom out smaller then 100%
		maxZoomScale : 1,

		showPagingControl : true,
		pagingControlColor : '#36A9E1'
	});

	winMain.add(scrollableView);

	var url;
	if (_from === 'groups') {
		if (_type === 'post') {
			url = system_url.getGroupImageByPostId_url(_id);
		} else if (_type === 'image') {
			url = system_url.getImageByImageId_url(_id);
		}
	} else {
		if (_type === 'post') {
			url = system_url.getImageByPostId_url(_id);
		} else if (_type === 'image') {
			url = system_url.getImageByImageId_url(_id);
		}
	}

	//This flagForScroll is required to skip unnecessary calls while scrolling the image.
	scrollableView.addEventListener('scrollend', function(e) {
		update_bottom_toolbar(e.view.is_liked, e.view.id, e.view.count);
	});

	//Icon event listener function for bottom icons.
	var API_Call_POST = require('ui/apiCalling/call_without_indicator');
	function likeEventListener(e) {
		new API_Call_POST('POST', system_url.getUpdateCountImage_url(e.source.id, !e.source.focus), null, function(json) {
			if (json.is_success) {
				var _count = btmArrayToLoad[2].children[0].text;
				e.source.focus ? _count-- : _count++;
				update_bottom_toolbar(!e.source.focus, e.source.id, _count);
			}
		});
	}

	/*
	 * Bottom Toolbar
	 */
	var BottomArrayMedia = require('ui/community/array_of_bottom_icons_media');
	var btmArrayToLoad = new BottomArrayMedia();
	btmArrayToLoad[0].addEventListener('touchend', likeEventListener);
	btmArrayToLoad[1].addEventListener('touchend', reportImage);

	//Bottom toolbar section
	var BtmToolbar = require('ui/bottomToolbar/btmToolbar');
	var btmToolView = new BtmToolbar(btmArrayToLoad, _dimentions.toolViewHeight);
	winMain.add(btmToolView);

	//Update Bottom toolbar
	function update_bottom_toolbar(_isLike, _id, _count) {
		btmArrayToLoad[0].focus = _isLike;
		btmArrayToLoad[0].id = _id;
		btmArrayToLoad[1].id = _id;
		btmArrayToLoad[2].children[0].text = _count;
		if (_isLike) {
			btmArrayToLoad[0].image = imagePath.like_already_focus;
		} else {
			btmArrayToLoad[0].image = imagePath.like_blur;
		}
	}

	//API calling
	var API_Call = require('ui/apiCalling/call_without_indicator');
	new API_Call('GET', url, null, function(json) {
		if (json) {
			setImageFromJSON(json);
		}
	});

	function setImageFromJSON(json) {
		for (var i = 0,
		    j = json.length; i < j; i++) {

			var imageView = Titanium.UI.createImageView({
				id : json[i].image_id,
				image : system_url.getHostUrl() + json[i].image_link,
				count : json[i].count,
				is_liked : json[i].is_liked
			});

			scrollableView.addView(imageView);

			if (i == 0) {
				update_bottom_toolbar(json[i].is_liked, json[i].image_id, json[i].count);
			}
		}
	}

	function reportImage(e) {
		var Report = require('ui/common/reports');
		var report = new Report(e.source.id, 'community_image', windowStack);
		windowStack.push(report);
		isAndroid ? report.open() : navigation.openWindow(report);
	}

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/upper_bottom_toolbar');
	new OnOrientaionChange(toolView, btmToolView);

	winMain.addEventListener('close', function(e) {
		windowStack.pop();
		winMain = null;
	});

	return winMain;
}

module.exports = ViewerPhoto;
