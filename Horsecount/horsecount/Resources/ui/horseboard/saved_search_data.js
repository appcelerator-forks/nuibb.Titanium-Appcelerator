function saved_search_data(_board, _navigation, windowStack, onCreate) {
	var isAndroid = Ti.Platform.osname === 'android';
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();
	var param = {};
	var filter = {};
	param.board = _board;

	//Getting activity indicator object
	var Indicator = require('ui/common/activityIndicator');
	var activityIndicator = new Indicator('40%', '50%');

	//Creating window object
	var win;
	if (isAndroid) {
		var Window = require('ui/android/actionbar');
		win = new Window('', 'vertical');
	} else {
		var Window = require('ui/iPhone/navbar');
		win = new Window('', 'vertical');
	}

	//Dimension object
	var Dimentions = require('dimension/saved_searches');
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

	//Back to the previous window while click on the back button of upper toolbar
	function closeWindow() {
		win.close();
	}

	//Upper toolbar's views
	var upperToolView = require('ui/upperToolbar/excluding_right_btn');
	var toolView = new upperToolView(imagePath.savedSearch_focus, 'Saved Searches', _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', closeWindow);
	win.add(toolView);

	//Listview Header View
	var _header = Titanium.UI.createView({
		backgroundColor : '#36A9E1',
		layout : 'horizontal',
		top : '1%',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});

	var _title = Titanium.UI.createLabel({
		text : 'Select Filter',
		color : '#FFF',
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : '16dp'
		},
		left : '5dp',
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE
	});

	_header.add(_title);

	win.add(_header);

	// Function to create a footer view
	var createCustomFooter = function() {
		var view = Ti.UI.createView({
			backgroundColor : 'silver',
			width : Ti.UI.FILL,
			height : '80dp'
		});

		view.add(activityIndicator);
		return view;
	};

	//Listview
	var listView = Ti.UI.createListView({
		top : '1%',
		left : '5dp',
		right : '5dp',
		height : _dimentions.listViewHeight,
		borderRadius : 5,
		footerView : createCustomFooter()
	});

	win.add(listView);

	function sectionHeader(_title) {
		var _left;
		if (isAndroid) {
			_left = '0dp';
		} else {
			_left = '15dp';
		}

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
			left : _left,
			height : '25dp',
			width : Ti.UI.FILL
		});

		_view.add(title);

		return _view;
	}

	//Saved search block
	function data_set(dataSet, _value) {
		dataSet.push({
			properties : {
				backgroundColor : '#FFF',
				title : _value,
				color : '#000',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold',
					fontSize : '14dp'
				}
			}
		});
	}

	function saved_searches_template(attribute, header_title) {
		var section = Ti.UI.createListSection();

		var dataSet = [];
		var attr_length = attribute.length;
		if (header_title === 'Sire') {
			var value = '';
			if (attr_length) {
				section.headerView = sectionHeader(header_title);
				for (var i = 0; i < attr_length; i++) {
					value = value + attribute[i].sire_id + ';';
					data_set(dataSet, attribute[i].sire_name);
				}
				param.sire_id = value;
			} else {
				param.sire_id = null;
			}
		} else if (header_title === 'Dam') {
			var value = '';
			if (attr_length) {
				section.headerView = sectionHeader(header_title);
				for (var i = 0; i < attr_length; i++) {
					value = value + attribute[i].dam_id + ';';
					data_set(dataSet, attribute[i].dam_name);
				}
				param.dam_id = value;
			} else {
				param.dam_id = null;
			}
		} else if (header_title === 'Country') {
			var value = '';
			if (attr_length) {
				section.headerView = sectionHeader(header_title);
				for (var i = 0; i < attr_length; i++) {
					value = value + attribute[i].country_code + ';';
					data_set(dataSet, attribute[i].country_name);
				}
				param.country = value;
			} else {
				param.country = null;
			}
		} else if (header_title === 'States/Province/Area') {
			var value = '';
			if (attr_length) {
				section.headerView = sectionHeader(header_title);
				for (var i = 0; i < attr_length; i++) {
					value = value + attribute[i].state_code + ';';
					data_set(dataSet, attribute[i].state_name);
				}
				param.state = value;
			} else {
				param.state = null;
			}
		} else if (header_title === 'Breed') {
			var value = '';
			if (attr_length) {
				section.headerView = sectionHeader(header_title);
				for (var i = 0; i < attr_length; i++) {
					value = value + attribute[i] + ';';
					data_set(dataSet, attribute[i]);
				}
				param.breed_search = value;
			} else {
				param.breed_search = null;
			}
		} else if (header_title === 'Gender') {
			var value = '';
			if (attr_length) {
				section.headerView = sectionHeader(header_title);
				for (var i = 0; i < attr_length; i++) {
					value = value + attribute[i] + ';';
					data_set(dataSet, attribute[i]);
				}
				param.gender_search = value;
			} else {
				param.gender_search = null;
			}
		} else if (header_title === 'Size') {
			if (attr_length) {
				section.headerView = sectionHeader(header_title);
				data_set(dataSet, attribute[0] + '     ' + attribute[1]);
				param.size_min = attribute[0];
				param.size_max = attribute[1];
			} else {
				param.size_min = null;
				param.size_max = null;
			}
		} else if (header_title === 'Age') {
			if (attr_length) {
				section.headerView = sectionHeader(header_title);
				data_set(dataSet, attribute[0] + '     ' + attribute[1]);
				param.age_min = attribute[0];
				param.age_max = attribute[1];
			} else {
				param.age_min = null;
				param.age_max = null;
			}
		} else if (header_title === 'Color') {
			var value = '';
			if (attr_length) {
				section.headerView = sectionHeader(header_title);
				for (var i = 0; i < attr_length; i++) {
					value = value + attribute[i] + ';';
					data_set(dataSet, attribute[i]);
				}
				param.color_search = value;
			} else {
				param.color_search = null;
			}
		} else if (header_title === 'Type') {
			var value = '';
			if (attr_length) {
				section.headerView = sectionHeader(header_title);
				for (var i = 0; i < attr_length; i++) {
					value = value + attribute[i] + ';';
					data_set(dataSet, attribute[i]);
				}
				param.type_search = value;
			} else {
				param.type_search = null;
			}
		} else if (header_title === 'Breeder') {
			var value = '';
			if (attr_length) {
				section.headerView = sectionHeader(header_title);
				for (var i = 0; i < attr_length; i++) {
					value = value + attribute[i] + ';';
					data_set(dataSet, attribute[i]);
				}
				param.breeder = value;
			} else {
				param.breeder = null;
			}
		} else if (header_title === 'Owner') {
			var value = '';
			if (attr_length) {
				section.headerView = sectionHeader(header_title);
				for (var i = 0; i < attr_length; i++) {
					value = value + attribute[i] + ';';
					data_set(dataSet, attribute[i]);
				}
				param.owner = value;
			} else {
				param.owner = null;
			}
		} else if (header_title === 'City/Town') {
			var value = '';
			if (attr_length) {
				section.headerView = sectionHeader(header_title);
				for (var i = 0; i < attr_length; i++) {
					value = value + attribute[i] + ';';
					data_set(dataSet, attribute[i]);
				}
				param.city = value;
			} else {
				param.city = null;
			}
		} else if (header_title === 'Studbook') {
			var value = '';
			if (attr_length) {
				section.headerView = sectionHeader(header_title);
				for (var i = 0; i < attr_length; i++) {
					value = value + attribute[i] + ';';
					data_set(dataSet, attribute[i]);
				}
				param.studbook_search = value;
			} else {
				param.studbook_search = null;
			}
		} else if (header_title === 'Distance') {
			if (attr_length) {
				section.headerView = sectionHeader(header_title);
				data_set(dataSet, attribute[0]);
				param.distance = attribute[0];
			} else {
				param.distance = null;
			}
		} else if (header_title === 'Posted') {
			if (attr_length) {
				section.headerView = sectionHeader(header_title);
				data_set(dataSet, attribute[0] + '     ' + attribute[1]);
				param.posted_min = attribute[0];
				param.posted_max = attribute[1];
			} else {
				param.posted_min = null;
				param.posted_max = null;
			}
		} else if (header_title === 'Sales Price') {
			if (attr_length) {
				section.headerView = sectionHeader(header_title);
				data_set(dataSet, attribute[0] + '     ' + attribute[1]);
				param.price_min = attribute[0];
				param.price_max = attribute[1];
			} else {
				param.price_min = null;
				param.price_max = null;
			}
		} else if (header_title === 'Currencies') {
			var value = '';
			if (attr_length) {
				section.headerView = sectionHeader(header_title);
				for (var i = 0; i < attr_length; i++) {
					value = value + attribute[i].currency_code + ';';
					data_set(dataSet, attribute[i].currency_name);
				}
				param.currency = value;
			} else {
				param.currency = null;
			}
		} else if (header_title === 'Status') {
			var value = '';
			if (attr_length) {
				section.headerView = sectionHeader(header_title);
				for (var i = 0; i < attr_length; i++) {
					value = value + attribute[i] + ';';
					data_set(dataSet, attribute[i]);
				}
				param.status = value;
			} else {
				param.status = null;
			}
		} else if (header_title === 'Stud Fee') {
			if (attr_length) {
				section.headerView = sectionHeader(header_title);
				data_set(dataSet, attribute[0] + '     ' + attribute[1]);
				param.stud_min = attribute[0];
				param.stud_max = attribute[1];
			} else {
				param.stud_min = null;
				param.stud_max = null;
			}
		} else if (header_title === 'Semen') {
			if (attr_length) {
				section.headerView = sectionHeader(header_title);
				if (attribute[0] && attribute[1]) {
					data_set(dataSet, 'Cooled');
					data_set(dataSet, 'Frozen');
					param.semen_cooled = 'yes';
					param.semen_frozen = 'yes';
				} else if (attribute[0]) {
					data_set(dataSet, 'Frozen');
					param.semen_frozen = 'yes';
					param.semen_cooled = null;
				} else if (attribute[1]) {
					data_set(dataSet, 'Cooled');
					param.semen_frozen = null;
					param.semen_cooled = 'yes';
				}

			} else {
				param.semen_cooled = null;
				param.semen_frozen = null;
			}
		} else if (header_title === 'LFG') {
			if (attr_length) {
				section.headerView = sectionHeader(header_title);
				data_set(dataSet, attribute[0]);
				param.lfg = attribute[0];
			} else {
				param.lfg = null;
			}
		} else if (header_title === 'TAM') {
			if (attr_length) {
				section.headerView = sectionHeader(header_title);
				data_set(dataSet, attribute[0]);
				param.tam = attribute[0];
			} else {
				param.tam = null;
			}
		}

		section.setItems(dataSet);
		return section;
	}

	function renderSearch_data(json) {
		listView.setSections([]);
		var sections = [];

		if (json.saved_search_filter.price_min && json.saved_search_filter.price_max) {
			var section = saved_searches_template([json.saved_search_filter.price_min, json.saved_search_filter.price_max], 'Sales Price');
			sections.push(section);
		} else {
			param.price_min = null;
			param.price_max = null;
		}

		if (json.saved_search_filter.stud_min && json.saved_search_filter.stud_max) {
			var section = saved_searches_template([json.saved_search_filter.stud_min, json.saved_search_filter.stud_max], 'Stud Fee');
			sections.push(section);
		} else {
			param.stud_min = null;
			param.stud_max = null;
		}

		if (json.saved_search_filter.currencies) {
			var section = saved_searches_template(json.saved_search_filter.currencies, 'Currency');
			sections.push(section);
		} else {
			param.currency = null;
		}

		if (json.saved_search_filter.breed) {
			var section = saved_searches_template(json.saved_search_filter.breed, 'Breed');
			sections.push(section);
		} else {
			param.breed_search = null;
		}

		if (json.saved_search_filter.gender) {
			var section = saved_searches_template(json.saved_search_filter.gender, 'Gender');
			sections.push(section);
		} else {
			param.gender_search = null;
		}

		if (json.saved_search_filter.size_max && json.saved_search_filter.size_min) {
			var section = saved_searches_template([json.saved_search_filter.size_min, json.saved_search_filter.size_max], 'Size');
			sections.push(section);
		} else {
			param.size_min = null;
			param.size_max = null;
		}

		if (json.saved_search_filter.age_max && json.saved_search_filter.age_min) {
			var section = saved_searches_template([json.saved_search_filter.age_min, json.saved_search_filter.age_max], 'Age');
			sections.push(section);
		} else {
			param.age_min = null;
			param.age_max = null;
		}

		if (json.saved_search_filter.horse_type) {
			var section = saved_searches_template(json.saved_search_filter.horse_type, 'Type');
			sections.push(section);
		} else {
			param.type_search = null;
		}

		if (json.saved_search_filter.color) {
			var section = saved_searches_template(json.saved_search_filter.color, 'Color');
			sections.push(section);
		} else {
			param.color_search = null;
		}

		if (json.saved_search_filter.sires) {
			var section = saved_searches_template(json.saved_search_filter.sires, 'Sire');
			sections.push(section);
		} else {
			param.sire_id = null;
		}

		if (json.saved_search_filter.dams) {
			var section = saved_searches_template(json.saved_search_filter.dams, 'Dam');
			sections.push(section);
		} else {
			param.dam_id = null;
		}

		if (json.saved_search_filter.status) {
			var section = saved_searches_template(json.saved_search_filter.status, 'Status');
			sections.push(section);
		} else {
			param.status = null;
		}

		if (json.saved_search_filter.registration_ids) {
			var section = saved_searches_template(json.saved_search_filter.registration_ids, 'Studbook');
			sections.push(section);
		} else {
			param.studbook_search = null;
		}

		if (json.saved_search_filter.semen_frozen || json.saved_search_filter.semen_cooled) {
			var section = saved_searches_template([json.saved_search_filter.semen_frozen, json.saved_search_filter.semen_cooled], 'Semen');
			sections.push(section);
		} else {
			param.semen_cooled = null;
			param.semen_frozen = null;
		}

		if (json.saved_search_filter.lfg) {
			var section = saved_searches_template([json.saved_search_filter.lfg], 'LFG');
			sections.push(section);
		} else {
			param.lfg = null;
		}

		if (json.saved_search_filter.tam) {
			var section = saved_searches_template([json.saved_search_filter.tam], 'TAM');
			sections.push(section);
		} else {
			param.tam = null;
		}

		if (json.saved_search_filter.breeder_names) {
			var section = saved_searches_template(json.saved_search_filter.breeder_names, 'Breeder');
			sections.push(section);
		} else {
			param.breeder = null;
		}

		if (json.saved_search_filter.owner_names) {
			var section = saved_searches_template(json.saved_search_filter.owner_names, 'Owner');
			sections.push(section);
		} else {
			param.owner = null;
		}

		if (json.saved_search_filter.countries) {
			var section = saved_searches_template(json.saved_search_filter.countries, 'Country');
			sections.push(section);
		} else {
			param.country = null;
		}

		if (json.saved_search_filter.states) {
			var section = saved_searches_template(json.saved_search_filter.states, 'States/Province/Area');
			sections.push(section);
		} else {
			param.state = null;
		}

		if (json.saved_search_filter.cities) {
			var section = saved_searches_template(json.saved_search_filter.cities, 'City/Town');
			sections.push(section);
		} else {
			param.city = null;
		}

		if (json.saved_search_filter.distance) {
			var section = saved_searches_template([json.saved_search_filter.distance], 'Distance');
			sections.push(section);
		} else {
			param.distance = null;
		}

		if (json.saved_search_filter.posted_max && json.saved_search_filter.posted_min) {
			var section = saved_searches_template([json.saved_search_filter.posted_min, json.saved_search_filter.posted_max], 'Posted');
			sections.push(section);
		} else {
			param.posted_min = null;
			param.posted_max = null;
		}

		listView.setSections(sections);
	}

	//Api Calling for different search id
	function http_saved_search_data(_id) {
		var API_Call = require('ui/apiCalling/call_with_indicator');
		new API_Call('GET', system_url.getSaved_Searches_url(_id), null, activityIndicator, function(json) {
			renderSearch_data(json);
		});
	}

	//Changing background of selectd filter
	function toggleColor(_index) {
		if (filter.selected) {
			_header.children[_index + 1].children[0].color = '#36A9E1';
			filter.selected.color = '#000';
			filter.selected = _header.children[_index + 1].children[0];
		}
	}

	function select_filter_block(_length, json) {
		var _left,
		    _size;
		if (isAndroid) {
			_left = '20dp';
			_size = '30dp';
		} else {
			_left = '15dp';
			_size = '25dp';
		}

		for (var i = 0; i < _length; i++) {
			var _color = '#000';
			if (i === 0) {
				_color = '#36A9E1';
			}
			var labelHolder = Ti.UI.createView({
				index : i,
				id : json[i],
				backgroundColor : '#FFF',
				left : _left,
				height : _size,
				width : _size,
				borderRadius : 5,
				borderColor : '#000'
			});

			var label = Titanium.UI.createLabel({
				index : i,
				id : json[i],
				color : _color,
				text : i + 1,
				height : Ti.UI.SIZE,
				width : Ti.UI.SIZE
			});

			labelHolder.add(label);

			if (i === 0) {
				filter.selected = label;
			}

			labelHolder.addEventListener('touchstart', function(e) {
				toggleColor(e.source.index);
				http_saved_search_data(e.source.id);
			});

			_header.add(labelHolder);
		}
		http_saved_search_data(json[0]);
	}

	function renderSearch_id(json) {
		var _length = json.length;
		if (_length) {
			select_filter_block(_length, json);
		} else {

		}
	}

	//Api Calling to get different saved search id's
	var API_Call = require('ui/apiCalling/call_with_indicator');
	new API_Call('GET', system_url.getSaved_Search_ids(_board), null, activityIndicator, function(json) {
		renderSearch_id(json);
	});

	function httpSuccess(json) {
		Ti.App.fireEvent('HorseboardFilterSearch', {
			e : json
		});
		win.close();
	}

	function httpRequestHandling(_param) {
		var API_Call = require('ui/apiCalling/call_without_indicator');
		new API_Call('POST', system_url.getHBFilter_url(), _param, function(json) {
			httpSuccess(json);
		});
	}

	//Get feedback upon submit button click
	function submitToFeedback() {
		for (var prop in param) {
			httpRequestHandling(param);
			break;
		}
	}

	//Bottom toolbar view & it's functionality
	var Feedback = require('ui/bottomToolbar/search_to_feedback');
	var btmToolView = new Feedback('vertical', _dimentions.toolViewHeight, submitToFeedback);
	win.add(btmToolView);

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/saved_searches');
	new OnOrientaionChange(toolView, btmToolView, listView);

	win.addEventListener('close', function(e) {
		windowStack.pop();
		onCreate();
		win = null;
	});

	return win;
}

module.exports = saved_search_data;
