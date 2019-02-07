module.exports = function Report(_id, _title, windowStack) {
	var isAndroid = Ti.Platform.osname === 'android';
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();
	var param = {};
	var _array = [];

	//Getting activity indicator object
	var Indicator = require('ui/common/activityIndicator');
	var activityIndicator = new Indicator('40%', '50%');

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

	//Getting window icon dynamically
	function getWindowIcon(_title) {
		switch(_title) {
		case 'Horseboard':
			return imagePath.board_horse_focus;
		case 'Salesboard':
			return imagePath.board_sales_focus;
		case 'Studboard':
			return imagePath.board_stud_focus;
		case 'community_image':
		case 'community_video':
			return imagePath.photo_video_viewer_focus;
		default :
			return imagePath.newsfeed_focus;
		}
	}

	function closeWindow() {
		win.close();
	}

	//Upper toolbar's views
	var upperToolView = require('ui/upperToolbar/excluding_right_btn');
	var toolView = new upperToolView(getWindowIcon(_title), 'Report', _dimentions.toolViewHeight);
	toolView.children[0].addEventListener('touchend', closeWindow);
	win.add(toolView);

	var plainTemplate = {

		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'title',
			properties : {
				height : Ti.UI.SIZE,
				width : Ti.UI.FILL,
				left : '10dp',
				font : {
					fontFamily : 'Arial',
					fontSize : '14dp',
					fontWeight : 'bold'
				}
			}
		}],
		properties : {
			height : '40dp',
			//selectedBackgroundColor: 'transparent',
			backgroundColor : '#FFF'
		}
	};

	var listView = Ti.UI.createListView({
		height : _dimentions.listViewHeight,
		left : '5dp',
		right : '5dp',
		top : _dimentions.listViewTop,
		borderRadius : 5,
		templates : {
			'default' : plainTemplate
		},
		defaultItemTemplate : 'default'
	});

	listView.addEventListener('itemclick', function(e) {
		var item = e.section.getItemAt(e.itemIndex);
		if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_NONE) {
			item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
			_array.push(e.itemId);
		} else if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK) {
			item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
			_array.pop(e.itemId);
		}
		e.section.updateItemAt(e.itemIndex, item);
	});

	listView.add(activityIndicator);
	win.add(listView);

	function header_title(_title) {
		if (_title === 'community_post' || _title === 'community_group') {
			return 'I want to report this post as it';
		} else if (_title === 'community_image' || _title === 'community_video') {
			return 'I want to report this Image or Video as';
		} else {
			return 'I want to report this horse post, because it';
		}

	}

	function sectionHeader() {
		var title = Titanium.UI.createLabel({
			text : header_title(_title),
			color : '#FFF',
			font : {
				fontFamily : 'Arial',
				fontWeight : 'bold',
				fontSize : '15dp'
			},
			left : '10dp',
			height : Ti.UI.SIZE,
			width : Ti.UI.SIZE
		});

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
					color : '#1c75BC',
					offset : 0.75
				}]
			}
		});

		_view.add(title);

		return _view;
	}

	//Adding data to boards template
	function add_data_to_boards(json) {
		param.horse_id = _id;
		param.complainable_id = json.complain.complainable_id;
		param.complainable_type = json.complain.complainable_type;
		param.violation_scene = json.complain.violation_scene;
		var data = [];
		for (var i = 0,
		    j = json.complain_items.length; i < j; i++) {
			data.push({
				title : {
					text : json.complain_items[i].name
				},
				// Sets the regular list data properties
				properties : {
					itemId : json.complain_items[i].id,
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
				}
			});
		}

		var section = Ti.UI.createListSection({
			headerView : sectionHeader(),
			items : data
		});

		listView.sections = [section];
		activityIndicator.hide();
	}

	//Adding data to community section
	function add_data_to_community(json) {
		var data = [];
		for (var i = 0,
		    j = json.length; i < j; i++) {
			data.push({
				title : {
					text : json[i].name
				},
				// Sets the regular list data properties
				properties : {
					itemId : json[i].id,
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
				}
			});
		}

		var section = Ti.UI.createListSection({
			headerView : sectionHeader(),
			items : data
		});

		listView.sections = [section];
		activityIndicator.hide();
	}

	//Get api url for reporting data
	function getUrl(_title) {
		if (_title === 'community_post' || _title === 'community_group' || _title === 'community_image' || _title === 'community_video') {
			return system_url.getCommunityReport_url();
		} else {
			return system_url.getScamReport_url(_id);
		}
	}

	//API calling to get json data from server and updating database as well as replacing listview data by this json data
	var API_Call = require('ui/apiCalling/call_with_indicator');
	new API_Call('GET', getUrl(_title), null, activityIndicator, function(json) {
		if (_title === 'community_post' || _title === 'community_group' || _title === 'community_image' || _title === 'community_video') {
			add_data_to_community(json);
		} else {
			add_data_to_boards(json);
		}
	});

	//posting report to the server
	function onSuccess(json) {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'Message!',
			message : json.message,
			buttonNames : ['OK']
		});

		win.close();
		alertDialog.show();
		//var _url = system_url.getPostReport_url();
	}

	//Get post url on submit button click
	function get_post_url(_title) {
		if (_title === 'community_post') {
			return system_url.postCommunityReport_url(_id);
		} else if (_title === 'community_group') {
			return system_url.postGroupReport_url(_id);
		} else if (_title === 'community_image') {
			return system_url.getImageReport_url(_id);
		} else if (_title === 'community_video') {
			return system_url.getVideoReport_url(_id);
		} else {
			return system_url.postBoardsReport_url();
		}
	}

	//Get feedback upon submit button click
	function submitToFeedback() {
		if (_array.length === 1) {
			param.complain_list_id = _array[0];
			var CallToPost = require('ui/apiCalling/call_without_indicator');
			new CallToPost('POST', get_post_url(_title), param, onSuccess);
		} else {
			alert('Can not claim more than one report at a time!');
		}
	}

	//Bottom toolbar view & it's functionality
	var Feedback = require('ui/bottomToolbar/submit_to_feedback');
	var btmToolview = new Feedback('Submit', _dimentions.toolViewHeight, submitToFeedback);
	win.add(btmToolview);

	//Changing UI dimension while device orientation occurs
	var OnOrientaionChange = require('orientation/withBtmToolbar');
	new OnOrientaionChange(toolView, btmToolview, listView);

	win.addEventListener('close', function(e) {
		windowStack.pop();
		win = null;
	});

	return win;
};
