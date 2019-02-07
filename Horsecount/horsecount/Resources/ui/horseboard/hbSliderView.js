function sliderView(_id, _title, _navigation, windowStack) {
	var isAndroid = Ti.Platform.osname === 'android';
	var iconPath1,
	    iconPath2,
	    iconPath3,
	    iconPath4,
	    iconPath5,
	    icon1Top,
	    iconTop = '8%',
	    HomeImageSize = '25dp';
	var Get_Icons = require('ui/apiCalling/call_without_indicator');
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();

	if (isAndroid && Ti.Platform.displayCaps.platformHeight > 640) {
		icon1Top = '3%';
		iconPath1 = "/images/hbDetails.png";
		iconPath2 = "/images/hbPedigree.png";
		iconPath3 = "/images/hbBreeding.png";
		iconPath4 = "/images/hbCompetition.png";
		iconPath5 = "/images/blurnotify.png";
	} else {
		iconPath1 = "hbDetails@2x.png";
		iconPath2 = "hbPedigree@2x.png";
		iconPath3 = "hbBreeding@2x.png";
		iconPath4 = "hbCompetition@2x.png";
		iconPath5 = "blurnotify@2x.png";

		var iPhone4 = Ti.Platform.displayCaps.platformHeight == 480 ? true : false;
		if (iPhone4) {
			icon1Top = '3%';
		} else {
			icon1Top = '5%';
		}
	}

	var sliderView = Titanium.UI.createView({
		backgroundColor : '#C7EAFB',
		layout : 'vertical',
		right : '0dp',
		width : '50dp',
		height : Ti.UI.FILL,
		opacity : 1.0,
		zIndex : 1000
	});

	var icon1 = Titanium.UI.createImageView({
		image : iconPath1,
		favor : false,
		top : icon1Top,
		height : HomeImageSize,
		width : HomeImageSize
	});

	icon1.addEventListener('click', function(e) {
		var Horse = require('ui/horseboard/hbDetails');
		var details = new Horse(_title, _id, _navigation, windowStack);
		windowStack.push(details);
		if (isAndroid) {
			details.open();
		} else {
			_navigation.openWindow(details);
		}
	});

	var icon2 = Titanium.UI.createImageView({
		//backgroundColor:'red',
		image : iconPath2,
		top : iconTop,
		height : HomeImageSize,
		width : HomeImageSize
	});

	icon2.addEventListener('click', function(e) {
		var Horse = require('ui/horseboard/pedigree');
		var details = new Horse(_title, _id, _navigation, windowStack);
		windowStack.push(details);
		if (isAndroid) {
			details.open();
		} else {
			_navigation.openWindow(details);
		}
	});

	var icon3 = Titanium.UI.createImageView({
		//backgroundColor:'red',
		image : iconPath3,
		top : iconTop,
		height : HomeImageSize,
		width : HomeImageSize
	});

	icon3.addEventListener('click', function(e) {
		var Horse = require('ui/horseboard/hbBreedingHistory');
		var details = new Horse(_title, 'Breeding History', _id, windowStack);
		windowStack.push(details);
		if (isAndroid) {
			details.open();
		} else {
			_navigation.openWindow(details);
		}
	});

	var icon4 = Titanium.UI.createImageView({
		//backgroundColor:'red',
		image : iconPath4,
		top : iconTop,
		height : HomeImageSize,
		width : HomeImageSize
	});

	icon4.addEventListener('click', function(e) {
		var Horse = require('ui/horseboard/hbBreedingHistory');
		var details = new Horse(_title, 'Competition', _id, windowStack);
		windowStack.push(details);
		if (isAndroid) {
			details.open();
		} else {
			_navigation.openWindow(details);
		}
	});

	var icon5 = Ti.UI.createImageView({
		image : iconPath5,
		top : iconTop,
		height : HomeImageSize,
		width : HomeImageSize
	});

	icon5.addEventListener('click', function(e) {
		var Report = require('ui/common/reports');
		var _report = new Report(_id, _title, windowStack);
		windowStack.push(_report);
		if (isAndroid) {
			_report.open();
		} else {
			_navigation.openWindow(_report);
		}
	});

	function alertMessage(_title, msg) {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : _title,
			message : msg,
			buttonNames : ['OK']
		});
		alertDialog.show();
	}

	//Http request handling
	function renderToCompare(e, json) {
		if (json.compare_horse_id) {
			e.source.id = json.compare_horse_id;
			if (isAndroid) {
				e.source.image = "/images/hbUndoFavorite.png";
			} else {
				e.source.image = "hbUndoFavorite@2x.png";
			}
			alertMessage('Message!', json.message);
		} else {
			e.source.id = null;
			if (isAndroid) {
				e.source.image = "/images/hbCompare.png";
			} else {
				e.source.image = "hbCompare@2x.png";
			}
			alertMessage('Message!', json.message);
		}
	}

	//Http request handling
	function renderToFavorite(e, json) {
		if (json.favorite_horse_id) {
			e.source.id = json.favorite_horse_id;
			if (isAndroid) {
				e.source.image = "/images/hbUndoFavorite.png";
			} else {
				e.source.image = "hbUndoFavorite@2x.png";
			}
			alertMessage('Message!', 'The horse is successfully added to your favorite list.');
		} else {
			e.source.id = null;
			if (isAndroid) {
				e.source.image = "/images/hbFavorite.png";
			} else {
				e.source.image = "hbFavorite@2x.png";
			}
			alertMessage('Message!', 'The horse is successfully removed from your favorite list.');
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

	var icon6 = Titanium.UI.createImageView({
		//backgroundColor:'red',
		image : '',
		top : iconTop,
		height : HomeImageSize,
		width : HomeImageSize
	});

	icon6.addEventListener('click', function(e) {
		if (e.source.id) {
			var _url = system_url.getDeleteFromCompare_url(e.source.id);
			var _icons = new Get_Icons('GET', _url, null, function(json) {
				renderToCompare(e, json);
			});
		} else {
			var _url = system_url.getAddToCompare_url(_id, getBoardName(_title));
			var _icons = new Get_Icons('GET', _url, null, function(json) {
				renderToCompare(e, json);
			});
		}
	});

	var icon7 = Titanium.UI.createImageView({
		//backgroundColor:'red',
		image : '',
		top : iconTop,
		height : HomeImageSize,
		width : HomeImageSize
	});

	icon7.addEventListener('click', function(e) {
		if (e.source.id) {
			var _url = system_url.unmarkFaboriteHorse_url(e.source.id);
			var _icons = new Get_Icons('GET', _url, null, function(json) {
				renderToFavorite(e, json);
			});
		} else {
			var _url = system_url.markFaboriteHorse_url(_id);
			var _icons = new Get_Icons('GET', _url, null, function(json) {
				renderToFavorite(e, json);
			});
		}
	});

	sliderView.add(icon1);
	sliderView.add(icon2);
	sliderView.add(icon3);
	sliderView.add(icon4);
	sliderView.add(icon5);
	sliderView.add(icon6);
	sliderView.add(icon7);

	function checkIcons(json) {
		icon6.id = json.compare_horse_id;
		icon7.id = json.favorite_horse_id;
		if (json.compare_horse_id) {
			if (isAndroid) {
				icon6.image = "/images/hbUndoFavorite.png";
			} else {
				icon6.image = "hbUndoFavorite@2x.png";
			}
		} else {
			if (isAndroid) {
				icon6.image = "/images/hbCompare.png";
			} else {
				icon6.image = "hbCompare@2x.png";
			}
		}

		if (json.favorite_horse_id) {
			if (isAndroid) {
				icon7.image = "/images/hbUndoFavorite.png";
			} else {
				icon7.image = "hbUndoFavorite@2x.png";
			}
		} else {
			if (isAndroid) {
				icon7.image = "/images/hbFavorite.png";
			} else {
				icon7.image = "hbFavorite@2x.png";
			}
		}
	}

	var _url = system_url.getFavorite_Compare_Icons(_id, getBoardName(_title));
	var _icons = new Get_Icons('GET', _url, null, function(json) {
		checkIcons(json);
	});

	return sliderView;
}

module.exports = sliderView;
