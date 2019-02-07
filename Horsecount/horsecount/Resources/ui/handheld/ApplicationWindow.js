function ApplicationWindow(navigation, windowStack, loginFlag) {
	var isAndroid = Ti.Platform.osname === 'android';
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();

	//Pubnub Integration
	var Pub_nab = require('ui/pubnub/pubnub_sample');
	new Pub_nab();

	var AllimageSize,
	    AllLabelTop,
	    AllLabelFontSize,
	    viewTop,
	    viewWidth,
	    module_title;
	var image1Path,
	    image2Path,
	    image3Path,
	    image4Path,
	    image5Path,
	    image6Path,
	    image7Path,
	    image8Path,
	    image9Path,
	    image10Path,
	    image11Path,
	    image12Path;

	if (isAndroid && Ti.Platform.displayCaps.platformHeight > 640) {

		AllimageSize = '70dp';
		AllLabelTop = '3dp';
		AllLabelFontSize = '17dp';
		//images path
		image1Path = "/images/1.png";
		image2Path = "/images/2.png";
		image3Path = "/images/3.png";
		image4Path = "/images/4.png";
		image5Path = "/images/5.png";
		image6Path = "/images/6.png";
		image7Path = "/images/7.png";
		image8Path = "/images/8.png";
		image9Path = "/images/9.png";
		image10Path = "/images/10.png";
		image11Path = "/images/11.png";
		image12Path = "/images/12.png";
	} else {
		AllimageSize = '60dp';
		AllLabelTop = '3dp';
		AllLabelFontSize = '14dp';
		//images path
		image1Path = "1@2x.png";
		image2Path = "2@2x.png";
		image3Path = "3@2x.png";
		image4Path = "4@2x.png";
		image5Path = "5@2x.png";
		image6Path = "6@2x.png";
		image7Path = "7@2x.png";
		image8Path = "8@2x.png";
		image9Path = "9@2x.png";
		image10Path = "10@2x.png";
		image11Path = "11@2x.png";
		image12Path = "12@2x.png";
	}

	var homeWindow;
	if (isAndroid) {
		var Window = require('ui/android/actionbar');
		homeWindow = new Window('main', 'vertical');
	} else {
		var Window = require('ui/iPhone/navbar');
		homeWindow = new Window('main', 'vertical');
	}

	if (!navigation && !isAndroid) {
		navigation = Ti.UI.iOS.createNavigationWindow({
			window : homeWindow
		});
	}

	if (isAndroid) {
		if (Titanium.Gesture.orientation == Ti.UI.PORTRAIT) {
			viewTop = '7%';
			viewWidth = '33%';
		} else if (Titanium.Gesture.orientation == Ti.UI.LANDSCAPE_LEFT || Titanium.Gesture.orientation == Ti.UI.LANDSCAPE_RIGHT) {
			viewTop = '3%';
			viewWidth = '25%';
		}
	} else {
		if (Ti.UI.orientation == Ti.UI.PORTRAIT) {
			var iPhone4 = Ti.Platform.displayCaps.platformHeight == 480 ? true : false;
			if (iPhone4) {
				viewTop = '20dp';
			} else {
				viewTop = '37dp';
			}
			viewWidth = '33%';
		} else if (Ti.UI.orientation == Ti.UI.LANDSCAPE_LEFT || Ti.UI.orientation == Ti.UI.LANDSCAPE_RIGHT) {
			viewTop = '8dp';
			viewWidth = '25%';
		}
	}

	Ti.Gesture.addEventListener('orientationchange', function(e) {
		if (e.orientation == Ti.UI.LANDSCAPE_LEFT || e.orientation == Ti.UI.LANDSCAPE_RIGHT) {
			// Update your UI for landscape orientation
			var Top;
			if (isAndroid) {
				Top = '3%';
			} else {
				Top = '8dp';
			}

			view10.applyProperties({
				width : '25%',
				top : Top
			});

			view11.applyProperties({
				width : '25%',
				top : Top
			});

			view12.applyProperties({
				width : '25%',
				top : Top
			});

			view20.applyProperties({
				width : '25%',
				top : Top
			});

			view21.applyProperties({
				width : '25%',
				top : Top
			});

			view22.applyProperties({
				width : '25%',
				top : Top
			});
			view30.applyProperties({
				width : '25%',
				top : Top
			});

			view31.applyProperties({
				width : '25%',
				top : Top
			});

			view32.applyProperties({
				width : '25%',
				top : Top
			});

			view40.applyProperties({
				width : '25%',
				top : Top
			});

			view41.applyProperties({
				width : '25%',
				top : Top
			});

			view42.applyProperties({
				width : '25%',
				top : Top
			});
		} else if (e.orientation == Ti.UI.PORTRAIT) {
			// Update your UI for portrait orientation
			var Top;
			if (isAndroid) {
				Top = '7%';
			} else {
				var iPhone4 = Ti.Platform.displayCaps.platformHeight == 480 ? true : false;
				if (iPhone4) {
					Top = '20dp';
				} else {
					Top = '37dp';
				}
			}

			view10.applyProperties({
				width : '33%',
				top : Top
			});

			view11.applyProperties({
				width : '33%',
				top : Top
			});

			view12.applyProperties({
				width : '33%',
				top : Top
			});

			view20.applyProperties({
				width : '33%',
				top : Top
			});

			view21.applyProperties({
				width : '33%',
				top : Top
			});

			view22.applyProperties({
				width : '33%',
				top : Top
			});

			view30.applyProperties({
				width : '33%',
				top : Top
			});

			view31.applyProperties({
				width : '33%',
				top : Top
			});

			view32.applyProperties({
				width : '33%',
				top : Top
			});

			view40.applyProperties({
				width : '33%',
				top : Top
			});

			view41.applyProperties({
				width : '33%',
				top : Top
			});

			view42.applyProperties({
				width : '33%',
				top : Top
			});
		}
	});

	var Scrolling = Ti.UI.createScrollView({
		//backgroundColor:'red',
		layout : 'vertical',
		contentWidth : Ti.UI.SIZE,
		contentHeight : Ti.UI.SIZE,
		showVerticalScrollIndicator : true,
		//showHorizontalScrollIndicator : true,
		top : 0,
		height : Ti.UI.FILL,
		width : Ti.UI.FILL
	});

	var HorizontalView = Ti.UI.createView({
		//backgroundColor : 'silver',
		layout : 'horizontal',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		top : '0dp',
		left : '0dp'
	});

	//For To DO List View
	var view10 = Titanium.UI.createView({
		//backgroundColor : 'red',
		layout : "vertical",
		width : viewWidth,
		height : Ti.UI.SIZE,
		top : viewTop,
		left : '0dp'
	});

	//For Feed and Care View
	var view11 = Titanium.UI.createView({
		//backgroundColor : 'blue',
		layout : "vertical",
		width : viewWidth,
		height : Ti.UI.SIZE,
		top : viewTop,
		left : '0dp'
	});

	//For Training View
	var view12 = Titanium.UI.createView({
		//backgroundColor : 'yellow',
		layout : "vertical",
		width : viewWidth,
		height : Ti.UI.SIZE,
		top : viewTop,
		left : '0dp'
	});

	//Under To DO List View
	var image1 = Titanium.UI.createImageView({
		image : image1Path,
		height : AllimageSize,
		width : AllimageSize
	});

	var label1 = Titanium.UI.createLabel({
		color : '#fff',
		text : "To Do List",
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		top : AllLabelTop,
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : AllLabelFontSize
		}
	});

	view10.add(image1);
	view10.add(label1);

	//Under Feed and Care View
	var image2 = Titanium.UI.createImageView({
		image : image2Path,
		height : AllimageSize,
		width : AllimageSize
	});

	var label2 = Titanium.UI.createLabel({
		color : '#fff',
		text : "Feed & Care",
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		top : AllLabelTop,
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : AllLabelFontSize
		}
	});

	view11.add(image2);
	view11.add(label2);

	//Under Training View
	var image3 = Titanium.UI.createImageView({
		image : image3Path,
		height : AllimageSize,
		width : AllimageSize
	});

	var label3 = Titanium.UI.createLabel({
		color : '#fff',
		text : "Training",
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		top : AllLabelTop,
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : AllLabelFontSize
		}
	});

	view12.add(image3);
	view12.add(label3);

	//For Health View
	var view20 = Titanium.UI.createView({
		//backgroundColor : 'red',
		layout : "vertical",
		width : viewWidth,
		height : Ti.UI.SIZE,
		top : viewTop,
		left : '0dp'
	});

	//For Gestation View
	var view21 = Titanium.UI.createView({
		//backgroundColor : 'blue',
		layout : "vertical",
		width : viewWidth,
		height : Ti.UI.SIZE,
		top : viewTop,
		left : '0dp'
	});

	//For Riding School View
	var view22 = Titanium.UI.createView({
		//backgroundColor : 'yellow',
		layout : "vertical",
		width : viewWidth,
		height : Ti.UI.SIZE,
		top : viewTop,
		left : '0dp'
	});

	//Under Health View
	var image4 = Titanium.UI.createImageView({
		image : image4Path,
		height : AllimageSize,
		width : AllimageSize
	});

	var label4 = Titanium.UI.createLabel({
		color : '#fff',
		text : "Health",
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		top : AllLabelTop,
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : AllLabelFontSize
		}
	});

	view20.add(image4);
	view20.add(label4);

	//Under Gestation View
	var image5 = Titanium.UI.createImageView({
		image : image5Path,
		height : AllimageSize,
		width : AllimageSize
	});

	var label5 = Titanium.UI.createLabel({
		color : '#fff',
		text : "Gestation",
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		top : AllLabelTop,
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : AllLabelFontSize
		}
	});

	view21.add(image5);
	view21.add(label5);

	//Under Riding School View
	var image6 = Titanium.UI.createImageView({
		image : image6Path,
		height : AllimageSize,
		width : AllimageSize
	});

	var label6 = Titanium.UI.createLabel({
		color : '#fff',
		text : "Riding School",
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		top : AllLabelTop,
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : AllLabelFontSize
		}
	});

	view22.add(image6);
	view22.add(label6);

	//For Logbook View
	var view30 = Titanium.UI.createView({
		//backgroundColor : 'red',
		layout : "vertical",
		width : viewWidth,
		height : Ti.UI.SIZE,
		top : viewTop,
		left : '0dp'
	});

	//For Forum View
	var view31 = Titanium.UI.createView({
		//backgroundColor : 'blue',
		layout : "vertical",
		width : viewWidth,
		height : Ti.UI.SIZE,
		top : viewTop,
		left : '0dp'
	});

	//For Community View
	var view32 = Titanium.UI.createView({
		//backgroundColor : 'yellow',
		layout : "vertical",
		width : viewWidth,
		height : Ti.UI.SIZE,
		top : viewTop,
		left : '0dp'
	});

	//Under Logbook View
	var image7 = Titanium.UI.createImageView({
		image : image7Path,
		height : AllimageSize,
		width : AllimageSize
	});

	var label7 = Titanium.UI.createLabel({
		color : '#fff',
		text : "Logbook",
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		top : AllLabelTop,
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : AllLabelFontSize
		}
	});

	view30.add(image7);
	view30.add(label7);

	//Under Forum View
	var image8 = Titanium.UI.createImageView({
		image : image8Path,
		height : AllimageSize,
		width : AllimageSize
	});

	var label8 = Titanium.UI.createLabel({
		color : '#fff',
		text : "Forum",
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		top : AllLabelTop,
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : AllLabelFontSize
		}
	});

	view31.add(image8);
	view31.add(label8);

	//Under Community View
	var image9 = Titanium.UI.createImageView({
		image : image9Path,
		height : AllimageSize,
		width : AllimageSize
	});

	var label9 = Titanium.UI.createLabel({
		color : '#fff',
		text : "Community",
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		top : AllLabelTop,
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : AllLabelFontSize
		}
	});

	view32.add(image9);
	view32.add(label9);

	//For Horseboard View
	var view40 = Titanium.UI.createView({
		//backgroundColor : 'red',
		layout : "vertical",
		width : viewWidth,
		height : Ti.UI.SIZE,
		top : viewTop,
		left : '0dp'
	});

	//For Studboard View
	var view41 = Titanium.UI.createView({
		//backgroundColor : 'blue',
		layout : "vertical",
		width : viewWidth,
		height : Ti.UI.SIZE,
		top : viewTop,
		left : '0dp'
	});

	//For Salseboard View
	var view42 = Titanium.UI.createView({
		//backgroundColor : 'yellow',
		layout : "vertical",
		width : viewWidth,
		height : Ti.UI.SIZE,
		top : viewTop,
		left : '0dp'
	});

	//Under Horseboard View
	var image10 = Titanium.UI.createImageView({
		image : image10Path,
		height : AllimageSize,
		width : AllimageSize
	});

	var label10 = Titanium.UI.createLabel({
		color : '#fff',
		text : "Horseboard",
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		top : AllLabelTop,
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : AllLabelFontSize
		}
	});

	view40.add(image10);
	view40.add(label10);

	//Under Studboard View
	var image11 = Titanium.UI.createImageView({
		image : image11Path,
		height : AllimageSize,
		width : AllimageSize
	});

	var label11 = Titanium.UI.createLabel({
		color : '#fff',
		text : "Studboard",
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		top : AllLabelTop,
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : AllLabelFontSize
		}
	});

	view41.add(image11);
	view41.add(label11);

	//Under Salseboard View
	var image12 = Titanium.UI.createImageView({
		image : image12Path,
		height : AllimageSize,
		width : AllimageSize
	});

	var label12 = Titanium.UI.createLabel({
		color : '#fff',
		text : "Salesboard",
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		top : AllLabelTop,
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : AllLabelFontSize
		}
	});

	view42.add(image12);
	view42.add(label12);

	//Module to diaplay in the main view while initial loading
	var Modules = Ti.App.Properties.getList("Module_UI");

	function renderJson() {
		var json = JSON.parse(this.responseText);

		Ti.App.Properties.removeProperty("Module_UI");

		var module_enable = [];
		module_enable.push(json.module_enabled.to_do);
		module_enable.push(json.module_enabled.feed_and_care);
		module_enable.push(json.module_enabled.training);
		module_enable.push(json.module_enabled.health_and_care);
		module_enable.push(json.module_enabled.breeding);
		module_enable.push(json.module_enabled.riding_school);
		module_enable.push(json.module_enabled.logbook);
		module_enable.push(json.module_enabled.forum);
		module_enable.push(json.module_enabled.community);

		Ti.App.Properties.setList("Module_UI", module_enable);

		//Adding main scroll view to the window as enabled modules
		if (module_enable[0]) {
			HorizontalView.add(view10);
		}

		if (module_enable[1]) {
			HorizontalView.add(view11);
		}

		if (module_enable[2]) {
			HorizontalView.add(view12);
		}

		if (module_enable[3]) {
			HorizontalView.add(view20);
		}

		if (module_enable[4]) {
			HorizontalView.add(view21);
		}

		if (module_enable[5]) {
			HorizontalView.add(view22);
		}

		if (module_enable[6]) {
			HorizontalView.add(view30);
		}

		if (module_enable[7]) {
			HorizontalView.add(view31);
		}
		if (module_enable[8]) {
			HorizontalView.add(view32);
		}

		HorizontalView.add(view40);
		HorizontalView.add(view41);
		HorizontalView.add(view42);
		Scrolling.add(HorizontalView);
		homeWindow.add(Scrolling);
		//homeWindow.add(HorizontalView);
	}

	function errorMessage() {
		var Modules = Ti.App.Properties.getList("Module_UI");

		//Adding main scroll view to the window as enabled modules
		if (Modules[0]) {
			HorizontalView.add(view10);
		}

		if (Modules[1]) {
			HorizontalView.add(view11);
		}

		if (Modules[2]) {
			HorizontalView.add(view12);
		}

		if (Modules[3]) {
			HorizontalView.add(view20);
		}

		if (Modules[4]) {
			HorizontalView.add(view21);
		}

		if (Modules[5]) {
			HorizontalView.add(view22);
		}

		if (Modules[6]) {
			HorizontalView.add(view30);
		}

		if (Modules[7]) {
			HorizontalView.add(view31);
		}

		if (Modules[8]) {
			HorizontalView.add(view32);
		}

		HorizontalView.add(view40);
		HorizontalView.add(view41);
		HorizontalView.add(view42);
		Scrolling.add(HorizontalView);
		homeWindow.add(Scrolling);
		//homeWindow.add(HorizontalView);
		//Ti.API.info("STATUS: " + this.status);
		//Ti.API.info("TEXT:   " + this.responseText);
		//Ti.API.info("ERROR:  " + this.error);

		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'Alert!',
			message : 'Could not connect server.',
			buttonNames : ['OK']
		});
		alertDialog.show();

	}

	// Checking whether the device is online or offline
	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
		var Modules = Ti.App.Properties.getList("Module_UI");

		//Adding main scroll view to the window as enabled modules
		if (Modules[0]) {
			HorizontalView.add(view10);
		}

		if (Modules[1]) {
			HorizontalView.add(view11);
		}

		if (Modules[2]) {
			HorizontalView.add(view12);
		}

		if (Modules[3]) {
			HorizontalView.add(view20);
		}

		if (Modules[4]) {
			HorizontalView.add(view21);
		}

		if (Modules[5]) {
			HorizontalView.add(view22);
		}

		if (Modules[6]) {
			HorizontalView.add(view30);
		}

		if (Modules[7]) {
			HorizontalView.add(view31);
		}

		if (Modules[8]) {
			HorizontalView.add(view32);
		}

		HorizontalView.add(view40);
		HorizontalView.add(view41);
		HorizontalView.add(view42);
		Scrolling.add(HorizontalView);
		homeWindow.add(Scrolling);
		//homeWindow.add(HorizontalView);

		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'WARNING!',
			message : 'Your device is not online.',
			buttonNames : ['OK']
		});
		alertDialog.show();

	} else {
		var _url = system_url.getMain_UI_Url();
		try {
			var xhr = Titanium.Network.createHTTPClient({
				timeout : 10000
			});
			xhr.onload = renderJson;
			xhr.onerror = errorMessage;
			xhr.open('GET', _url);
			xhr.send();
		} catch(e) {
			alert(e);
		}
	}

	function showAlert() {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'Alert!',
			message : 'The module has been disabled.',
			buttonNames : ['OK']
		});
		alertDialog.show();
	}

	function goModuleWindow(_file, _title) {
		var LoadData = require(_file);
		var dataToLoad = new LoadData(_title, navigation, windowStack);
		windowStack.push(dataToLoad);

		if (isAndroid) {
			dataToLoad.open();
		} else {
			navigation.openWindow(dataToLoad);
		}
	}

	function changeUI(_array) {
		for (var i = HorizontalView.children.length - 1; i >= 0; i--) {
			HorizontalView.remove(HorizontalView.children[i]);
		}

		//Adding main scroll view to the window as enabled modules
		if (_array[0]) {
			HorizontalView.add(view10);
		}

		if (_array[1]) {
			HorizontalView.add(view11);
		}

		if (_array[2]) {
			HorizontalView.add(view12);
		}

		if (_array[3]) {
			HorizontalView.add(view20);
		}

		if (_array[4]) {
			HorizontalView.add(view21);
		}

		if (_array[5]) {
			HorizontalView.add(view22);
		}

		if (_array[6]) {
			HorizontalView.add(view30);
		}

		if (_array[7]) {
			HorizontalView.add(view31);
		}
		if (_array[8]) {
			HorizontalView.add(view32);
		}

		HorizontalView.add(view40);
		HorizontalView.add(view41);
		HorizontalView.add(view42);

		Ti.App.Properties.removeProperty("Module_UI");
		Ti.App.Properties.setList("Module_UI", _array);
		Ti.App.fireEvent('BackToMain');
	}

	function updateServer() {
		var json = JSON.parse(this.responseText);
		var Modules = Ti.App.Properties.getList("Module_UI");
		var _array = [];
		_array.push(json.module_enabled.to_do);
		_array.push(json.module_enabled.feed_and_care);
		_array.push(json.module_enabled.training);
		_array.push(json.module_enabled.health_and_care);
		_array.push(json.module_enabled.breeding);
		_array.push(json.module_enabled.riding_school);
		_array.push(json.module_enabled.logbook);
		_array.push(json.module_enabled.forum);
		_array.push(json.module_enabled.community);

		if (_array[0] !== Modules[0]) {
			changeUI(_array);
		} else if (_array[1] !== Modules[1]) {
			changeUI(_array);
		} else if (_array[2] !== Modules[2]) {
			changeUI(_array);
		} else if (_array[3] !== Modules[3]) {
			changeUI(_array);
		} else if (_array[4] !== Modules[4]) {
			changeUI(_array);
		} else if (_array[5] !== Modules[5]) {
			changeUI(_array);
		} else if (_array[6] !== Modules[6]) {
			changeUI(_array);
		} else if (_array[7] !== Modules[7]) {
			changeUI(_array);
		} else if (_array[8] !== Modules[8]) {
			changeUI(_array);
		}
	}

	function errorToUpdate() {
		//Ti.API.info("STAT: " + this.status);
		//Ti.API.info("TEXT:   " + this.responseText);
		//Ti.API.info("ERROR:  " + this.error);
		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'Alert!',
			message : 'Could not connect to the server.',
			buttonNames : ['OK']
		});
		alertDialog.show();

	}

	function updateUserSettings() {
		var _url = system_url.getMain_UI_Url();
		try {
			var xhr = Titanium.Network.createHTTPClient({
				timeout : 10000
			});
			xhr.onload = updateServer;
			xhr.onerror = errorToUpdate;
			xhr.open('GET', _url);
			xhr.send();
		} catch(e) {
			alert(e);
		}
	}

	//.........................

	// Item icon Listener
	view10.addEventListener('click', function(e) {
		goModuleWindow('ui/misc/todoList', 'To Do List');
	});

	view11.addEventListener('click', function(e) {
		goModuleWindow('ui/misc/jsonData', 'Feed & Care');
	});

	view12.addEventListener('click', function(e) {
		goModuleWindow('ui/misc/jsonData', 'Training');
	});

	view20.addEventListener('click', function(e) {
		goModuleWindow('ui/misc/jsonData', 'Health');
	});

	view21.addEventListener('click', function(e) {
		goModuleWindow('ui/misc/jsonData', 'Gestation');
	});

	view22.addEventListener('click', function(e) {
		goModuleWindow('ui/ridingschool/ridingSchool', 'Riding School');
	});

	view30.addEventListener('click', function(e) {
		if (isAndroid) {
			var LoadData = require('ui/logbook/logbook_android');
			var dataToLoad = new LoadData(windowStack);
			windowStack.push(dataToLoad);
			dataToLoad.open();
		} else {
			var LoadData = require('ui/logbook/logBook');
			var dataToLoad = new LoadData(navigation, windowStack);
			windowStack.push(dataToLoad);
			navigation.openWindow(dataToLoad);
		}
	});

	view31.addEventListener('click', function(e) {
		goModuleWindow('ui/forum/forum', 'Forum');
	});

	view32.addEventListener('click', function(e) {
		goModuleWindow('ui/community/community', 'News feed');
	});

	view40.addEventListener('click', function(e) {
		goModuleWindow('ui/horseboard/horseBoard', 'Horseboard');
	});

	view41.addEventListener('click', function(e) {
		goModuleWindow('ui/horseboard/horseBoard', 'Studboard');
	});

	view42.addEventListener('click', function(e) {
		goModuleWindow('ui/horseboard/horseBoard', 'Salesboard');
	});

	//Update main window design if there any change in the module settings in the server
	Ti.App.addEventListener('ModuleHiding', function(e) {
		updateUserSettings();
	});

	//Back to Main Window upon click of home button at the top of each window except main window
	Ti.App.addEventListener('BackToMain', function(e) {
		if (loginFlag) {
			var windows = windowStack.concat([]);
			for (var i = 2,
			    l = windows.length; i < l; i++) {
				(navigation) ? navigation.closeWindow(windows[i], {
					animated : true
				}) : windows[i].close();
			}
		} else {
			var windows = windowStack.concat([]);
			for (var i = 1,
			    l = windows.length; i < l; i++) {
				(navigation) ? navigation.closeWindow(windows[i], {
					animated : true
				}) : windows[i].close();
			}
		}
	});

	//Back to Login window
	function Log_in_again() {
		var windowStack = [];
		Window = require('ui/handheld/login');
		var login_Window = new Window(windowStack);
		windowStack.push(login_Window);
		login_Window.open();
	}

	//Delete app session
	function deleteAppSession() {
		Ti.App.Properties.removeProperty('Token');
	}


	Ti.App.addEventListener('backtoRoot', function(e) {
		var Delete_Session = require('ui/apiCalling/apiCallToLogout');
		new Delete_Session('DELETE', system_url.getLogoutUrl(), deleteAppSession);

		if (loginFlag) {
			var windows = windowStack.concat([]);
			for (var i = 1,
			    l = windows.length; i < l; i++) {
				(navigation) ? navigation.closeWindow(windows[i], {
					animated : true
				}) : windows[i].close();
			}
		} else {
			Log_in_again();
			var windows = windowStack.concat([]);
			for (var i = 0,
			    l = windows.length - 1; i < l; i++) {
				(navigation) ? navigation.closeWindow(windows[i], {
					animated : true
				}) : windows[i].close();
			}
		}
	});

	homeWindow.addEventListener('close', function(e) {
		windowStack.pop();
		homeWindow = null;
	});

	if (isAndroid) {
		return homeWindow;
	} else {
		if (loginFlag) {
			return homeWindow;
		} else {
			return navigation;
		}
	}
};

module.exports = ApplicationWindow;

