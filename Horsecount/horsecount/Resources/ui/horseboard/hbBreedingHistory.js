function BreedingHistory(_board, _title, _id, windowStack) {
	var isAndroid = Ti.Platform.osname === 'android';

	//Getting activity indicator object
	var Indicator = require('ui/common/activityIndicator');
	var activityIndicator = new Indicator('35%', '10%');

	var win;
	if (isAndroid) {
		var Window = require('ui/android/actionbar');
		win = new Window('', 'vertical');
	} else {
		var Window = require('ui/iPhone/navbar');
		win = new Window('', 'vertical');
	}

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
	var toolView = new upperToolView(selectBoardImage(_board), _title, _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', closeWindow);
	win.add(toolView);

	//Loading data to listview fron json file
	function FillJsonData(json) {
		var data = [];
		if (_title === 'Breeding History') {
			for (var i = 0,
			    j = json.length; i < j; i++) {
				var color = '',
				    lsd = '',
				    bred_to = '';

				if (json[i].horse.color) {
					color = json[i].horse.color.toString().trim();
				}

				if (json[i].horse.lsd) {
					lsd = json[i].horse.lsd.toString().trim();
				}

				if (json[i].horse.bred_to) {
					bred_to = json[i].horse.bred_to.toString().trim();
				}

				data.push({
					LSD : {
						text : 'LSD'
					},
					LSDVal : {
						text : lsd
					},
					breedTo : {
						text : 'Breed To'
					},
					breedValue : {
						text : bred_to
					},
					dateOfBir : {
						text : 'Date of Birth'
					},
					birthValue : {
						text : json[i].horse.date_of_birth.toString().trim()
					},
					Foal : {
						text : 'Foal Name'
					},
					FoalValue : {
						text : json[i].horse.official_name.toString().trim()
					},
					Gender : {
						text : 'Gender'
					},
					GenderVal : {
						text : json[i].horse.gender.toString().trim()
					},
					Color : {
						text : 'Color'
					},
					ColorVal : {
						text : color
					},
					// Sets the regular list data properties
					properties : {
						//itemId : i,
						accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
					}
				});
			}
		} else if (_title === 'Competition') {
			for (var i = 0,
			    j = json.length; i < j; i++) {
				var item1 = '',
				    item2 = '',
				    item3 = '',
				    item4 = '',
				    item5 = '',
				    item6 = '',
				    item7 = '',
				    item8 = '';
				if (json[i].competition.competition_date) {
					item1 = json[i].competition.competition_date.toString().trim();
				}

				if (json[i].competition.competition_type) {
					item2 = json[i].competition.competition_type.toString().trim();
				}

				if (json[i].competition.division) {
					item3 = json[i].competition.division.toString().trim();
				}

				if (json[i].competition.competition_class) {
					item4 = json[i].competition.competition_class.toString().trim();
				}

				if (json[i].competition.performance) {
					item5 = json[i].competition.performance.toString().trim();
				}

				if (json[i].competition.performance_result) {
					item6 = json[i].competition.performance_result.toString().trim();
				}

				if (json[i].competition.titles) {
					item7 = json[i].competition.titles.toString().trim();
				}

				if (json[i].competition.earnings_result) {
					item8 = json[i].competition.earnings_result.toString().trim();
				}

				data.push({
					_date : {
						text : 'Date'
					},
					_dateVal : {
						text : item1
					},
					_event : {
						text : 'Event'
					},
					eventVal : {
						text : item2
					},
					Division : {
						text : 'Division'
					},
					DivisionVal : {
						text : item3
					},
					Class : {
						text : 'Class'
					},
					ClassVal : {
						text : item4
					},
					Performance : {
						text : 'Performance'
					},
					PerformVal : {
						text : item5
					},
					Result : {
						text : 'Result'
					},
					ResultVal : {
						text : item6
					},
					Title : {
						text : 'Title'
					},
					TitleVal : {
						text : item7
					},
					Earnings : {
						text : 'Earnings'
					},
					EarningsVal : {
						text : item8
					},
					// Sets the regular list data properties
					properties : {
						//itemId : i,
						accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
					}
				});
			}
		}

		var section = Ti.UI.createListSection({
			items : data
		});

		listView.sections = [section];
	}

	//Listview
	var templateForHorseBreeding = {
		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'LSD',
			properties : {
				backgroundColor : '#C7EAFB',
				top : '5dp',
				height : '20dp',
				width : '100dp',
				left : '5dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'LSDVal',
			properties : {
				backgroundColor : '#C7EAFB',
				top : '5dp',
				height : '20dp',
				width : Ti.UI.FILL,
				left : '120dp',
				font : {
					fontFamily : 'Arial'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'breedTo',
			properties : {
				top : '25dp',
				height : '20dp',
				width : '100dp',
				left : '5dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'breedValue',
			properties : {
				top : '25dp',
				height : '20dp',
				width : Ti.UI.FILL,
				left : '120dp',
				font : {
					fontFamily : 'Arial'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'dateOfBir',
			properties : {
				backgroundColor : '#C7EAFB',
				top : '45dp',
				height : '20dp',
				width : '100dp',
				left : '5dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'birthValue',
			properties : {
				backgroundColor : '#C7EAFB',
				top : '45dp',
				height : '20dp',
				width : Ti.UI.FILL,
				left : '120dp',
				font : {
					fontFamily : 'Arial'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'Foal',
			properties : {
				top : '65dp',
				height : '20dp',
				width : '100dp',
				left : '5dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'FoalValue',
			properties : {
				top : '65dp',
				height : '20dp',
				width : Ti.UI.FILL,
				left : '120dp',
				font : {
					fontFamily : 'Arial'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'Gender',
			properties : {
				backgroundColor : '#C7EAFB',
				top : '85dp',
				height : '20dp',
				width : '100dp',
				left : '5dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'GenderVal',
			properties : {
				backgroundColor : '#C7EAFB',
				top : '85dp',
				height : '20dp',
				width : Ti.UI.FILL,
				left : '120dp',
				font : {
					fontFamily : 'Arial'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'Color',
			properties : {
				top : '105dp',
				height : '20dp',
				width : '100dp',
				left : '5dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'ColorVal',
			properties : {
				top : '105dp',
				height : '20dp',
				width : Ti.UI.FILL,
				left : '120dp',
				font : {
					fontFamily : 'Arial'
				}
			}
		}],
		properties : {
			height : '127dp',
			backgroundColor : '#FFF'
		}
	};

	var templateForCompetition = {
		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : '_date',
			properties : {
				backgroundColor : '#C7EAFB',
				top : '5dp',
				height : '20dp',
				width : '100dp',
				left : '5dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : '_dateVal',
			properties : {
				backgroundColor : '#C7EAFB',
				top : '5dp',
				height : '20dp',
				width : Ti.UI.FILL,
				left : '120dp',
				font : {
					fontFamily : 'Arial'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : '_event',
			properties : {
				top : '25dp',
				height : '20dp',
				width : '100dp',
				left : '5dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'eventVal',
			properties : {
				top : '25dp',
				height : '20dp',
				width : Ti.UI.FILL,
				left : '120dp',
				font : {
					fontFamily : 'Arial'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'Division',
			properties : {
				backgroundColor : '#C7EAFB',
				top : '45dp',
				height : '20dp',
				width : '100dp',
				left : '5dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'DivisionVal',
			properties : {
				backgroundColor : '#C7EAFB',
				top : '45dp',
				height : '20dp',
				width : Ti.UI.FILL,
				left : '120dp',
				font : {
					fontFamily : 'Arial'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'Class',
			properties : {
				top : '65dp',
				height : '20dp',
				width : '100dp',
				left : '5dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'ClassVal',
			properties : {
				top : '65dp',
				height : '20dp',
				width : Ti.UI.FILL,
				left : '120dp',
				font : {
					fontFamily : 'Arial'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'Performance',
			properties : {
				backgroundColor : '#C7EAFB',
				top : '85dp',
				height : '20dp',
				width : '100dp',
				left : '5dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'PerformVal',
			properties : {
				backgroundColor : '#C7EAFB',
				top : '85dp',
				height : '20dp',
				width : Ti.UI.FILL,
				left : '120dp',
				font : {
					fontFamily : 'Arial'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'Result',
			properties : {
				top : '105dp',
				height : '20dp',
				width : '100dp',
				left : '5dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'ResultVal',
			properties : {
				top : '105dp',
				height : '20dp',
				width : Ti.UI.FILL,
				left : '120dp',
				font : {
					fontFamily : 'Arial'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'Title',
			properties : {
				backgroundColor : '#C7EAFB',
				top : '125dp',
				height : '20dp',
				width : '100dp',
				left : '5dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'TitleVal',
			properties : {
				backgroundColor : '#C7EAFB',
				top : '125dp',
				height : '20dp',
				width : Ti.UI.FILL,
				left : '120dp',
				font : {
					fontFamily : 'Arial'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'Earnings',
			properties : {
				top : '145dp',
				height : '20dp',
				width : '100dp',
				left : '5dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			backgroundColor : 'red',
			bindId : 'EarningsVal',
			properties : {
				top : '145dp',
				height : '20dp',
				width : Ti.UI.FILL,
				left : '120dp',
				font : {
					fontFamily : 'Arial'
				}
			}
		}],
		properties : {
			height : '167dp',
			backgroundColor : '#FFF'
		}
	};

	var plainTemplate;
	if (_title === 'Breeding History') {
		plainTemplate = templateForHorseBreeding;
	} else if (_title === 'Competition') {
		plainTemplate = templateForCompetition;
	}

	var listView = Ti.UI.createListView({
		top : '1%',
		bottom : '1%',
		left : '5dp',
		right : '5dp',
		separatorColor : '#369',
		borderRadius : 5,
		templates : {
			'plain' : plainTemplate
		},
		defaultItemTemplate : 'plain'
	});

	function renderJson(json) {
		if (json.length) {
			FillJsonData(json);
		} else {
			var alertDialog = Titanium.UI.createAlertDialog({
				title : 'Message!',
				message : 'Currently there is no data for this horse in the server',
				buttonNames : ['OK']
			});
			alertDialog.show();
		}
	}

	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();
	var _url;
	if (_title === 'Breeding History') {
		_url = system_url.getHBBreedHistory_url(_id);
	} else {
		_url = system_url.getHBCompetition_url(_id);
	}

	var API_Call = require('ui/apiCalling/call_with_indicator');
	new API_Call('GET', _url, null, activityIndicator, function(json) {
		renderJson(json);
	});

	listView.add(activityIndicator);
	win.add(listView);

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/only_upper_toolbar');
	new OnOrientaionChange(toolView);

	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;
}

module.exports = BreedingHistory;
