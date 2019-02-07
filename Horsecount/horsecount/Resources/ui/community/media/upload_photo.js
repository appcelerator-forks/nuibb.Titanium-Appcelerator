function PhotoGallery(_userOrGroupId, _from, _nr, _navigation, windowStack, _indicator, updateListener) {
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

	//Get System URLs for API calling
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();

	var Utilities = require('ui/community/wrapper_classes/utils');
	var utilities = new Utilities();

	//Dimension object
	var Dimentions = require('dimension/withoutBtmToolbar');
	var _dimentions = new Dimentions();

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

	//Get all windows and states
	var SysEnum = require('ui/community/wrapper_classes/system_enums');

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
	var toolView = new upperToolView(imagePath.photo_video_viewer_focus, 'Gallery', _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', closeWindow);
	winMain.add(toolView);

	listViewInit();

	// Function to create a footer view
	var createCustomFooter = function() {
		var view = Ti.UI.createView({
			// backgroundColor : 'silver',
			width : Ti.UI.FILL,
			height : '50dp'
		});

		view.add(activityIndicator);
		return view;
	};

	var listView = Ti.UI.createListView({
		// height : '80%',
		top : '1%',
		bottom : '1%',
		left : '5dp',
		right : '5dp',
		separatorColor : "#FFF",
		backgroundColor : '#FFF',
		borderRadius : 5,
		templates : {
			'image_load' : getListViewTemplate(eventListenerForImage)
		},
		defaultItemTemplate : 'image_load',
		footerView : createCustomFooter()
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

		//reset listview marker after pagination
		listView.setMarker({
			sectionIndex : sectionThreshold,
			itemIndex : 0
		});
	});

	winMain.add(listView);

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

	function eventListenerForImage(e) {
		var windows = windowStack.concat([]);
		var _length = windows.length;
		for (var i = _length - 2; i < _length; i++) {
			(_navigation) ? _navigation.closeWindow(windows[i], {
				animated : true
			}) : windows[i].close();
		}

		var item = e.section.getItemAt(e.itemIndex);
		var _image = e.bindId === "image_01" ? item.image_01.image : e.bindId === "image_02" ? item.image_02.image : item.image_03.image;
		
		var params = {
			content_type : _image.mimeType,
			filename : utilities.getCurrentDateTime() + '.jpg',
			file_data : Ti.Utils.base64encode(_image).toString()
		};

		var API_Call = require('ui/apiCalling/call_with_indicator');
		if (_from === SysEnum.WINDOWS_AND_STATES.PROFILE) {
			new API_Call('POST', system_url.getProfileImageByUpload_url(), params, _indicator, function(json) {
				updateListener(json);
			});
		} else {
			params.image_type = _from === 'newsfeed' ? 'user' : 'group';
			params.accessor_id = _userOrGroupId;

			new API_Call('POST', system_url.getStatusImageUpload_url(), params, _indicator, function(json) {
				//Ti.API.info(json);
				updateListener(json);
			});
		}
	}

	function getListViewTemplate(eventListenerForImage) {
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
					},
					events : {
						click : eventListenerForImage
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
					},
					events : {
						click : eventListenerForImage
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
					},
					events : {
						click : eventListenerForImage
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

	function setDataToSection(_image) {
		var section = Ti.UI.createListSection();
		section.setItems([{
			template : 'image_load',
			image_01 : {
				image : _image[0]
			},
			image_02 : {
				image : _image[1]
			},
			image_02_holder : {
				backgroundColor : _image[1] ? '#000' : '#FFF'
			},
			image_03 : {
				image : _image[2]
			},
			image_03_holder : {
				backgroundColor : _image[2] ? '#000' : '#FFF'
			},
			properties : {
				selectionStyle : isAndroid ? "" : Titanium.UI.iPhone.ListViewCellSelectionStyle.NONE
			}
		}]);

		listView.appendSection(section);
	}

	function timer_function() {
		//Putting 3 images at a time in a listview section
		var isAndroid = Ti.Platform.osname === 'android';
		var images_section = [];
		var _length = param.items.length;
		for (var i = 0,
		    j = 0; i < _length; i++) {
			MediaPickerModule.getThumb({
				url : isAndroid ? param.items[i].id : param.items[i].url,
				success : function(e) {
					if (isAndroid && e.image.apiName != 'Ti.Blob') {
						try {
							var file2 = Ti.Filesystem.getFile('file://' + e.image);
							var blob = file2.read();
							images_section.push(file2.read());
						} catch(e) {
							//Ti.API.info(e);
						} finally {
							file2 = null;
							blob = null;
						}
					} else {
						images_section.push(e.image);
					}

					j++;

					if (images_section.length === 3) {
						setDataToSection(images_section);
						images_section = [];
					} else if (i === j) {
						if (images_section.length) {
							setDataToSection(images_section);
							activityIndicator.hide();
						} else {
							activityIndicator.hide();
						}
					}
				}
			});
		}
	}

	var param = {};
	var MediaPickerModule = require('ti.mediapicker');
	MediaPickerModule.getPhotos({
		nr : _nr,
		type : 'photos',
		success : function(e) {
			activityIndicator.show();
			param.items = e.items;
			setTimeout(timer_function, 1000);
		}
	});

	winMain.addEventListener('close', function(e) {
		windowStack.pop();
		winMain = null;
	});

	return winMain;
}

module.exports = PhotoGallery;
