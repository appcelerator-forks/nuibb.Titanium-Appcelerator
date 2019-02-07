function PhotoGallery(_user_id, _from, _callbackForProfilePicture, _navigation, windowStack) {
	var isAndroid = Ti.Platform.osname === 'android';
	var userorGroupName = "";
	var pageIndex = 1,
	    sectionThreshold = 5;

	var screenWidthRes,
	    screenHeightRes,
	    marginLeftRight,
	    marginTopBottom,
	    imgSizeWidth,
	    imgSizeHeight;

	var JSON_DATA;

	var ViewerPhoto = require('ui/community/media/viewer_photo');

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

	var winMain;
	if (isAndroid) {
		var ActionBarItems = require('ui/android/actionbar');
		winMain = new ActionBarItems('', 'vertical');
	} else {
		var Window = require('ui/iPhone/navbar');
		winMain = new Window('', 'vertical');
	}
	winMain.orientationModes = [Titanium.UI.PORTRAIT];

	// close window on back button click
	function closeWindow() {
		winMain.close();
	}

	//Upper toolbar's views
	var upperToolView = require('ui/upperToolbar/excluding_right_btn');
	var toolView = new upperToolView(imagePath.photo_video_viewer_focus, 'Gallery', isAndroid ? '7%' : '10%');
	toolView.children[0].addEventListener('touchend', closeWindow);
	winMain.add(toolView);

	function getURL() {
		// pageIndex += 1;
		return _from === 'normal' || _from === 'profile_image_selection' ? system_url.getImagesForContact_url(_user_id, pageIndex) : system_url.getImagesForGroup_url(_user_id, pageIndex);
	}

	var API_Call = require('ui/apiCalling/call_without_indicator');

	function getImagesFromWS(state) {
		new API_Call('GET', getURL(), null, function(json) {
			JSON_DATA = json;

			if ( typeof json.name != 'undefined' && pageIndex === 1) {
				userorGroupName = json.name;
				lUsername.setText("Photos of " + userorGroupName);
				gridViewInit(JSON_DATA);
			} else if (state === 'marker') {
				setImageToGridView(json);
			}
		});
	}

	listViewInit();
	getImagesFromWS();

	var listView = Ti.UI.createListView({
		height : '91%',
		width : Ti.UI.FILL,
		separatorColor : "#FFF",
		templates : {
			'image_load' : getListViewTemplate(eventListenerForImage)
		},
		defaultItemTemplate : 'image_load'
	});

	// Set the initial item threshold
	listView.setMarker({
		sectionIndex : sectionThreshold,
		itemIndex : 0
	});

	//Load more data and set a new threshold when item threshold is reached
	listView.addEventListener('marker', function(e) {
		pageIndex++;
		sectionThreshold = sectionThreshold + 6;

		getImagesFromWS('marker');

		//reset listview marker after pagination
		listView.setMarker({
			sectionIndex : sectionThreshold,
			itemIndex : 0
		});
	});

	var vParentViewHolder = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		layout : 'vertical',
		left : '2%',
		right : '2%',
		top : '1%',
		backgroundColor : '#FFF',
		borderRadius : '5dp',
		borderColor : '#177ba5',
		borderWidth : '1.5dp'
	});

	var vUsernameBar = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		backgroundColor : '#c7eafb'
	});

	var txtForlUsername = "";
	if (userorGroupName) {
		txtForlUsername = "Photos of " + userorGroupName;
	}
	var lUsername = Ti.UI.createLabel({
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		text : txtForlUsername,
		color : '#36A9E1',
		font : {
			fontWeight : 'bold'
		},
		left : '10dp',
		top : '5dp',
		bottom : '5dp'
	});

	vUsernameBar.add(lUsername);
	vParentViewHolder.add(vUsernameBar);

	vParentViewHolder.add(listView);

	winMain.add(vParentViewHolder);

	/*
	 * Additional Methods
	 */

	function listViewInit() {
		screenWidthRes = Ti.Platform.displayCaps.platformWidth;
		screenHeightRes = Ti.Platform.displayCaps.platformHeight;
		// Ti.API.log("Screen Width = " + screenWidthRes + " Screen Height = " + screenHeightRes);

		if (isAndroid) {
			imgSizeWidth = '70dp';
			imgSizeHeight = '50dp';
			// For Screen width greater than 480 pixel
			if (screenWidthRes >= 480 && screenWidthRes < 768) {
				// Ti.API.log("Applying settings for screen width: " + screenWidthRes);
				marginLeftRight = '25dp';
				marginTopBottom = '10dp';
			} else if
			// For Screen width greater than 768 pixel
			(screenWidthRes >= 768 && screenWidthRes < 1080) {
				// Ti.API.log("Applying settings for screen width: " + screenWidthRes);
				marginLeftRight = '20dp';
				marginTopBottom = '10dp';
			} else if
			// For Screen width greater than 1080 pixel
			(screenWidthRes == 1080) {
				// Ti.API.log("Applying settings for screen width: " + screenWidthRes);
				marginLeftRight = '15dp';
				marginTopBottom = '10dp';
			} else {
				// For Screen width less than 480 pixels.
				// Ti.API.log("Applying settings for screen width: " + screenWidthRes);
				marginLeftRight = '25dp';
				marginTopBottom = '10dp';
			}

		} else {
			// Ti.API.log("Applying settings for screen width: " + screenWidthRes);
			imgSizeWidth = '70dp';
			imgSizeHeight = '50dp';
			marginLeftRight = '25dp';
			marginTopBottom = '10dp';
		}
	}

	function gridViewInit(json) {
		// Ti.API.log(json.community_images[0]);

		if (json.total_images == 0)
			alert("There is no image in " + userorGroupName);
		else
			setImageToGridView(json);

	}

	/**
	 * Get the GridView from given image height, image width and margin between images
	 */
	function setImageToGridView(json) {
		/*
		 * This null check is a must! Otherwise, the pagination will fail when there is no data in server.
		 */
		if (json.images) {
			listView.appendSection(setDataToListView(json));
		}
	}

	function eventListenerForImage(e) {
		var image_id = e.bindId === 'image_01' ? e.section.getItems()[0].properties.image_one_id : e.bindId === 'image_02' ? image_id = e.section.getItems()[0].properties.image_two_id : e.bindId === 'image_03' ? image_id = e.section.getItems()[0].properties.image_three_id : 0;

		if (_from === 'profile_image_selection') {

			var API_Call_POST = require('ui/apiCalling/call_without_indicator');
			var params = {
				image_id : image_id
			};
			new API_Call_POST('POST',system_url.getProfileImageByChoose_url(), params, function(json) {
				_callbackForProfilePicture(json);
				winMain.close();
			});

		} else {
			_type = 'image';
			_from = 'normal';

			var viewerPhoto = new ViewerPhoto(image_id, _type, _from, _navigation, windowStack);

			isAndroid ? viewerPhoto.open() : _navigation.openWindow(viewerPhoto);
		}

	}

	function getListViewTemplate(eventListener) {
		return {

			childTemplates : [{
				type : 'Ti.UI.View',
				bindId : 'image_01_holder',
				properties : {
					backgroundColor : '#000',
					height : imgSizeHeight,
					width : imgSizeWidth,
					left : marginLeftRight
				},
				childTemplates : [{
					type : 'Ti.UI.ImageView',
					bindId : 'image_01',
					properties : {
						// backgroundColor : '#FFF'
					},
					events : {
						click : eventListener
					}
				}]
			}, {
				type : 'Ti.UI.View',
				bindId : 'image_02_holder',
				properties : {
					backgroundColor : '#000',
					height : imgSizeHeight,
					width : imgSizeWidth
				},
				childTemplates : [{
					type : 'Ti.UI.ImageView',
					bindId : 'image_02',
					properties : {
						// backgroundColor : '#FFF'
					},
					events : {
						click : eventListener
					}
				}]
			}, {
				type : 'Ti.UI.View',
				bindId : 'image_03_holder',
				properties : {
					backgroundColor : '#000',
					height : imgSizeHeight,
					width : imgSizeWidth,
					right : marginLeftRight
				},
				childTemplates : [{
					type : 'Ti.UI.ImageView',
					bindId : 'image_03',
					properties : {
						// backgroundColor : '#FFF',
					},
					events : {
						click : eventListener
					}
				}]
			}],
			properties : {
				height : Ti.UI.SIZE,
				backgroundColor : '#FFF',
				top : marginTopBottom,
				bottom : marginTopBottom
			}
		};
	}

	var imageOne = "",
	    imageOneId = "",
	    imageTwo = "",
	    imageTwoId = "",
	    imageThree = "",
	    imageThreeId = "";
	var alreadyLoadedImageCount = 0;

	function setDataToListView(json) {
		var sections = [];
		var innerCounter = 0;
		//json.total_images = 9;
		// Ti.API.log(json.total_images);
		var imageArrayLength = json.images.length;
		for (var i = 0; i < imageArrayLength; i++) {

			if (innerCounter === 0) {
				// Ti.API.log(0);
				innerCounter++;
				imageOne = system_url.getHostUrl() + json.images[i].image_url;
				imageOneId = json.images[i].image_id;
			} else if (innerCounter === 1) {
				// Ti.API.log(1);
				innerCounter++;
				imageTwo = system_url.getHostUrl() + json.images[i].image_url;
				imageTwoId = json.images[i].image_id;
			} else if (innerCounter === 2) {
				// Ti.API.log(2);
				innerCounter = 0;
				imageThree = system_url.getHostUrl() + json.images[i].image_url;
				imageThreeId = json.images[i].image_id;
				/*
				 * Start pushing data to section when innerCounter's value hits 3.
				 */
				sections.push(setDataToSection());
			}

			/*
			 * If the total_images count gets equals to alreadyLoadedImageCount
			 * AND the total_images count not equals to 0 when mod with 3,
			 * push the data to section for last time and break the loop.
			 */
			if (json.total_images - 1 == alreadyLoadedImageCount && json.total_images % 3 != 0) {
				sections.push(setDataToSection());
				break;
			} else {
				/*
				 * Or else, simply update the alreadyLoadedImageCount's value by increasing it value 1.
				 */
				alreadyLoadedImageCount++;
			}

		}
		return sections;
	}

	function setDataToSection() {

		var section = Ti.UI.createListSection();
		section.setItems([{
			template : 'image_load',
			image_01 : {
				image : imageOne
			},
			image_01_holder : {
				backgroundColor : imageOne === "" ? '#FFF' : '#000'
			},
			image_02 : {
				image : imageTwo
			},
			image_02_holder : {
				backgroundColor : imageTwo === "" ? '#FFF' : '#000'
			},
			image_03 : {
				image : imageThree
			},
			image_03_holder : {
				backgroundColor : imageThree === "" ? '#FFF' : '#000'
			},
			properties : {
				selectionStyle : isAndroid ? "" : Titanium.UI.iPhone.ListViewCellSelectionStyle.NONE,
				image_one_id : imageOneId,
				image_two_id : imageTwoId,
				image_three_id : imageThreeId
			}
		}]);

		imageOne = "";
		imageOneId = "";
		imageTwo = "";
		imageTwoId = "";
		imageThree = "";
		imageThreeId = "";

		return section;
	}


	winMain.addEventListener('close', function(e) {
		windowStack.pop();
		winMain = null;
	});

	return winMain;

}

module.exports = PhotoGallery;
