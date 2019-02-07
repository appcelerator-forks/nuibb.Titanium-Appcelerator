 function horseBoard(_title, _navigation, windowStack) {
	var isAndroid = Ti.Platform.osname === 'android';
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();
	var param;
	var pageIndex = 1,
	    sectionThreshold = 19;

	//Creating window object
	var win;
	if (isAndroid) {
		var Window = require('ui/android/actionbar');
		win = new Window('', 'composite');
	} else {
		var Window = require('ui/iPhone/navbar');
		win = new Window('', 'composite');
	}

	//Getting activity indicator object
	var Indicator = require('ui/common/activityIndicator');
	var activityIndicator = new Indicator('35%', '10%');

	//Dimension object
	var Dimentions = require('dimension/withBtmToolbar');
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

	//Update listview template after filtering
	function updateByFeedback(json, _param) {
		log.info(json);
		param = _param;
		switchToMainIcon();
		setSectionThreshold();
		addTableRows(json);
	}

	//Function of back to the main tab if main tab is not focused while clicking navigation back button, otherwise back to the main window
	function closeWindow() {
		if (!arrayToLoad[0].focus) {
			for (var i = 1,
			    j = arrayToLoad.length; i < j; i++) {
				if (arrayToLoad[i].focus) {
					arrayToLoad[i].focus = false;
					arrayToLoad[i].image = arrayToIconsPath[i];
					arrayToLoad[0].image = focusedIconsPath[0];
					arrayToLoad[0].focus = true;
					break;
				}
			}
			upperToolView.children[1].children[0].image = focusedIconsPath[0];
			upperToolView.children[1].children[1].text = _title;
			setSectionThreshold();
			getHttpRequest(1);
		} else {
			Ti.App.fireEvent('ModuleHiding');
			win.close();
		}
	}

	//Event listener for right button of upper toolbar
	function onRightBtnClick() {
		var SearchTable = require('ui/horseboard/searchTable');
		var search = new SearchTable(_title, _navigation, windowStack, updateByFeedback);
		windowStack.push(search);
		if (isAndroid) {
			search.open();
		} else {
			_navigation.openWindow(search);
		}
	}

	//Getting window icon dynamically
	function getWindowIcon(_name) {
		if (_name === 'Horseboard') {
			return imagePath.board_horse_focus;
		} else if (_name === 'Salesboard') {
			return imagePath.board_sales_focus;
		} else if (_name === 'Studboard') {
			return imagePath.board_stud_focus;
		}
	}

	//Upper toolbar's views
	var ToolBar = require('ui/upperToolbar/including_right_btn');
	var upperToolView = new ToolBar(getWindowIcon(_title), _title, imagePath.search_blur, _dimentions.toolViewHeight);
	upperToolView.children[0].addEventListener('touchend', closeWindow);
	upperToolView.children[2].addEventListener('touchend', onRightBtnClick);
	win.add(upperToolView);

	//Selecting board's main focused image
	function selectBoardImage(_board, isFocused) {
		if (_board === 'Horseboard') {
			if (isFocused) {
				if (isAndroid) {
					return "/images/hbMainFocus.png";
				} else {
					return "hbMainFocus@2x.png";
				}
			} else {
				if (isAndroid) {
					return "/images/hbMain.png";
				} else {
					return "hbMain@2x.png";
				}
			}
		} else if (_board === 'Salesboard') {
			if (isFocused) {
				if (isAndroid) {
					return "/images/sbMainFocus.png";
				} else {
					return "sbMainFocus@2x.png";
				}
			} else {
				if (isAndroid) {
					return "/images/sbMain.png";
				} else {
					return "sbMain@2x.png";
				}
			}
		} else if (_board === 'Studboard') {
			if (isFocused) {
				if (isAndroid) {
					return "/images/stbMainFocus.png";
				} else {
					return "stbMainFocus@2x.png";
				}
			} else {
				if (isAndroid) {
					return "/images/stbMain.png";
				} else {
					return "stbMain@2x.png";
				}
			}
		}
	}

	//Customised bottom bar focused icon list
	var focusedIconsPath = [];
	if (isAndroid) {
		focusedIconsPath.push(selectBoardImage(_title, true));
		focusedIconsPath.push("/images/hbMyHorseFocus.png");
		focusedIconsPath.push("/images/hbFavoriteFocus.png");
		focusedIconsPath.push("/images/hbCompareFocus.png");
		focusedIconsPath.push("/images/hbMapFocus.png");
		focusedIconsPath.push("/images/hbSaveSearchFocus.png");
	} else {
		focusedIconsPath.push(selectBoardImage(_title, true));
		focusedIconsPath.push("hbMyHorseFocus@2x.png");
		focusedIconsPath.push("hbFavoriteFocus@2x.png");
		focusedIconsPath.push("hbCompareFocus@2x.png");
		focusedIconsPath.push("hbMapFocus@2x.png");
		focusedIconsPath.push("hbSaveSearchFocus@2x.png");
	}

	//Customised bottom bar blured icon list
	var arrayToIconsPath = [];
	if (isAndroid) {
		arrayToIconsPath.push(selectBoardImage(_title, false));
		arrayToIconsPath.push("/images/hbMyHorse.png");
		arrayToIconsPath.push("/images/hbFavorite.png");
		arrayToIconsPath.push("/images/hbCompare.png");
		arrayToIconsPath.push("/images/hbMap.png");
		arrayToIconsPath.push("/images/hbSaveSearch.png");
	} else {
		arrayToIconsPath.push(selectBoardImage(_title, false));
		arrayToIconsPath.push("hbMyHorse@2x.png");
		arrayToIconsPath.push("hbFavorite@2x.png");
		arrayToIconsPath.push("hbCompare@2x.png");
		arrayToIconsPath.push("hbMap@2x.png");
		arrayToIconsPath.push("hbSaveSearch@2x.png");
	}

	var LoadArray = require('ui/horseboard/hbBottomArray');
	var arrayToLoad = new LoadArray(_title);

	//Selecting which bottom icon is focused now
	function focusedIcon() {
		for (var i = 0,
		    j = arrayToLoad.length; i < j; i++) {
			if (arrayToLoad[i].focus) {
				arrayToLoad[i].focus = false;
				arrayToLoad[i].image = arrayToIconsPath[i];
				break;
			}
		}
	}

	//Resetting section threshold for new tab clicking
	function setSectionThreshold() {
		listView.setSections([]);
		pageIndex = 1;
		sectionThreshold = 19;
		listView.setMarker({
			sectionIndex : sectionThreshold,
			itemIndex : 0
		});
	}

	//Bottom icons event listener Functions
	function icon1Listener(e) {
		if (!e.source.focus) {
			e.source.image = focusedIconsPath[0];
			upperToolView.children[1].children[0].image = focusedIconsPath[0];
			upperToolView.children[1].children[1].text = _title;
			focusedIcon();
			e.source.focus = true;
			arrayToLoad[0].filter = false;
			setSectionThreshold();
			getHttpRequest(pageIndex);
		} else {
			arrayToLoad[0].filter = false;
			setSectionThreshold();
			getHttpRequest(1);
		}
	}

	function icon2Listener(e) {
		if (!e.source.focus) {
			e.source.image = focusedIconsPath[1];
			upperToolView.children[1].children[0].image = focusedIconsPath[1];
			upperToolView.children[1].children[1].text = 'My Horses';
			focusedIcon();
			e.source.focus = true;
			setSectionThreshold();
			getHttpRequest(1);
		} else {
			setSectionThreshold();
			getHttpRequest(1);
		}
	}

	function icon3Listener(e) {
		if (!e.source.focus) {
			e.source.image = focusedIconsPath[2];
			upperToolView.children[1].children[0].image = focusedIconsPath[2];
			upperToolView.children[1].children[1].text = 'Favorite Horses';
			focusedIcon();
			e.source.focus = true;
			setSectionThreshold();
			getHttpRequest(1);
		} else {
			setSectionThreshold();
			getHttpRequest(1);
		}
	}

	//Getting exact board name
	function getBoardName(_board) {
		if (_board === 'Horseboard') {
			return 'horse';
		} else if (_board === 'Salesboard') {
			return 'sales';
		} else if (_board === 'Studboard') {
			return 'stud';
		}
	}

	function icon4Listener(e) {
		if (!e.source.focus) {
			e.source.image = focusedIconsPath[3];
			var lastFocusedIconIndex = lastFocusedIcon();
			focusedIcon();
			e.source.focus = true;
			var Compare = require('ui/horseboard/compareHorses');
			var compareHorses = new Compare(getBoardName(_title), windowStack, function() {
				focusedIcon();
				arrayToLoad[lastFocusedIconIndex].focus = true;
				arrayToLoad[lastFocusedIconIndex].image = focusedIconsPath[lastFocusedIconIndex];
			});
			windowStack.push(compareHorses);
			if (isAndroid) {
				compareHorses.open();
			} else {
				_navigation.openWindow(compareHorses);
			}
		}
	}

	//Selecting which bottom icon was focused before go through map icon
	function lastFocusedIcon() {
		for (var i = 0,
		    j = arrayToLoad.length; i < j; i++) {
			if (arrayToLoad[i].focus) {
				return i;
			}
		}
	}

	function icon5Listener(e) {
		if (!e.source.focus) {
			e.source.image = focusedIconsPath[4];
			var lastFocusedIconIndex = lastFocusedIcon();
			focusedIcon();
			e.source.focus = true;
			var Map = require('ui/horseboard/mapView');
			var mapView = new Map(_title, _navigation, windowStack, function() {
				focusedIcon();
				arrayToLoad[lastFocusedIconIndex].focus = true;
				arrayToLoad[lastFocusedIconIndex].image = focusedIconsPath[lastFocusedIconIndex];
			});
			windowStack.push(mapView);
			if (isAndroid) {
				mapView.open();
			} else {
				_navigation.openWindow(mapView);
			}
		}
	}

	function icon6Listener(e) {
		if (!e.source.focus) {
			var lastFocusedIconIndex = lastFocusedIcon();
			focusedIcon();
			e.source.focus = true;
			var Data = require('ui/horseboard/saved_search_data');
			var _data = new Data(getBoardName(_title), _navigation, windowStack, function() {
				focusedIcon();
				arrayToLoad[lastFocusedIconIndex].focus = true;
				arrayToLoad[lastFocusedIconIndex].image = focusedIconsPath[lastFocusedIconIndex];
			});

			windowStack.push(_data);
			if (isAndroid) {
				_data.open();
			} else {
				_navigation.openWindow(_data);
			}
		}
	}

	//Bottom Icons Add Event Listener
	function btmIconsAddEventListen() {
		arrayToLoad[0].addEventListener('touchend', icon1Listener);
		arrayToLoad[1].addEventListener('touchend', icon2Listener);
		arrayToLoad[2].addEventListener('touchend', icon3Listener);
		arrayToLoad[3].addEventListener('touchend', icon4Listener);
		arrayToLoad[4].addEventListener('touchend', icon5Listener);
		arrayToLoad[5].addEventListener('touchend', icon6Listener);
	}

	//Bottom Icons Remove Event Listener Function
	function btmIconsRemoveEventListen() {
		arrayToLoad[0].removeEventListener('touchend', icon1Listener);
		arrayToLoad[1].removeEventListener('touchend', icon2Listener);
		arrayToLoad[2].removeEventListener('touchend', icon3Listener);
		arrayToLoad[3].removeEventListener('touchend', icon4Listener);
		arrayToLoad[4].removeEventListener('touchend', icon5Listener);
		arrayToLoad[5].removeEventListener('touchend', icon6Listener);
	}

	//Slide Window
	/*var Slider = require('ui/horseboard/hbSliderView');
	var sliderView = new Slider(_title, _navigation, windowStack);

	win.add(sliderView);
	sliderView.visible = false;*/

	//Templates
	var Template1 = require('ui/horseboard/template/defaultTemplate');
	var plainTemplate = new Template1();

	// Function to create a footer view
	var createCustomView = function() {
		var view = Ti.UI.createView({
			backgroundColor : 'silver',
			width : Ti.UI.FILL,
			height : '80dp'
		});

		view.add(activityIndicator);

		return view;
	};

	var listView = Ti.UI.createListView({
		//backgroundColor:'transparent',
		footerView : createCustomView(),
		height : Ti.UI.FILL,
		left : '5dp',
		right : '5dp',
		top : _dimentions.listViewTop,
		borderRadius : 5,
		templates : {
			'default' : plainTemplate
		},
		defaultItemTemplate : 'default',
		opacity : 1.0
	});

	listView.addEventListener('itemclick', function(e) {
		if (win.children[3]) {
			win.remove(win.children[3]);
			upperToolView.opacity = 1.0;
			listView.opacity = 1.0;
			btmToolView.opacity = 1.0;
			btmIconsAddEventListen();
			upperToolView.children[0].addEventListener('touchend', function(e) {
				win.close();
			});
		}
	});

	// Set the initial item threshold
	listView.setMarker({
		sectionIndex : sectionThreshold,
		itemIndex : 0
	});

	// Load more data and set a new threshold when item threshold is reached
	listView.addEventListener('marker', function(e) {
		pageIndex++;
		sectionThreshold = sectionThreshold + 20;

		if (arrayToLoad[0].filter && param) {
			if (param.page) {
				param.page = pageIndex;
				getHttpRequestForFiltering(param);
			}
		} else {
			getHttpRequest(pageIndex);
		}

		listView.setMarker({
			sectionIndex : sectionThreshold,
			itemIndex : 0
		});
	});

	win.add(listView);

	//Customised Section Header
	function sectionHeader(_id, _favor, section_title, gender, price) {
		var imagePath,
		    sliderImagePath,
		    sliderHolderWidth,
		    _textWidth;
		if (gender === 'Stallion') {
			if (isAndroid) {
				imagePath = '/images/hbHeader2.png';
			} else {
				imagePath = 'hbHeader2@2x.png';
			}
		} else if (gender === 'Mare') {
			if (isAndroid) {
				imagePath = '/images/hbHeader1.png';
			} else {
				imagePath = 'hbHeader1@2x.png';
			}
		} else if (gender === 'Gelding') {
			if (isAndroid) {
				imagePath = '/images/hbHeader3.png';
			} else {
				imagePath = 'hbHeader3@2x.png';
			}
		}

		if (isAndroid) {
			sliderImagePath = '/images/hbHeader.png';
		} else {
			sliderImagePath = 'hbHeader@2x.png';
		}

		if (price) {
			sliderHolderWidth = '87dp';
			_textWidth = '200dp';
		} else {
			sliderHolderWidth = '40dp';
			_textWidth = '245dp';
		}

		var sliderHolder = Titanium.UI.createView({
			id : _id,
			favor : _favor,
			right : '0dp',
			height : Ti.UI.FILL,
			width : sliderHolderWidth
		});

		if (price) {
			var priceVal = Titanium.UI.createLabel({
				id : _id,
				favor : _favor,
				text : price,
				color : '#FFF',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold',
					fontSize : '15dp'
				},
				left : '0dp',
				height : Ti.UI.SIZE,
				width : '70dp'
			});

			sliderHolder.add(priceVal);
		}

		var headerBox = Titanium.UI.createImageView({
			image : imagePath,
			left : '3dp',
			width : '14dp',
			height : '14dp'
		});

		var title = Titanium.UI.createLabel({
			text : section_title,
			color : '#FFF',
			font : {
				fontFamily : 'Arial',
				fontWeight : 'bold',
				fontSize : '15dp'
			},
			left : '20dp',
			height : '20dp',
			width : _textWidth
		});

		var sliderIcon = Titanium.UI.createImageView({
			image : sliderImagePath,
			id : _id,
			favor : _favor,
			right : '5dp',
			width : '12dp',
			height : '12dp'
		});

		sliderHolder.add(sliderIcon);

		var _view = Titanium.UI.createView({
			width : Ti.UI.FILL,
			height : '25dp',
			backgroundGradient : {
				type : 'linear',
				startPoint : {
					x : '0%',
					y : '0%'
				},
				endPoint : {
					x : '0%',
					y : '100%'
				},
				colors : [{
					color : '#27AAE1',
					offset : 0.00
				}, {
					color : '#1c75BC ',
					offset : 0.75
				}]
			}
		});

		function slider_handling(_id) {
			var Slider = require('ui/horseboard/hbSliderView');
			var sliderView = new Slider(_id, _title, _navigation, windowStack);
			win.add(sliderView);
		}


		sliderHolder.addEventListener('touchstart', function(e) {
			if (e.source.id) {
				upperToolView.opacity = 0.5;
				listView.opacity = 0.5;
				btmToolView.opacity = 0.5;
				slider_handling(e.source.id);
				btmIconsRemoveEventListen();
				upperToolView.children[0].removeEventListener('touchend', function(e) {
					win.close();
				});
			}
		});

		_view.add(headerBox);
		_view.add(title);
		_view.add(sliderHolder);

		var section = Ti.UI.createListSection({
			headerView : _view
		});

		return section;

	}

	//Rendering Json Data
	function addTableRows(json) {
		var sections = [];
		for (var i = 0,
		    j = json.length; i < j; i++) {
			var price;
			if (json[i].horse.price) {
				var str = json[i].horse.price.toString().trim();
				var _char = str.charAt(1);
				if (_char === 'P') {
					price = 'PT';
				} else {
					price = str;
				}
			}

			if (json[i].horse.stud_fee) {
				var str = json[i].horse.stud_fee.toString().trim();
				var _char = str.charAt(1);
				if (_char === 'P') {
					price = 'PT';
				} else {
					price = str;
				}
			}

			var section = sectionHeader(json[i].horse.id, json[i].horse.favorite_horse_id, json[i].horse.official_name.toString().trim(), json[i].horse.gender.toString().trim(), price);
			var _breed,
			    _color,
			    _image,
			    _type = '';

			if (json[i].horse.image_link) {
				_image = 'http://staging.horsecount.com' + json[i].horse.image_link;
			} else {
				_image = isAndroid ? '/images/no-horse.png' : 'no-horse@2x.png';
			}

			if (json[i].horse.horse_type) {
				_type = json[i].horse.horse_type.toString().trim();
			}

			if (json[i].horse.color) {
				_color = json[i].horse.color.toString().trim();
			}

			section.setItems([{
				pic : {
					image : _image
				},
				breed : {
					text : json[i].horse.breed.toString().trim()
				},
				date : {
					text : json[i].horse.date_of_birth.toString().trim()
				},
				type : {
					text : _type
				},
				Size : {
					text : json[i].horse.size.toString().trim()
				},
				Color : {
					text : _color
				},
				country : {
					text : json[i].horse.country.toString().trim()
				},
				properties : {
					itemId : i,
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
					// backgroundColor:'transparent' //this works
				}
			}]);

			sections.push(section);
		}

		if (pageIndex === 1) {
			listView.setSections(sections);
		} else {
			listView.appendSection(sections);
		}
	}

	function renderJson(json) {
		var totalPage;
		if (json.length) {
			if (json[0].horse) {
				totalPage = json[0].horse.total_page;
			}
		} else {
			var alertDialog = Titanium.UI.createAlertDialog({
				title : 'Message!',
				message : 'There is no data in the server.',
				buttonNames : ['OK']
			});
			alertDialog.show();
		}

		if (pageIndex > 0 && pageIndex <= totalPage) {
			addTableRows(json);
		}
	}

	//Get specific Url for highlighted tab
	function get_Url(_index) {
		var _url;
		if (_title === 'Horseboard') {
			if (arrayToLoad[0].focus) {
				_url = system_url.getHorseboard_url(_index);
			} else if (arrayToLoad[1].focus) {
				_url = system_url.getMyHorse_url(_index);
			} else if (arrayToLoad[2].focus) {
				_url = system_url.getFaboriteHorse_url(_index);
			}
			return _url;
		} else if (_title === 'Salesboard') {
			if (arrayToLoad[0].focus) {
				_url = system_url.getSalesboard_url(_index);
			} else if (arrayToLoad[1].focus) {
				_url = system_url.getSB_MyHorse_url(_index);
			} else if (arrayToLoad[2].focus) {
				_url = system_url.getSB_FaboriteHorse_url(_index);
			}
			return _url;
		} else if (_title === 'Studboard') {
			if (arrayToLoad[0].focus) {
				_url = system_url.getStudboard_url(_index);
			} else if (arrayToLoad[1].focus) {
				_url = system_url.getSTB_MyHorse_url(_index);
			} else if (arrayToLoad[2].focus) {
				_url = system_url.getSTB_FaboriteHorse_url(_index);
			}
			return _url;
		}
	}

	//HTTP Request Handling for Filtering
	function getHttpRequestForFiltering(param) {
		var API_Call = require('ui/apiCalling/call_with_indicator');
		new API_Call('POST', system_url.getHBFilter_url(), param, activityIndicator, function(json) {
			renderJson(json);
		});
	}

	//HTTP Request Handling
	function getHttpRequest(_index) {
		var _url = get_Url(_index);
		var API_Call = require('ui/apiCalling/call_with_indicator');
		new API_Call('GET', _url, null, activityIndicator, function(json) {
			renderJson(json);
		});

	}

	getHttpRequest(1);

	//Bottom toolbar section
	var BtmToolbar = require('ui/bottomToolbar/btmToolbar');
	var btmToolView = new BtmToolbar(arrayToLoad, _dimentions.toolViewHeight);
	win.add(btmToolView);
	btmIconsAddEventListen();

	//Forcibly switching to first bottom icon from one of other focused bottom icon to show filtering data
	function switchToMainIcon() {
		if (!arrayToLoad[0].focus) {
			for (var i = 1,
			    j = arrayToLoad.length; i < j; i++) {
				if (arrayToLoad[i].focus) {
					arrayToLoad[i].focus = false;
					arrayToLoad[i].image = arrayToIconsPath[i];
					arrayToLoad[0].image = focusedIconsPath[0];
					arrayToLoad[0].focus = true;
					arrayToLoad[0].filter = true;
					break;
				}
			}
		} else {
			arrayToLoad[0].filter = true;
		}
	}

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/withBtmToolbar');
	new OnOrientaionChange(upperToolView, btmToolView, listView);

	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;
}

module.exports = horseBoard;
