function DirectContactTemplate() {
	var SystemUrl = require('ui/handheld/system_urls');
	this.system_url = new SystemUrl();
}

/*
 * Get Template for Direct Contacts
 */
DirectContactTemplate.prototype.getDirectContactTemplate = function(eventListener) {
	//Template for listview
	var leftUnit = '75dp';
	return {

		childTemplates : [{
			type : 'Ti.UI.ImageView',
			bindId : 'profile_pic',
			properties : {
				backgroundColor : 'silver',
				height : '60dp',
				width : '60dp',
				left : '5dp',
				top : '4dp'
			},
			events : {
				click : eventListener
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'profile_name',
			properties : {
				color : '#27AAE1',
				height : '20dp',
				width : Ti.UI.FILL,
				left : leftUnit,
				top : '2dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold',
					fontSize : '14dp'
				}

			},
			events : {
				click : eventListener
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'city',
			properties : {
				color : '#000',
				height : '20dp',
				width : Ti.UI.FILL,
				left : leftUnit,
				top : '16dp',
				font : {
					fontFamily : 'Arial',
					fontSize : '14dp'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'state',
			properties : {
				color : '#000',
				height : '20dp',
				width : Ti.UI.FILL,
				left : leftUnit,
				top : '31dp',
				ellipsize : true,
				wordWrap : false,
				singleline : false,
				font : {
					fontFamily : 'Arial',
					fontWeight : 'normal',
					fontSize : '14dp'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'country_code',
			properties : {
				color : '#000',
				height : '20dp',
				width : Ti.UI.FILL,
				left : leftUnit,
				top : '46dp',
				ellipsize : true,
				wordWrap : false,
				singleline : false,
				font : {
					fontFamily : 'Arial',
					fontWeight : 'normal',
					fontSize : '14dp'
				}
			}
		}],
		properties : {
			height : '70dp',
			backgroundColor : '#FFF'
		}
	};
};

/*
 * Set data to Direct Contacts
 */
DirectContactTemplate.prototype.setDataToDirectContactTemplate = function(json) {
	var sections = [];
	for (var i = 0; i < json.length; i++) {
		var section = Ti.UI.createListSection();
		section.setItems([{
			template : 'direct_contacts',
			profile_pic : {
				image : this.system_url.getHostUrl() + json[i].profile_picture_link
			},
			profile_name : {
				text : json[i].full_name
			},
			city : {
				text : json[i].account_location.state
			},
			state : {
				text : json[i].account_location.city

			},
			country_code : {
				text : json[i].account_location.country_code

			},
			properties : {
				user_id : json[i].user_id,
				itemId : json[i].user_id
			}
		}]);
		
		sections.push(section);
	}
	return sections;
};

module.exports = DirectContactTemplate;
