function Compare_Horses(_board, windowStack, onCreate) {
	var isAndroid = Ti.Platform.osname === 'android';

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

	//Dimension object
	var Dimentions = require('dimension/withoutBtmToolbar');
	var _dimentions = new Dimentions();

	var win;
	if (isAndroid) {
		var Window = require('ui/android/actionbar');
		win = new Window('', 'vertical');
	} else {
		var Window = require('ui/iPhone/navbar');
		win = new Window('', 'vertical');
	}

	//Back to the previous window while click on the back button of upper toolbar
	function closeWindow() {
		win.close();
	}

	//Upper toolbar's views
	var upperToolView = require('ui/upperToolbar/excluding_right_btn');
	var toolView = new upperToolView(imagePath.compare_focus, 'Compare Horses', _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', closeWindow);
	win.add(toolView);

	//Adding Upper block(pined) to the window
	var UpperBlock = require('ui/horseboard/compareHorseUpperBlock');
	var _block = new UpperBlock();
	win.add(_block);

	//Listview Template
	var Template2 = require('ui/horseboard/template/compareHorsesTemplate');
	var compareTemplate = new Template2();

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
		opacity : 1.0,
		top : '0dp',
		bottom: '1%',
		left : '5dp',
		right : '5dp',
		templates : {
			'default' : compareTemplate
		},
		defaultItemTemplate : 'default',
		footerView : createCustomView(),
	});

	win.add(listView);

	//Section Header For Compare Horses
	function compareSectionHeader(_title) {
		var _view = Titanium.UI.createView({
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE,
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

		var title = Titanium.UI.createLabel({
			text : _title,
			color : '#FFF',
			font : {
				fontFamily : 'Arial',
				fontWeight : 'bold',
				fontSize : '15dp'
			},
			left : '10dp',
			height : '25dp',
			width : '250dp'
		});

		_view.add(title);

		var section = Ti.UI.createListSection({
			headerView : _view
		});

		return section;
	}

	//Filling with data for comparing horses
	function functional_loop(attribute, header_title) {
		var item = ['', '', '', '', ''];
		var section = compareSectionHeader(header_title);
		for (var i = 0,
		    j = attribute.length; i < j; i++) {
			if (attribute[i].value) {
				item[i] = attribute[i].value.toString().trim();
			}
		};

		section.setItems([{
			a : {
				text : item[0]
			},
			b : {
				text : item[1]
			},
			c : {
				text : item[2]
			},
			d : {
				text : item[3]
			},
			e : {
				text : item[4]
			},
			properties : {
				accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
			}
		}]);

		return section;
	}

	function FillingListViewForCompare(json) {
		var sections = [];
		if (json.official_name) {
			if (json.official_name[0]) {
				_block.children[1].text = json.official_name[0].value;
			}

			if (json.official_name[1]) {
				_block.children[2].text = json.official_name[1].value;
			}

			if (json.official_name[2]) {
				_block.children[3].text = json.official_name[2].value;
			}

			if (json.official_name[3]) {
				_block.children[4].text = json.official_name[3].value;
			}

			if (json.official_name[4]) {
				_block.children[5].text = json.official_name[4].value;
			}
		}

		if (json.breed) {
			var section = functional_loop(json.breed, 'Breed');
			sections.push(section);
		}

		if (json.gender && _board !== 'stud') {
			var section = functional_loop(json.gender, 'Gender');
			sections.push(section);
		}

		if (json.size) {
			var section = functional_loop(json.size, 'Size');
			sections.push(section);
		}

		if (json.age) {
			var section = functional_loop(json.age, 'Age');
			sections.push(section);
		}

		if (json.type) {
			var section = functional_loop(json.type, 'Type');
			sections.push(section);
		}

		if (json.color) {
			var section = functional_loop(json.color, 'Color');
			sections.push(section);
		}

		if (json.sire) {
			var section = functional_loop(json.sire, 'Sire');
			sections.push(section);
		}

		if (json.dam) {
			var section = functional_loop(json.dam, 'Dam');
			sections.push(section);
		}

		if (json.studbook) {
			var section = functional_loop(json.studbook, 'Studbook');
			sections.push(section);
		}

		if (json.breeder) {
			var section = functional_loop(json.breeder, 'Breeder');
			sections.push(section);
		}

		if (json.owner) {
			var section = functional_loop(json.owner, 'Owner');
			sections.push(section);
		}

		if (json.state_province) {
			var section = functional_loop(json.state_province, 'Province');
			sections.push(section);
		}

		if (json.country) {
			var section = functional_loop(json.country, 'Country');
			sections.push(section);
		}

		listView.setSections(sections);
		activityIndicator.hide();
	}

	//Api calling
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();
	var API_Call = require('ui/apiCalling/call_with_indicator');
	new API_Call('GET', system_url.getComparedHorse_url(_board), null, activityIndicator, function(json) {
		FillingListViewForCompare(json);
	});
	
	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/only_upper_toolbar');
	new OnOrientaionChange(toolView);

	win.addEventListener('close', function(e) {
		windowStack.pop();
		onCreate();
		win = null;
	});

	return win;
}

module.exports = Compare_Horses;
