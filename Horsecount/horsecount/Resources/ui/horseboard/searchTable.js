function horseBoard(_board, _navigation, windowStack, onCreate) {
	var isAndroid = Ti.Platform.osname === 'android';
	var param = {};

	//Creating window object
	var win;
	if (isAndroid) {
		var Window = require('ui/android/actionbar');
		win = new Window('', 'composite');
	} else {
		var Window = require('ui/iPhone/navbar');
		win = new Window('', 'composite');
	}

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

	//Get window icon
	function getWindowIcon(_title) {
		if (_title === 'Horseboard') {
			return imagePath.board_horse_focus;
		} else if (_title === 'Salesboard') {
			return imagePath.board_sales_focus;
		} else if (_title === 'Studboard') {
			return imagePath.board_stud_focus;
		}
	}

	//Back to the previous window while click on the back button of upper toolbar
	function closeWindow() {
		win.close();
	}

	//Upper toolbar's views
	var upperToolView = require('ui/upperToolbar/excluding_right_btn');
	var toolView = new upperToolView(getWindowIcon(_board), _board, _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', closeWindow);
	win.add(toolView);

	//List view template
	var plainTemplate = {
		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'title',
			properties : {
				color : '#000',
				height : '30dp',
				width : Ti.UI.SIZE,
				left : '15dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold',
					fontSize : '14dp'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'number',
			properties : {
				color : '#36A9E1',
				height : '30dp',
				width : '170dp',
				right : isAndroid ? '40dp' : '5dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold',
					fontSize : '14dp'
				},
				textAlign : 'right'
			}
		}],
		properties : {
			height : '30dp',
			backgroundColor : '#FFF'
		}
	};

	//Listview
	var listView = Ti.UI.createListView({
		backgroundColor : '#FFF',
		height : _dimentions.listViewHeight,
		left : '5dp',
		right : '5dp',
		top : _dimentions.listViewTop,
		borderRadius : 5,
		templates : {
			'plain' : plainTemplate
		},
		defaultItemTemplate : 'plain'
	});

	//Appliing different condition checking to select gps location
	function gpsLocationHandling(_name) {
		// iterate through the rows to find out which one is desired
		var rowCount = listView.sections[1].getItems().length;
		for (var i = 0; i < rowCount; i++) {
			var item = listView.sections[1].getItemAt(i);
			if (item.title.text === _name && item.number.text !== '') {
				item.number.text = '';
				item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE;
				listView.sections[1].updateItemAt(i, item);
			}
		}
	}

	//getting currency code
	function getCurrencyCode(_name) {
		var currencies = [["US $", 1], ["Euro €", 2], ["Japanese Yen ¥", 3], ["GB Pound £", 4], ["Australian $", 5], ["Swiss Frank Fr", 6], ["Canadian $", 7], ["Chinese Yuan ¥", 8], ["Swedish Krona", 9], ["Russian Rouble", 10], ["Hong Kong $", 11], ["Singapore $", 12], ["Mexican Peso", 13]];
		for (var i = 0; i < currencies.length; i++) {
			if (_name == currencies[i][0]) {
				return currencies[i][1];
			}
		}
	}

	listView.addEventListener('itemclick', function(e) {
		var item = e.section.getItemAt(e.itemIndex);
		if (e.sectionIndex) {
			if (item.title.text === 'Sales Price') {
				var LoadData = require('ui/horseboard/searchCriteria');
				var dataToLoad = new LoadData('Find by Sales Price', windowStack, _navigation, function(_currency, _value) {
					var list = '',
					    _code = '';
					var _length = _currency.length;
					for (var i = 0; i < _length; i++) {
						if (i == _length - 1) {
							list = list + _currency[i];
							_code = _code + getCurrencyCode(_currency[i]);
						} else {
							list = list + _currency[i] + ';';
							_code = _code + getCurrencyCode(_currency[i]) + ';';
						}
					}

					if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE) {
						item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
					}
					param.price_min = _value[0];
					param.price_max = _value[1];
					param.currency = _code;

					item.number.text = '[' + list + ']  ' + _value[0] + ' - ' + _value[1];
					e.section.updateItemAt(e.itemIndex, item);
				});

				windowStack.push(dataToLoad);

				if (isAndroid) {
					dataToLoad.open();
				} else {
					_navigation.openWindow(dataToLoad);
				}
			} else if (item.title.text === 'Stud Fee') {
				var LoadData = require('ui/horseboard/searchCriteria');
				var dataToLoad = new LoadData('Find by Stud Fee', windowStack, _navigation, function(_currency, _value) {
					var list = '',
					    _code = '';
					var _length = _currency.length;
					for (var i = 0; i < _length; i++) {
						if (i == _length - 1) {
							list = list + _currency[i];
							_code = _code + getCurrencyCode(_currency[i]);
						} else {
							list = list + _currency[i] + ';';
							_code = _code + getCurrencyCode(_currency[i]) + ';';
						}
					}

					if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE) {
						item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
					}
					param.stud_min = _value[0];
					param.stud_max = _value[1];
					param.currency = _code;

					item.number.text = '[' + list + ']  ' + _value[0] + ' - ' + _value[1];
					e.section.updateItemAt(e.itemIndex, item);
				});

				windowStack.push(dataToLoad);

				if (isAndroid) {
					dataToLoad.open();
				} else {
					_navigation.openWindow(dataToLoad);
				}
			} else if (item.title.text === 'Breed') {
				var LoadData = require('ui/horseboard/hb_Refine_Search');
				var dataToLoad = new LoadData('Find by Breed', _board, windowStack, function(_breedlist) {
					var list = '';
					var _length = _breedlist.length;
					for (var i = _length - 1; i >= 0; i--) {
						if (i > 0) {
							list = list + _breedlist[i] + ';';
						} else {
							list = list + _breedlist[i];
						}
					}
					param.breed_search = list;
					if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE) {
						item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
					}
					item.number.text = _length;
					e.section.updateItemAt(e.itemIndex, item);
				}, null);

				windowStack.push(dataToLoad);

				if (isAndroid) {
					dataToLoad.open();
				} else {
					_navigation.openWindow(dataToLoad);
				}
			} else if (item.title.text === 'Gender') {
				var LoadData = require('ui/horseboard/hb_Refine_Search');
				var dataToLoad = new LoadData('Find by Gender', _board, windowStack, function(_breedlist) {
					var list = '';
					var _length = _breedlist.length;
					for (var i = _length - 1; i >= 0; i--) {
						if (i > 0) {
							list = list + _breedlist[i] + ';';
						} else {
							list = list + _breedlist[i];
						}
					}
					param.gender_search = list;
					if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE) {
						item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
					}
					item.number.text = _length;
					e.section.updateItemAt(e.itemIndex, item);
				}, null);

				windowStack.push(dataToLoad);

				if (isAndroid) {
					dataToLoad.open();
				} else {
					_navigation.openWindow(dataToLoad);
				}
			} else if (item.title.text === 'Age') {
				var LoadData = require('ui/horseboard/searchCriteria');
				var dataToLoad = new LoadData('Find by Age', windowStack, _navigation, function(_unit, _value) {
					if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE) {
						item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
					}
					param.age_min = _value[0];
					param.age_max = _value[1];
					item.number.text = '[' + _unit + ']  ' + _value[0] + ' - ' + _value[1];
					//Ti.API.info('[' + _unit + ']  ' + _value[0] + ' - ' + _value[1]);
					e.section.updateItemAt(e.itemIndex, item);
				});

				windowStack.push(dataToLoad);

				if (isAndroid) {
					dataToLoad.open();
				} else {
					_navigation.openWindow(dataToLoad);
				}
			} else if (item.title.text === 'Size') {
				var LoadData = require('ui/horseboard/searchCriteria');
				var dataToLoad = new LoadData('Find by Size', windowStack, _navigation, function(_unit, _value) {
					if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE) {
						item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
					}
					param.size_min = _value[0];
					param.size_max = _value[1];
					item.number.text = '[' + _unit + ']  ' + _value[0] + ' - ' + _value[1];
					e.section.updateItemAt(e.itemIndex, item);
				});

				windowStack.push(dataToLoad);

				if (isAndroid) {
					dataToLoad.open();
				} else {
					_navigation.openWindow(dataToLoad);
				}
			} else if (item.title.text === 'Type') {
				var LoadData = require('ui/horseboard/hb_Refine_Search');
				var dataToLoad = new LoadData('Find by Type', _board, windowStack, function(_breedlist) {
					var list = '';
					var _length = _breedlist.length;
					for (var i = _length - 1; i >= 0; i--) {
						if (i > 0) {
							list = list + _breedlist[i] + ';';
						} else {
							list = list + _breedlist[i];
						}
					}
					param.type_search = list;
					if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE) {
						item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
					}
					item.number.text = _length;
					e.section.updateItemAt(e.itemIndex, item);
				}, null);

				windowStack.push(dataToLoad);

				if (isAndroid) {
					dataToLoad.open();
				} else {
					_navigation.openWindow(dataToLoad);
				}
			} else if (item.title.text === 'Color') {
				var LoadData = require('ui/horseboard/hb_Refine_Search');
				var dataToLoad = new LoadData('Find by Color', _board, windowStack, function(_breedlist) {
					var list = '';
					var _length = _breedlist.length;
					for (var i = _length - 1; i >= 0; i--) {
						if (i > 0) {
							list = list + _breedlist[i] + ';';
						} else {
							list = list + _breedlist[i];
						}
					}
					param.color_search = list;
					if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE) {
						item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
					}
					item.number.text = _length;
					e.section.updateItemAt(e.itemIndex, item);
				}, null);

				windowStack.push(dataToLoad);

				if (isAndroid) {
					dataToLoad.open();
				} else {
					_navigation.openWindow(dataToLoad);
				}
			} else if (item.title.text === 'Sire') {
				var LoadData = require('ui/horseboard/searchHorse');
				var dataToLoad = new LoadData('Find by Sire', windowStack, function(_list) {
					var list = '';
					var _length = _list.length;
					for (var i = _length - 1; i >= 0; i--) {
						if (i > 0) {
							list = list + _list[i] + ';';
						} else {
							list = list + _list[i];
						}
					}
					param.sire_id = list;
					item.number.text = _length;
					e.section.updateItemAt(e.itemIndex, item);
				});

				windowStack.push(dataToLoad);

				if (isAndroid) {
					dataToLoad.open();
				} else {
					_navigation.openWindow(dataToLoad);
				}

			} else if (item.title.text === 'Dam') {
				var LoadData = require('ui/horseboard/searchHorse');
				var dataToLoad = new LoadData('Find by Dam', windowStack, function(_list) {
					var list = '';
					var _length = _list.length;
					for (var i = _length - 1; i >= 0; i--) {
						if (i > 0) {
							list = list + _list[i] + ';';
						} else {
							list = list + _list[i];
						}
					}
					param.dam_id = list;
					item.number.text = _length;
					e.section.updateItemAt(e.itemIndex, item);
				});

				windowStack.push(dataToLoad);

				if (isAndroid) {
					dataToLoad.open();
				} else {
					_navigation.openWindow(dataToLoad);
				}
			} else if (item.title.text === 'Studbook') {
				var LoadData = require('ui/horseboard/hb_Refine_Search');
				var dataToLoad = new LoadData('Find by Studbook', _board, windowStack, function(_breedlist) {
					var list = '';
					var _length = _breedlist.length;
					for (var i = _length - 1; i >= 0; i--) {
						if (i > 0) {
							list = list + _breedlist[i] + ';';
						} else {
							list = list + _breedlist[i];
						}
					}
					param.studbook_search = list;
					if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE) {
						item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
					}
					item.number.text = _length;
					e.section.updateItemAt(e.itemIndex, item);
				}, null);

				windowStack.push(dataToLoad);

				if (isAndroid) {
					dataToLoad.open();
				} else {
					_navigation.openWindow(dataToLoad);
				}
			} else if (item.title.text === 'Breeder') {
				var LoadData = require('ui/horseboard/searchHorse');
				var dataToLoad = new LoadData('Find by Breeder', windowStack, function(_list) {
					var list = '';
					var _length = _list.length;
					for (var i = _length - 1; i >= 0; i--) {
						if (i > 0) {
							list = list + _list[i] + ';';
						} else {
							list = list + _list[i];
						}
					}
					param.breeder = list;
					item.number.text = _length;
					e.section.updateItemAt(e.itemIndex, item);
				});

				windowStack.push(dataToLoad);

				if (isAndroid) {
					dataToLoad.open();
				} else {
					_navigation.openWindow(dataToLoad);
				}
			} else if (item.title.text === 'Owner') {
				var LoadData = require('ui/horseboard/searchHorse');
				var dataToLoad = new LoadData('Find by Owner', windowStack, function(_list) {
					var list = '';
					var _length = _list.length;
					for (var i = _length - 1; i >= 0; i--) {
						if (i > 0) {
							list = list + _list[i] + ';';
						} else {
							list = list + _list[i];
						}
					}
					param.owner = list;
					item.number.text = _length;
					e.section.updateItemAt(e.itemIndex, item);
				});

				windowStack.push(dataToLoad);

				if (isAndroid) {
					dataToLoad.open();
				} else {
					_navigation.openWindow(dataToLoad);
				}
			} else if (item.title.text === 'Country') {
				var LoadData = require('ui/horseboard/hb_Refine_Search');
				var dataToLoad = new LoadData('Find by Country', _board, windowStack, function(_breedlist) {
					var list = '';
					var _length = _breedlist.length;
					param.country_number = _length;
					for (var i = _length - 1; i >= 0; i--) {
						if (i > 0) {
							list = list + _breedlist[i] + ';';
						} else {
							list = list + _breedlist[i];
						}
					}
					param.country = list;
					if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE) {
						item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
					}
					item.number.text = _length;
					e.section.updateItemAt(e.itemIndex, item);
					if (_length > 1) {
						param.state = null;
						param.city = null;
						gpsLocationHandling('State/Province/Area');
						gpsLocationHandling('City/Town');
					}
				}, null);

				windowStack.push(dataToLoad);

				if (isAndroid) {
					dataToLoad.open();
				} else {
					_navigation.openWindow(dataToLoad);
				}
			} else if (item.title.text === 'Status') {
				var LoadData = require('ui/horseboard/hb_Refine_Search');
				var dataToLoad = new LoadData('Find by Status', _board, windowStack, function(_breedlist) {
					var list = '';
					var _length = _breedlist.length;
					for (var i = _length - 1; i >= 0; i--) {
						if (i > 0) {
							list = list + _breedlist[i] + ';';
						} else {
							list = list + _breedlist[i];
						}
					}
					param.status = list;
					if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE) {
						item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
					}
					item.number.text = _length;
					e.section.updateItemAt(e.itemIndex, item);
				}, null);

				windowStack.push(dataToLoad);

				if (isAndroid) {
					dataToLoad.open();
				} else {
					_navigation.openWindow(dataToLoad);
				}
			} else if (item.title.text === 'State/Province/Area') {
				var country_length = param.country_number;
				if (country_length) {
					if (country_length === 1) {
						var LoadData = require('ui/horseboard/hb_Refine_Search');
						var dataToLoad = new LoadData('State/Province/Area', _board, windowStack, function(_breedlist) {
							var list = '';
							var _length = _breedlist.length;
							for (var i = _length - 1; i >= 0; i--) {
								if (i > 0) {
									list = list + _breedlist[i] + ';';
								} else {
									list = list + _breedlist[i];
								}
							}
							param.state = list;
							if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE) {
								item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
							}
							item.number.text = _length;
							e.section.updateItemAt(e.itemIndex, item);
						}, param.country);

						windowStack.push(dataToLoad);

						if (isAndroid) {
							dataToLoad.open();
						} else {
							_navigation.openWindow(dataToLoad);
						}
					} else {
						alert('You have to select one country');
					}
				} else {
					alert('You have to select one country');
				}
			} else if (item.title.text === 'City/Town') {
				var country_length = param.country_number;
				if (country_length) {
					if (country_length === 1) {
						var LoadData = require('ui/horseboard/city');
						var dataToLoad = new LoadData('City/Town', param.country, windowStack, function(_city) {
							var list = '';
							var _length = _city.length;
							param.city_number = _length;
							for (var i = _length - 1; i >= 0; i--) {
								if (i > 0) {
									list = list + _city[i] + ';';
								} else {
									list = list + _city[i];
								}
							}
							param.city = list;
							if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE) {
								item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
							}
							item.number.text = _length;
							e.section.updateItemAt(e.itemIndex, item);
							if (_length > 1) {
								gpsLocationHandling('Distance');
								param.latitude = null;
								param.longitude = null;
								param.distance = null;
							}
						});

						windowStack.push(dataToLoad);

						if (isAndroid) {
							dataToLoad.open();
						} else {
							_navigation.openWindow(dataToLoad);
						}
					} else {
						alert('You have to select one country');
					}
				} else {
					alert('You have to select one country');
				}
			} else if (item.title.text === 'Distance') {
				var city_length = param.city_number;
				if (city_length) {
					if (city_length === 1) {
						var LoadData = require('ui/horseboard/distance');
						var dataToLoad = new LoadData('', windowStack, function(_lat, _lon, _distance) {
							param.latitude = _lat;
							param.longitude = _lon;
							param.distance = _distance;
							if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE) {
								item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
							}
							item.number.text = _distance;
							e.section.updateItemAt(e.itemIndex, item);
						}, null);

						windowStack.push(dataToLoad);

						if (isAndroid) {
							dataToLoad.open();
						} else {
							_navigation.openWindow(dataToLoad);
						}
					} else {
						alert('You have to select only one city at a time!');
					}
				} else {
					alert('You have to select only one city at a time!');
				}
			} else if (item.title.text === 'Semen') {
				var LoadData = require('ui/horseboard/hb_Refine_Search');
				var dataToLoad = new LoadData('Find by Semen', _board, windowStack, function(_breedlist) {
					if (_breedlist.length === 1) {
						if (_breedlist[0] === 'Cooled') {
							param.semen_cooled = 'yes';
						} else {
							param.semen_frozen = 'yes';
						}
					} else if (_breedlist.length === 2) {
						param.semen_cooled = 'yes';
						param.semen_frozen = 'yes';
					} else {
						param.semen_cooled = null;
						param.semen_frozen = null;
					}

					if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE) {
						item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
					}
					item.number.text = _breedlist.length;
					e.section.updateItemAt(e.itemIndex, item);
				}, null);

				windowStack.push(dataToLoad);

				if (isAndroid) {
					dataToLoad.open();
				} else {
					_navigation.openWindow(dataToLoad);
				}
			}
		} else {
			if (e.itemIndex) {
				var LoadData = require('ui/horseboard/hb_Refine_Search');
				var dataToLoad = new LoadData('Sort Horses', _board, windowStack, function(_sortCriteria) {
					param.sort_criteria = _sortCriteria;
					if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE) {
						item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
					}
					item.number.text = '1';
					e.section.updateItemAt(e.itemIndex, item);
				}, null);

				windowStack.push(dataToLoad);

				if (isAndroid) {
					dataToLoad.open();
				} else {
					_navigation.openWindow(dataToLoad);
				}
			} else {
				var LoadData = require('ui/horseboard/searchHorse');
				var dataToLoad = new LoadData('Find by Horse Name', windowStack, function(_id) {
					param.horse_id = _id;
					if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE) {
						item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
					}
					item.number.text = '1';
					e.section.updateItemAt(e.itemIndex, item);
				});

				windowStack.push(dataToLoad);

				if (isAndroid) {
					dataToLoad.open();
				} else {
					_navigation.openWindow(dataToLoad);
				}
			}
		}
	});

	//Data Sections
	var sections = [];
	function firstSection() {
		var data = [];
		data.push({
			title : {
				text : 'Find Horse by Name'
			},
			number : {
				text : ''
			},
			// Sets the regular list data properties
			properties : {
				accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
			}
		});

		data.push({
			title : {
				text : 'Sort'
			},
			number : {
				text : ''
			},
			// Sets the regular list data properties
			properties : {
				accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
			}
		});

		var section = Ti.UI.createListSection({
			items : data
		});

		return section;
	}


	sections.push(firstSection());

	//Custom row properties for different boards
	function customRowTitle(board) {
		if (board === 'Horseboard') {
			var _array = ['Breed', 'Gender', 'Age', 'Size', 'Type', 'Color', 'Sire', 'Dam', 'Studbook', 'Breeder', 'Owner', 'Country', 'State/Province/Area', 'City/Town', 'Distance'];
			return _array;
		} else if (board === 'Salesboard') {
			var _array = ['Sales Price', 'Breed', 'Gender', 'Age', 'Size', 'Type', 'Color', 'Sire', 'Dam', 'Status', 'Studbook', 'Owner', 'Country', 'State/Province/Area', 'City/Town', 'Distance'];
			return _array;
		} else if (board === 'Studboard') {
			var _array = ['Stud Fee', 'Breed', 'Age', 'Size', 'Type', 'Color', 'Sire', 'Dam', 'Studbook', 'Semen', 'Breeder', 'Owner', 'Country', 'State/Province/Area', 'City/Town', 'Distance'];
			return _array;
		}
	}

	function sectionHeader() {
		var headerView = Titanium.UI.createView({
			backgroundColor : '#36A9E1',
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE
		});

		var title = Titanium.UI.createLabel({
			color : '#FFF',
			text : 'Refine Search',
			height : Ti.UI.SIZE,
			width : Ti.UI.SIZE,
			left : '0dp'
		});

		headerView.add(title);
		return headerView;
	}

	//Second Section
	function secondSection(row_title) {
		var data = [];
		for (var i = 0,
		    j = row_title.length; i < j; i++) {
			data.push({
				title : {
					text : row_title[i]
				},
				number : {
					text : ''
				},
				// Sets the regular list data properties
				properties : {
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
				}
			});
		}

		var section = Ti.UI.createListSection({
			headerView : sectionHeader(),
			items : data
		});

		return section;
	}


	sections.push(secondSection(customRowTitle(_board)));
	listView.sections = sections;
	win.add(listView);

	//http request handling for submitting search filters values
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();

	function httpSuccess(json) {
		if (json.length) {
			onCreate(json, param);
			win.close();
		} else {
			alert('No Results for this Search!');
		}
	}

	function httpRequestHandling(_param) {
		var _url = system_url.getHBFilter_url();
		Ti.API.info(_param);
		var API_Call = require('ui/apiCalling/call_without_indicator');
		new API_Call('POST', _url, _param, function(json) {
			//Ti.API.info("json :  ");
			//Ti.API.info(json);
			httpSuccess(json);
		});
	}

	function getBoardName(_board) {
		if (_board === 'Horseboard') {
			return 'horse';
		} else if (_board === 'Salesboard') {
			return 'sales';
		} else if (_board === 'Studboard') {
			return 'stud';
		}
	}

	function submitToFeedback(e) {
		for (var prop in param) {
			param.page = 1;
			param.board = getBoardName(_board);
			httpRequestHandling(param);
			break;
		}
	}

	//Bottom toolbar view & it's functionality
	var Feedback = require('ui/bottomToolbar/search_to_feedback');
	var btmToolView = new Feedback('composite', _dimentions.toolViewHeight, submitToFeedback);
	win.add(btmToolView);

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/withBtmToolbar');
	new OnOrientaionChange(toolView, btmToolView, listView);

	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;
}

module.exports = horseBoard;
