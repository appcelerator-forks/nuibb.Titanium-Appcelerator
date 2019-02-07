function Tempalte() {
	var SystemUrl = require('ui/handheld/system_urls');
	this.system_url = new SystemUrl();

	if (Ti.Platform.osname === 'android') {
		var ImagesObject = require('ui/android/imagesPath');
		this.imagePath = new ImagesObject();
	} else {
		var ImagesObject = require('ui/iPhone/imagesPath');
		this.imagePath = new ImagesObject();
	}
};

/*
 * Get Group Block Template
 */
Tempalte.prototype.getGroupListTemplate = function(onClickListener) {

	var plainTemplate = {
		childTemplates : [{
			type : 'Ti.UI.ImageView',
			bindId : 'image',
			properties : {
				defaultImage : this.imagePath.no_image,
				backgroundColor : 'silver',
				height : '60dp',
				width : '60dp',
				left : '5dp',
				top : '5dp'
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'username',
			properties : {
				color : '#27AAE1',
				top : '2dp',
				left : '75dp',
				height : '20dp',
				width : Ti.UI.FILL,
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold',
					fontSize : '14dp'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'details',
			properties : {
				color : '#000',
				left : '75dp',
				top : '22dp',
				height : Ti.UI.SIZE,
				width : Ti.UI.FILL,
				font : {
					fontFamily : 'Arial',
					fontSize : '14dp'
				}
			}
		}],
		properties : {
			height : Ti.UI.SIZE,
			backgroundColor : '#FFF'
		},
		events : {
			click : onClickListener
		}
	};

	return plainTemplate;
};

/*
 * Set data to Group Block Template
 */
Tempalte.prototype.setDataToGroupListTemplate = function(json) {
	var data = [];
	for (var i = 0,
	    j = json.length; i < j; i++) {
		data.push({
			template : 'groups_list',
			image : {
				image : this.system_url.getHostUrl() + json[i].image
			},
			username : {
				text : json[i].name
			},
			details : {
				text : json[i].description
			},
			properties : {
				itemId : json[i].id
			}
		});
	};

	var section = Ti.UI.createListSection({
		items : data
	});

	return section;
};

module.exports = Tempalte;
