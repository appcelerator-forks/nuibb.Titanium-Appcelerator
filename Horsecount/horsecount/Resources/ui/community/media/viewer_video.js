function ViewerPhoto(_id, _type, _from, navigation, windowStack) {
	var isAndroid = Ti.Platform.osname === 'android';

	//Getting activity indicator object
	var Indicator = require('ui/common/activityIndicator');
	var activityIndicator = new Indicator('40%', '50%');

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
	var toolView = new upperToolView(imagePath.photo_video_viewer_focus, 'Video Viewer', _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', closeWindow);
	winMain.add(toolView);

	var API_Call = require('ui/apiCalling/call_with_indicator');
	new API_Call('GET', system_url.getVideoByVideoId_url(_id), null, activityIndicator, function(json) {
		// Ti.API.info(json.video_link);
		videoPlayer.setUrl(json.video_link);
		// videoPlayer.play();
		update_bottom_toolbar(json.is_liked, json.video_id, json.count);
	});

	var videoPlayer = Titanium.Media.createVideoPlayer({
		height : '60%',
		width : '98%',
		backgroundColor : 'black',
		autoplay : true,
		// url : "https://horsecount-staging.s3.amazonaws.com/uploads/community/video/video/11/TEST_VIDEO_-_YouTube__360p_.mp4",
		mediaControlStyle : Titanium.Media.VIDEO_CONTROL_DEFAULT,
		scalingMode : Titanium.Media.VIDEO_SCALING_ASPECT_FIT
	});

	// videoPlayer.addEventListener('load', function(e){
	// Ti.API.log("load");
	// });

	winMain.add(videoPlayer);
	winMain.add(activityIndicator);

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

	//Icon event listener function for bottom icons.
	var API_Call_POST = require('ui/apiCalling/call_without_indicator');
	function likeEventListener(e) {
		new API_Call_POST('POST', system_url.getUpdateCountVideo_url(e.source.id, !e.source.focus), null, function(json) {
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
	btmArrayToLoad[1].addEventListener('touchend', reportVideo);

	//Bottom toolbar section
	var BtmToolbar = require('ui/bottomToolbar/btmToolbar');
	var btmToolView = new BtmToolbar(btmArrayToLoad, _dimentions.toolViewHeight);
	winMain.add(btmToolView);

	//Report event listener
	function reportVideo(e) {
		var Report = require('ui/common/reports');
		var report = new Report(e.source.id, 'community_video', windowStack);
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
