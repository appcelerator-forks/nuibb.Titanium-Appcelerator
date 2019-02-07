function PhotoGallery(_userOrGroupId, _from, _navigation, windowStack, _indicator, updateListener) {
	var isAndroid = Ti.Platform.osname === 'android';
	var MediaPickerModule = require('ti.mediapicker');

	//Dimension object
	var Dimentions = require('dimension/withoutBtmToolbar');
	var _dimentions = new Dimentions();

	//Get Images path object
	var imagePath;
	if (isAndroid) {
		var ImagesObject = require('ui/android/imagesPath');
		imagePath = new ImagesObject();
	} else {
		var ImagesObject = require('ui/iPhone/imagesPath');
		imagePath = new ImagesObject();
	}

	var winMain;
	if (isAndroid) {
		var ActionBarItems = require('ui/android/actionbar');
		winMain = new ActionBarItems('', 'vertical');
	} else {
		var Window = require('ui/iPhone/navbar');
		winMain = new Window('', 'vertical');
	}

	//Close window on back button click
	function closeWindow() {
		winMain.close();
	}

	//Upper toolbar's views
	var upperToolView = require('ui/upperToolbar/excluding_right_btn');
	var toolView = new upperToolView(imagePath.photo_video_viewer_focus, 'Gallery Type', _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', closeWindow);
	winMain.add(toolView);

	//Listview template for gallery asset list
	var Template = require('ui/community/template/gallery_assets');
	var gallery_assets = new Template();

	//Adding list view to the window and implementing it's eventlistener
	var listView = Ti.UI.createListView({
		top : '1%',
		left : '5dp',
		right : '5dp',
		height : _dimentions.listViewHeight,
		borderRadius : 5,
		templates : {
			'default' : gallery_assets.getGalleryAssetTemplate(),
		},
		defaultItemTemplate : 'default',
	});

	winMain.add(listView);

	listView.addEventListener('itemclick', function(e) {
		var UploadPhoto = require('ui/community/media/upload_photo');
		var _uploadPhoto = new UploadPhoto(_userOrGroupId, _from, e.itemId, _navigation, windowStack, _indicator, updateListener);
		windowStack.push(_uploadPhoto);
		isAndroid ? _uploadPhoto.open() : _navigation.openWindow(_uploadPhoto);
	});

	//Add camera attribute group to the listview
	try {
		MediaPickerModule.getAssetGroups({
			type : 'photos',
			success : getAssetGroups,
			error : function() {
				alert('Please allow access to photos on your device');
			}
		});
	} catch(e) {
		alert(e);
	}

	function getAssetGroups(e) {
		listView.sections = gallery_assets.setGalleryAssetTemplate(e.items);
	}

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/withoutBtmToolbar');
	new OnOrientaionChange(toolView, listView);

	winMain.addEventListener('close', function(e) {
		windowStack.pop();
		winMain = null;
	});

	return winMain;
}

module.exports = PhotoGallery;
