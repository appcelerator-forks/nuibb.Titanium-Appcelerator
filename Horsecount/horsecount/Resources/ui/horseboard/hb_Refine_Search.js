function HorseList(_title, _board, windowStack, onCreate, _code) {
	var isAndroid = Ti.Platform.osname === 'android';
	var _array = [];

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
	var Dimentions = require('dimension/withoutBtmToolbar');
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
	//Event listener for right button of upper toolbar
	function onRightBtnClick(e) {
		if (_title !== 'Sort Horses') {
			if (_array.length) {
				onCreate(_array);
				win.close();
			}
		} else {
			if (_array.length === 1) {
				onCreate(_array[0]);
				win.close();
			} else {
				alert('You can not select more than 1 item at a time here!');
			}
		}
	}

	//Back to the previous window while click on the back button of upper toolbar
	function closeWindow() {
		win.close();
	}

	//Upper toolbar's views
	var ToolBar = require('ui/upperToolbar/including_right_btn');
	var upperToolView = new ToolBar(imagePath.search_focus, _title, imagePath.tick, _dimentions.toolViewHeight);
	upperToolView.children[0].addEventListener('touchend', closeWindow);
	upperToolView.children[2].addEventListener('touchend', onRightBtnClick);
	win.add(upperToolView);

	//Search bar
	var search = Titanium.UI.createSearchBar({
		barColor : 'silver',
		showCancel : true,
		hintText : "Table Search"
	});

	//win.add(search);

	var plainTemplate = {
		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'title',
			properties : {
				color : '#000',
				height : '30dp',
				width : Ti.UI.FILL,
				left : '15dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold',
					fontSize : '14dp'
				}
			}
		}],
		properties : {
			height : '30dp',
			backgroundColor : '#FFF'
		}
	};

	var listView = Ti.UI.createListView({
		top : '1%',
		bottom : '1%',
		left : '5dp',
		right : '5dp',
		borderRadius : 5,
		templates : {
			'plain' : plainTemplate
		},
		defaultItemTemplate : 'plain',
		searchView : search,
		caseInsensitiveSearch : true
	});

	listView.addEventListener('itemclick', function(e) {
		if (_title !== 'Find by Country') {
			var item = e.section.getItemAt(e.itemIndex);

			if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_NONE) {
				item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
				_array.push(item.title.text);
			} else if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK) {
				item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
				_array.pop(item.title.text);
			}
			e.section.updateItemAt(e.itemIndex, item);
		} else {
			var item = e.section.getItemAt(e.itemIndex);
			if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_NONE) {
				item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
				_array.push(e.itemId);
			} else if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK) {
				item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
				_array.pop(e.itemId);
			}
			e.section.updateItemAt(e.itemIndex, item);
		}
	});

	listView.add(activityIndicator);
	win.add(listView);

	//For Find by Horse Name Search Criteria
	function renderJson(json) {
		var data = [];

		for (var i = 0,
		    j = json.length; i < j; i++) {
			var array = json[i];
			data.push({
				title : {
					text : array[0]
				},
				// Sets the regular list data properties
				properties : {
					itemId : array[1],
					searchableText : array[0],
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
				}
			});
		}

		var section = Ti.UI.createListSection({
			items : data
		});

		listView.sections = [section];
	}

	function Fill_With_JSON(_url) {
		var API_Call = require('ui/apiCalling/call_with_indicator');
		new API_Call('GET', _url, null, activityIndicator, function(json) {
			renderJson(json);
		});
	}

	function getSortHorsesArray(board) {
		if (board === 'Horseboard' || board === 'Salesboard') {
			var _array = ['Breed', 'Gender', 'Size', 'Age', 'Type', 'Color', 'Sire', 'Dam', 'Studbook', 'Breeder', 'Owner', 'Country', 'State/Province/Area', 'City/Town', 'Posted', 'Viewed'];
			return _array;
		} else {
			var _array = ['Breed', 'Size', 'Age', 'Type', 'Color', 'Sire', 'Dam', 'Studbook', 'Breeder', 'Owner', 'Country', 'State/Province/Area', 'City/Town', 'Posted', 'Viewed'];
			return _array;
		}
	}

	//Adding data to the table for different refine search criteria
	if (_title === 'Sort Horses') {
		var sortArray = getSortHorsesArray(_board);
		var data = [];

		for (var i = 0,
		    j = sortArray.length; i < j; i++) {
			data.push({
				title : {
					text : sortArray[i]
				},
				// Sets the regular list data properties
				properties : {
					searchableText : sortArray[i],
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
				}
			});
		}

		var section = Ti.UI.createListSection({
			items : data
		});

		listView.sections = [section];

	} else if (_title === 'Find by Breed') {
		var BREED = ["Akhal Tekes", "Alter Real", "American Cream Draft", "American Sport Horse", "American Warmblood", "Andalusian", "Anglo Arab", "Anglo Norman", "Appaloosa", "Appendix", "Arabian", "Araloosa", "Ardennes", "Australian Pony", "Australian Sport Horse", "Australian Stock Horse", "Australian Warm Blood", "Austrian", "Autre Que Pure Sang", "Azteca", "Baden Wurttemberg", "Balzer", "Barb", "Bashkir Curly", "Basotho Pony", "Bavarian Warmblood", "Belgian Draft", "Belgian Warmblood", "Berlin Brandenburg", "Boerperd", "Bosnian", "Brazilian Horse Society", "British Hanoverian", "British Riding Pony", "British Sport Horse", "British Warmblood", "Buckskin/Dun", "Budjonny", "Camargue", "Campolina", "Canadian", "Canadian Sport", "Canadian Warmblood", "Caspian", "Champagne", "Chincoteague Pony", "Cleveland Bay", "Clydesdale", "Connemara Pony", "Criollo", "Crossbred", "Crossbred Pony", "Curly", "Dale/Exmoor Pony", "Danish Sport Pony", "Danish Sports Pony", "Danish Warmblood", "Dartmoor", "Dole-Gudbrandsdal", "Don", "Draft", "Drum", "Dutch Appaloosa", "Dutch Warmblood", "East Friesian", "East Prussian", "English Riding Pony", "Falabella", "Fell Pony", "Finnish Warmblood", "Fjords", "Fredericksborg", "French Barb", "French Trotter", "Friesian", "Furioso", "Galenico", "Gelderlander", "Georgian Grands", "German Warmblood", "Gidran", "Gotland Pony", "Groninger", "Gypsy Vanner", "Hackney", "Haflinger", "Hanoverian", "Harlequin", "Hessen", "Hessischer", "Highland pony", "Holsteiner", "Hungarian", "Iberian", "Icelandic", "Irish Draught Sport Horse", "Irish Halfbred", "Irish Tinker", "Italian Sport horse", "Kisber Felver", "Kladrubker", "KWPN", "Lipizzaner", "Lustitano", "Managalarga Marchador", "Managalarga Paulista", "Maremmana", "Mecklenburg-Vorpommem", "Mexican Sport Horse", "Miniature", "Miniature, American", "Missouri Foxtrotter", "Morgan", "Mountain Pleasure", "Murakosi", "Murgese", "Mustang wild", "National Quarter Pony", "National Quarter Pony", "National Show", "New Forest Pony", "New Zealand Sport horse", "Noriker", "North Star", "North Swedish Draft", "Norwegian Fjord", "Norwegian Warmblood", "Oldenburg", "Palomino", "Part-Bred Arab", "Paso Fino", "Percheron", "Peruvian Paso", "Pinto", "Pony", "Pony of americas", "Przewalskis", "Quarter Horse", "Racking", "Rheinland Pfalz", "Rhinelander", "Riding Pony", "Rocky Mountain", "Russian", "Sachsen", "Sachsen-Anhalt", "Saddlebred", "Saddlebred-Cross", "Salerno", "Scottish Sport Horse", "Selle Francais", "Shagya Arab", "Shetland", "Shetland, American", "Shire", "Sorraria Mustang", "South African Warmblood", "Spanish Purebred", "Spotted", "Spotted Saddle", "Standardbred", "Suffolk Punch", "Swedish Riding Pony", "Swedish Warmblood", "Swiss Warmblood", "Tennessee Walking Horse", "Tersk", "Thoroughbred", "Tiger", "Trakhener", "Trotter", "Ukranian", "Uyogoslavian", "Waler", "Warmblood", "Welsh Cob", "Welsh Mountain Pony", "Welsh Pony", "Welsh Pony Cob Tpe", "Westphalian", "Wielkopolski", "Zangersheide", "Zweibrucker", "Other"];
		var data = [];

		for (var i = 0,
		    j = BREED.length; i < j; i++) {
			data.push({
				title : {
					text : BREED[i]
				},
				// Sets the regular list data properties
				properties : {
					searchableText : BREED[i],
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
				}
			});
		}

		var section = Ti.UI.createListSection({
			items : data
		});

		listView.sections = [section];

	} else if (_title === 'Find by Gender') {
		var gender = ["Stallion", "Mare", "Gelding"];
		var data = [];

		for (var i = 0,
		    j = gender.length; i < j; i++) {
			data.push({
				title : {
					text : gender[i]
				},
				// Sets the regular list data properties
				properties : {
					searchableText : gender[i],
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
				}
			});
		}

		var section = Ti.UI.createListSection({
			items : data
		});

		listView.sections = [section];

	} else if (_title === 'Find by Type') {
		var HORSE_TYPE = ['All Around', 'Barrel Racing', 'Beginner/Family', 'Breeding', 'Brood Mare', 'Calf Roping', 'Companion Only', 'Country Pleasure', 'Cowboy Mounted Shooting', 'Cutting', 'Draft', 'Dressage', 'Drill Team', 'Driving', 'Endurance Riding', 'English Pleasure', 'Equitation', 'Eventing', 'Field Hunter', 'Gaited', 'Halter', 'Harness', 'Horsemanship', 'Hunter', 'Hunter under Saddle', 'Judged Pleasure Rides', 'Jumper', 'Lesson Horse', 'Longe-Line', 'Not Applicable', 'Pleasure  Driving', 'Pole Bending', 'Polo', 'Ranch Horse', 'Racing', 'Ranch Sorting', 'Reined Cow Horse', 'Reining', 'Showmanship', 'Sidesaddle', 'Steer Wrestling', 'Team Penning', 'Team Roping', 'Team Sorting', 'Trail Competitions', 'Trail Horse', 'Vaulting', 'Western Pleasure', 'Western Pleasure (Show)', 'Western Riding', 'Working Cow Horse', 'Youth Horse'];
		var data = [];

		for (var i = 0,
		    j = HORSE_TYPE.length; i < j; i++) {
			data.push({
				title : {
					text : HORSE_TYPE[i]
				},
				// Sets the regular list data properties
				properties : {
					searchableText : HORSE_TYPE[i],
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
				}
			});
		}

		var section = Ti.UI.createListSection({
			items : data
		});

		listView.sections = [section];
	} else if (_title === 'Find by Color') {
		var COLORS = ["Bay Dun,  Roan", "Bay, Appaloosa", "Bay, Dapple", "Bay, Dun", "Bay, Pintaloosa", "Bay, Pinto", "Bay, Roan", "Bay, Roan Pintaloosa", "Bay, Silver", "Bay, Silver Dun", "Bay, Silver, Roan", "Bay, Solid", "Black, Appaloosa", "Black, Pintaloosa", "Black, Pinto", "Black, Roan", "Black, Silver Roan", "Black, Silver Smoky", "Black, Smoky", "Black, Solid", "Black,Smoky Roan", "Blue Dun, Solid", "Blue Roan, Pintaloosa", "Blue Roan, Pinto", "Blue, Roan", "Brown, Appaloosa", "Brown, Dapple", "Brown, Pintaloosa", "Brown, Pinto", "Brown, Roan", "Brown, Solid", "Buckskin, Appaloosa", "Buckskin, Dapple", "Buckskin, Pintaloosa", "Buckskin, Pinto", "Buckskin, Roan", "Buckskin, Silver", "Buckskin, Solid", "Champagne, Amber", "Champagne, Amber Cream", "Champagne, Amber Cream  Dun", "Champagne, Amber Dun", "Champagne, Classic", "Champagne, Classic Cream", "Champagne, Classic Cream Dun", "Champagne, Classic Dun", "Champagne, Gold", "Champagne, Gold Cream", "Champagne, Gold Cream Dun", "Champagne, Gold Dun", "Champagne, Silver Amber", "Champagne, Silver Classic", "Chestnut, Appaloosa", "Chestnut, Dapple", "Chestnut, Pintaloosa", "Chestnut, Pinto", "Chestnut, Roan", "Chestnut, Solid", "Cream, Silver Smoky", "Cream, Smoky", "Cream, Smoky Dun", "Cremello, Dun", "Cremello, Pinto", "Cremello, Solid", "Dun, Appaloosa", "Dun, Dapple", "Dun, Pintaloosa", "Dun, Pinto", "Dun, Roan", "Dun, Solid", "Dunalino", "Dunalino, Roan", "Dunskin", "Dunskin, Roan", "Grey Dun, Solid", "Grey, Appaloosa", "Grey, Dapple", "Grey, Pintaloosa", "Grey, Pinto", "Grey, Roan", "Grey, Solid", "Grullo, Appaloosa", "Grullo, Pintaloosa", "Grullo, Pinto", "Grullo, Roan", "Grullo, Silver", "Grullo, Smoky", "Grullo, Smoky Roan", "Grullo, Solid", "Palomino, Appaloosa", "Palomino, Dapple", "Palomino, Pintaloosa", "Palomino, Pinto", "Palomino, Roan", "Palomino, Solid", "Perlino", "Perlino, Dun", "Perlino, Silver", "Red Dun, Pinto", "Red Dun, Roan", "Red Dun, Solid", "Red Roan, Pintaloosa", "Red, Roan", "Roan,  Blue Appaloosa", "Roan, Bay Appaloosa", "Roan, Bay Pinto", "Roan, Black Pinto", "Roan, Chestnut Pinto", "Roan, Grey Pinto", "Roan, Red Appaloosa", "Roan, Red Pinto", "Silver Dapple, Appaloosa", "Silver Dapple, Pintaloosa", "Silver Dapple, Pinto", "Silver Dapple, Solid", "Silver, Dapple", "Sorrel, Appaloosa", "Sorrel, Pintaloosa", "Sorrel, Pinto", "Sorrel, Solid", "White, Appaloosa", "White, Pintaloosa", "White, Solid"];
		var data = [];

		for (var i = 0,
		    j = COLORS.length; i < j; i++) {
			data.push({
				title : {
					text : COLORS[i]
				},
				// Sets the regular list data properties
				properties : {
					searchableText : COLORS[i],
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
				}
			});
		}

		var section = Ti.UI.createListSection({
			items : data
		});

		listView.sections = [section];
	} else if (_title === 'Find by Studbook') {
		var gender = ['American Miniature Horse Association', 'American Miniature Horse Registry', 'NMPRS'];
		var data = [];

		for (var i = 0,
		    j = gender.length; i < j; i++) {
			data.push({
				title : {
					text : gender[i]
				},
				// Sets the regular list data properties
				properties : {
					searchableText : gender[i],
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
				}
			});
		}

		var section = Ti.UI.createListSection({
			items : data
		});

		listView.sections = [section];

	} else if (_title === 'Find by Country') {
		var SystemUrl = require('ui/handheld/system_urls');
		var system_url = new SystemUrl();
		var _url = system_url.getCountry_url();
		Fill_With_JSON(_url);
	} else if (_title === 'Find by Status') {
		var status = ["Driving Horse", "Foal @ Foot", "Infertile", "In-Foal <6Mth", "In-Foal >9Mth", "In-Foal 6-9Mth", "In-Training", "Open", "Other", "Retired", "Riding Horse", "Stud"];
		var data = [];

		for (var i = 0,
		    j = status.length; i < j; i++) {
			data.push({
				title : {
					text : status[i]
				},
				// Sets the regular list data properties
				properties : {
					searchableText : status[i],
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
				}
			});
		}

		var section = Ti.UI.createListSection({
			items : data
		});

		listView.sections = [section];
	} else if (_title === 'State/Province/Area') {
		var SystemUrl = require('ui/handheld/system_urls');
		var system_url = new SystemUrl();
		if (_code) {
			var _url = system_url.getStates_url(_code);
			Fill_With_JSON(_url);
		}
	} else if (_title === 'Find by Semen') {
		var status = ['Cooled', 'Frozen'];
		var data = [];

		for (var i = 0,
		    j = status.length; i < j; i++) {
			data.push({
				title : {
					text : status[i]
				},
				// Sets the regular list data properties
				properties : {
					searchableText : status[i],
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
				}
			});
		}

		var section = Ti.UI.createListSection({
			items : data
		});

		listView.sections = [section];
	} else if (_title === 'Select Currencies') {
		var currencies = ["US $", "Euro €", "Japanese Yen ¥", "GB Pound £", "Australian $", "Swiss Frank Fr", "Canadian $", "Chinese Yuan ¥", "Swedish Krona", "Russian Rouble", "Hong Kong $", "Singapore $", "Mexican Peso"];
		var data = [];

		for (var i = 0,
		    j = currencies.length; i < j; i++) {
			data.push({
				title : {
					text : currencies[i]
				},
				// Sets the regular list data properties
				properties : {
					searchableText : currencies[i],
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
				}
			});
		}

		var section = Ti.UI.createListSection({
			items : data
		});

		listView.sections = [section];
	}

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/only_upper_toolbar');
	new OnOrientaionChange(upperToolView);

	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;
};

module.exports = HorseList;
