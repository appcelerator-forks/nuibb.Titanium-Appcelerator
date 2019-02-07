function horseDetails(_title, _id, _navigation, windowStack) {
	var isAndroid = Ti.Platform.osname === 'android';
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();
	var _array = [];

	var win;
	if (isAndroid) {
		var Window = require('ui/android/actionbar');
		win = new Window('', 'vertical');
	} else {
		var Window = require('ui/iPhone/navbar');
		win = new Window('', 'vertical');
	}
	win.orientationModes = [Titanium.UI.PORTRAIT];

	//Getting activity indicator object
	var Indicator = require('ui/common/activityIndicator');
	var activityIndicator = new Indicator('35%', '10%');

	//Dimension object
	var Dimentions = require('dimension/withBtmToolbar');
	var _dimentions = new Dimentions();

	//Selecting board's main focused image
	function selectBoardImage(_board) {
		if (_board === 'Horseboard') {
			if (isAndroid) {
				return "/images/hbMainFocus.png";
			} else {
				return "hbMainFocus@2x.png";
			}
		} else if (_board === 'Salesboard') {
			if (isAndroid) {
				return "/images/sbMainFocus.png";
			} else {
				return "sbMainFocus@2x.png";
			}
		} else if (_board === 'Studboard') {
			if (isAndroid) {
				return "/images/stbMainFocus.png";
			} else {
				return "stbMainFocus@2x.png";
			}
		}
	}

	function closeWindow() {
		win.close();
	}

	//Upper toolbar's views
	var upperToolView = require('ui/upperToolbar/excluding_right_btn');
	var toolView = new upperToolView(selectBoardImage(_title), "Horse Details", _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', closeWindow);
	win.add(toolView);

	//Getting bottom toolbar
	var LoadArray = require('ui/horseboard/hbDetailsBottomArray');
	var arrayToLoad = new LoadArray(system_url.getFavorite_Compare_Icons(_id, getBoardName(_title)));

	//Getting exact board name keyword
	function getBoardName(_board) {
		if (_board === 'Horseboard') {
			return 'horse';
		} else if (_board === 'Salesboard') {
			return 'sales';
		} else if (_board === 'Studboard') {
			return 'stud';
		}
	}

	//Bottom icons event listener Function block starts...........................................
	//Facebook icon click event listener
	function icon1Listener(e) {
		if (_array.length) {
			var Facebook = require('ui/horseboard/facebook_module');
			new Facebook(_array);
		}
	}

	//Twitter icon click event listener
	function icon2Listener(e) {
		var Twitter = require('ui/horseboard/twitter');
		new Twitter();
	}

	//Send to a friend mail click event listener
	function icon3Listener(e) {
		var MailSending = require('ui/horseboard/mail_sending');
		new MailSending(_id, getBoardName(_title));
	}

	//Compare horse click event listener
	function icon4Listener(e) {
		var API_Call = require('ui/apiCalling/call_without_indicator');
		if (e.source.id) {
			var _url = system_url.getDeleteFromCompare_url(e.source.id);
			var _icons = new API_Call('GET', _url, null, function(json) {
				var Compare = require('ui/horseboard/hbDetails_compare');
				new Compare(e, json);
			});
		} else {
			var _url = system_url.getAddToCompare_url(_id, getBoardName(_title));
			var _icons = new API_Call('GET', _url, null, function(json) {
				var Compare = require('ui/horseboard/hbDetails_compare');
				new Compare(e, json);
			});
		}
	}

	//Favorite or Unfavorite horse click event listener
	function icon5Listener(e) {
		var API_Call = require('ui/apiCalling/call_without_indicator');
		if (e.source.id) {
			var _url = system_url.unmarkFaboriteHorse_url(e.source.id);
			var _icons = new API_Call('GET', _url, null, function(json) {
				var Favorite = require('ui/horseboard/hbDetails_favorite');
				new Favorite(e, json);
			});
		} else {
			var _url = system_url.markFaboriteHorse_url(_id);
			var _icons = new API_Call('GET', _url, null, function(json) {
				var Favorite = require('ui/horseboard/hbDetails_favorite');
				new Favorite(e, json);
			});
		}
	}

	//Bottom Icons Add Event Listener function initializing
	function btmIconsAddEventListen() {
		arrayToLoad[0].addEventListener('touchend', icon1Listener);
		arrayToLoad[1].addEventListener('touchend', icon2Listener);
		arrayToLoad[2].addEventListener('touchend', icon3Listener);
		arrayToLoad[3].addEventListener('touchend', icon4Listener);
		arrayToLoad[4].addEventListener('touchend', icon5Listener);
	}

	//Wndow Properties Section
	var Header_box = require('ui/horseboard/hbDetails_Header');
	var _header = new Header_box();
	win.add(_header);

	//Image View in the Details Horse View
	var scrollView = Titanium.UI.createScrollableView({
		backgroundColor : 'silver',
		top : '0dp',
		left : '5dp',
		right : '5dp',
		height : '33%',
		showPagingControl : true,
		pagingControlColor : '#1c75BC',
		//pagingControlHeight : 20,
		currentPage : 0
	});

	win.add(scrollView);

	//Details View section
	var List_View = require('ui/horseboard/hbDetails_listview');
	var listView = new List_View();
	listView.add(activityIndicator);
	win.add(listView);

	//if there is no video in the server for a horse
	function noVideoFunc() {
		var imageView;
		if (isAndroid) {
			imageView = Titanium.UI.createImageView({
				image : '/images/NoVideo.png'
			});
		} else {
			imageView = Titanium.UI.createImageView({
				image : 'NoVideo@2x.png'
			});
		}
		return imageView;
	}

	function addImageToScroll(images) {
		if (images) {
			var _url = system_url.getHostUrl();
			try {
				for (var i = 0,
				    j = images.length; i < j; i++) {
					var imageView = Titanium.UI.createImageView({
						id : images[i].image_link_large,
						image : _url + images[i].image_link
					});

					imageView.addEventListener('touchstart', function(e) {
						var LoadData = require('ui/horseboard/imageEnlarge');
						var dataToLoad = new LoadData(_url + e.source.id, selectBoardImage(_title), windowStack);

						windowStack.push(dataToLoad);

						if (isAndroid) {
							dataToLoad.open();
						} else {
							_navigation.openWindow(dataToLoad);
						}
					});

					scrollView.addView(imageView);
				}
			} catch(e) {
				alert(e);
			}
		}
	}

	function getPriceName(_board) {
		if (_board === 'Studboard') {
			return 'Stud Fee';
		} else if (_board === 'Salesboard') {
			return 'Sales Price';
		}
	}

	function loading_with_color(_label, _title) {
		return {
			template : 'highlight',
			tag_label : {
				text : _label
			},
			tag_title : {
				text : _title
			}
		};
	}

	function loading_without_color(_label, _title) {
		return {
			tag_label : {
				text : _label
			},
			tag_title : {
				text : _title
			}
		};
	}

	function renderJson(json) {
		if (json.horse.gender === 'Stallion') {
			if (isAndroid) {
				_header.children[0].image = '/images/hbHeader2.png';
			} else {
				_header.children[0].image = 'hbHeader2@2x.png';
			}
		} else if (json.horse.gender === 'Mare') {
			if (isAndroid) {
				_header.children[0].image = '/images/hbHeader1.png';
			} else {
				_header.children[0].image = 'hbHeader1@2x.png';
			}
		} else if (json.horse.gender === 'Gelding') {
			if (isAndroid) {
				_header.children[0].image = '/images/hbHeader3.png';
			} else {
				_header.children[0].image = 'hbHeader3@2x.png';
			}
		}

		if (json.horse.official_name) {
			_header.children[1].text = json.horse.official_name;
		}

		//Loading video and images to the scrollable view
		if (json.horse.video_id) {
			var webView = Ti.UI.createWebView({
				url : 'http://www.youtube.com/embed/' + json.horse.video_id + '?autoplay=1&autohide=1&cc_load_policy=0&color=white&controls=2&fs=0&iv_load_policy=3&modestbranding=1&rel=0&showinfo=0',
				enableZoomControls : false,
				scalesPageToFit : true,
				scrollsToTop : false,
				showScrollbars : false,
				loading : true,
				height : Ti.UI.FILL,
				width : Ti.UI.FILL
			});
			scrollView.addView(webView);
			addImageToScroll(json.horse.images);
		} else {
			scrollView.addView(noVideoFunc());
			addImageToScroll(json.horse.images);
		}

		//Filling listview template with data
		var data = [];
		if (json.horse.price) {
			data.push(loading_with_color(getPriceName(_title), json.horse.price));
		}

		if (json.horse.stud_fee) {
			data.push(loading_with_color(getPriceName(_title), json.horse.stud_fee));
		}

		if (json.horse.date_of_birth) {
			data.push(loading_without_color('DOB', json.horse.date_of_birth));
		} else {
			data.push(loading_without_color('DOB', ''));
		}

		if (json.horse.color) {
			data.push(loading_with_color('Color', json.horse.color));
		} else {
			data.push(loading_with_color('Color', ''));
		}

		if (json.horse.breed) {
			data.push(loading_without_color('Breed', json.horse.breed));
		} else {
			data.push(loading_without_color('Breed', ''));
		}

		if (json.horse.sire) {
			data.push(loading_with_color('Sire', json.horse.sire));
		} else {
			data.push(loading_with_color('Sire', ''));
		}

		if (json.horse.dam) {
			data.push(loading_without_color('Dam', json.horse.dam));
		} else {
			data.push(loading_without_color('Dam', ''));
		}

		if (json.horse.size) {
			data.push(loading_with_color('Size', json.horse.size));
		} else {
			data.push(loading_with_color('Size', ''));
		}

		if (json.horse.horse_type) {
			data.push(loading_without_color('Type', json.horse.horse_type));
		} else {
			data.push(loading_without_color('Type', ''));
		}

		if (json.horse.studbook_name) {
			data.push(loading_with_color('Stb. Name', json.horse.studbook_name));
		} else {
			data.push(loading_with_color('Stb. Name', ''));
		}

		if (json.horse.studbook_number) {
			data.push(loading_without_color('Stb. Number', json.horse.studbook_number));
		} else {
			data.push(loading_without_color('Stb. Number', ''));
		}

		if (json.horse.breeder) {
			data.push(loading_with_color('Breeder', json.horse.breeder));
		} else {
			data.push(loading_with_color('Breeder', ''));
		}

		if (json.horse.owner) {
			data.push(loading_without_color('Owner', json.horse.owner));
		} else {
			data.push(loading_without_color('Owner', ''));
		}

		if (json.horse.country) {
			data.push(loading_with_color('Country', json.horse.country));
		} else {
			data.push(loading_with_color('Country', ''));
		}

		if (json.horse.state) {
			data.push(loading_without_color('State/Province', json.horse.state));
		} else {
			data.push(loading_without_color('State/Province', ''));
		}

		if (json.horse.city) {
			data.push(loading_with_color('City/Town', json.horse.city));
		} else {
			data.push(loading_with_color('City/Town', ''));
		}

		if (json.horse.website) {
			data.push(loading_without_color('Website', json.horse.website));
		} else {
			data.push(loading_without_color('Website', ''));
		}

		if (json.horse.semen) {
			data.push(loading_with_color('Semen', json.horse.semen));
		} else {
			data.push(loading_with_color('Semen', ''));
		}

		if (json.horse.lfg) {
			data.push(loading_without_color('LFG', json.horse.lfg));
		} else {
			data.push(loading_without_color('LFG', ''));
		}

		if (json.horse.tam) {
			data.push(loading_with_color('TAM', json.horse.tam));
		} else {
			data.push(loading_with_color('TAM', ''));
		}

		if (json.horse.studfarm_message) {
			data.push(loading_without_color('Studfarm Message', json.horse.studfarm_message));
		} else {
			data.push(loading_without_color('Studfarm Message', ''));
		}

		if (json.horse.horse_status) {
			data.push(loading_with_color('Status', json.horse.status));
		} else {
			data.push(loading_with_color('Status', ''));
		}

		if (json.horse.owner_message) {
			data.push(loading_without_color('Owner Message', json.horse.owner_message));
		} else {
			data.push(loading_without_color('Owner Message', ''));
		}

		var section = Ti.UI.createListSection({
			items : data
		});

		listView.sections = [section];

		//Social Data Handling
		_array.push(json.horse.facebook_share.link);
		_array.push(json.horse.facebook_share.name);
		_array.push(json.horse.facebook_share.caption);
		_array.push(json.horse.facebook_share.picture);
		_array.push(json.horse.facebook_share.description);
	}

	//API calling to get json data from server
	var API_Call = require('ui/apiCalling/call_with_indicator');
	new API_Call('GET', system_url.getHBDetails_url(_id, getBoardName(_title)), null, activityIndicator, function(json) {
		renderJson(json);
	});

	//Bottom toolbar section
	var BtmToolbar = require('ui/bottomToolbar/btmToolbar');
	var btmToolView = new BtmToolbar(arrayToLoad, _dimentions.toolViewHeight);
	win.add(btmToolView);
	btmIconsAddEventListen();

	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;
}

module.exports = horseDetails;
