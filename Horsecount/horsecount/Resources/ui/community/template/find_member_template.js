function FindMemberTemplate() {
	var SystemUrl = require('ui/handheld/system_urls');
	this.system_url = new SystemUrl();
}

FindMemberTemplate.prototype.getFindMemberTemplate = function(onClickListener) {
	var leftUnit = '75dp';
	var plainTemplate = {
		childTemplates : [{
			type : 'Ti.UI.ImageView',
			bindId : 'profile_pic',
			properties : {
				backgroundColor : 'silver',
				height : '64dp',
				width : '62dp',
				left : '.5dp',
				top : '5dp'
			},
			events : {
				click : onClickListener
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'profile_name',
			properties : {
				color : '#27AAE1',
				height : '20dp',
				width : Ti.UI.FILL,
				left : leftUnit,
				top : '4dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold',
					fontSize : '14dp'
				}

			},
			events : {
				click : onClickListener
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'city',
			properties : {
				color : '#000',
				height : '20dp',
				width : Ti.UI.FILL,
				left : leftUnit,
				top : '18dp',
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
				top : '33dp',
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
				top : '48dp',
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
			height : '75dp',
			backgroundColor : '#FFF'
		}
	};
	return plainTemplate;
};

FindMemberTemplate.prototype.setDataToFindMemberTemplate = function(json) {
	var sections = [];
	for (var i = 0; i < json.length; i++) {
		var section = Ti.UI.createListSection();
		section.setItems([{
			profile_pic : {
				image : this.system_url.getHostUrl() + json[i].profile_picture_link
			},
			profile_name : {
				text : json[i].full_name
			},
			city : {
				text : json[i].account_location.city
			},
			state : {
				text : json[i].account_location.state

			},
			country_code : {
				text : json[i].account_location.country_code

			},
			properties : {
				user_id : json[i].user_id,
				itemId : json[i].user_id,
				searchableText : json[i].full_name,
			}

		}]);

		sections.push(section);
	}
	return sections;
};

module.exports = FindMemberTemplate;
