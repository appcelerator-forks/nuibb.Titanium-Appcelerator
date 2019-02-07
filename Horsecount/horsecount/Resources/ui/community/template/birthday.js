function Birthday() {
	var SystemUrl = require('ui/handheld/system_urls');
	this.system_url = new SystemUrl();
}

Birthday.prototype.getBirthdayTemplate = function() {

	var plainTemplate = {

		childTemplates : [{
			type : 'Ti.UI.ImageView',
			bindId : 'pic',
			properties : {
				backgroundColor : 'silver',
				height : '60dp',
				width : '60dp',
				left : '5dp',
				top : '10dp'
			}
		}, {
			type : 'Ti.UI.View',
			bindId : 'second_block',
			properties : {
				//backgroundColor : 'red',
				layout : 'vertical',
				top : '2dp',
				left : '75dp',
				height : Ti.UI.SIZE,
				width : Ti.UI.SIZE
			},
			childTemplates : [{
				type : 'Ti.UI.Label',
				bindId : 'username',
				properties : {
					color : '#27AAE1',
					height : Ti.UI.SIZE,
					width : Ti.UI.FILL,
					font : {
						fontFamily : 'Arial',
						fontWeight : 'bold',
						fontSize : '14dp'
					}
				}
			}, {
				type : 'Ti.UI.Label',
				bindId : 'date',
				properties : {
					color : '#000',
					height : Ti.UI.SIZE,
					width : Ti.UI.FILL,
					font : {
						fontFamily : 'Arial',
						fontSize : '14dp'
					}
				}
			}, {
				type : 'Ti.UI.Label',
				bindId : 'account',
				properties : {
					color : '#000',
					height : Ti.UI.SIZE,
					width : Ti.UI.FILL,
					font : {
						fontFamily : 'Arial',
						fontSize : '14dp'
					}
				}
			}, {
				type : 'Ti.UI.Label',
				bindId : 'location',
				properties : {
					color : '#000',
					height : Ti.UI.SIZE,
					width : Ti.UI.FILL,
					font : {
						fontFamily : 'Arial',
						fontSize : '14dp'
					}
				}
			}]
		}],
		properties : {
			height : Ti.UI.SIZE,
			backgroundColor : '#FFF'
		}
	};

	return plainTemplate;
};

Birthday.prototype.setDataToBirthdayTemplate = function(json) {
	var data = [];
	for (var i = 0,
	    j = json.length; i < j; i++) {
		data.push({
			template : 'birthday',
			pic : {
				image : this.system_url.getHostUrl() + json[i].profile_picture_link
			},
			username : {
				text : json[i].full_name
			},
			date : {
				text : json[i].next_birth_day
			},
			account : {
				text : json[i].account.account_name
			},
			location : {
				text : json[i].account.city + ', ' + json[i].account.country_code
			}
		});
	};

	var section = Ti.UI.createListSection({
		items : data
	});

	return section;
};

module.exports = Birthday;
