function Template() {
	var SystemUrl = require('ui/handheld/system_urls');
	this.system_url = new SystemUrl();
	
	if (Ti.Platform.osname === 'android') {
		var ImagesObject = require('ui/android/imagesPath');
		this.imagePath = new ImagesObject();
	} else {
		var ImagesObject = require('ui/iPhone/imagesPath');
		this.imagePath = new ImagesObject();
	}
}

/*
 * Get Group Block Template
 */
Template.prototype.getGroupBlockTemplate = function() {
	var imgHeightWidth = '80dp';

	var plainTemplate = {
		childTemplates : [{
			type : 'Ti.UI.ImageView',
			bindId : 'profile_pic',
			properties : {
				defaultImage : this.imagePath.no_image,
				backgroundColor : 'silver',
				height : imgHeightWidth,
				width : imgHeightWidth,
				left : '5dp',
				top : '4dp',
				bottom : '4dp'
			}
		}, {
			type : 'Ti.UI.View',
			bindId : 'text_holder',
			properties : {
				layout : 'vertical',
				height : Ti.UI.SIZE,
				width : Ti.UI.FILL,
				top : '5dp',
				left : (parseFloat(imgHeightWidth) + 10) + 'dp'
			},
			childTemplates : [{
				type : 'Ti.UI.Label',
				bindId : 'name',
				properties : {
					color : '#27AAE1',
					height : Ti.UI.SIZE,
					left : '5dp',
					width : Ti.UI.SIZE,
					font : {
						fontFamily : 'Arial',
						fontSize : '14dp'
					}
				}
			}, {
				type : 'Ti.UI.Label',
				bindId : '_description',
				properties : {
					//backgroundColor : 'blue',
					height : Ti.UI.SIZE,
					width : Ti.UI.SIZE,
					left : '5dp',
					font : {
						fontFamily : 'Arial',
						fontSize : '12dp'
					}
				}
			}]
		}],
		properties : {
			backgroundColor : '#FFF',
			height : Ti.UI.SIZE
		}
	};
	return plainTemplate;
};

/*
 * Set data to Group Block Template
 */
Template.prototype.setDataToGroupBlockTemplate = function(json) {
	return [{
		template : 'group_block',
		profile_pic : {
			image : this.system_url.getHostUrl() + json.group_photo
		},

		name : {
			text : json.name
		},

		_description : {
			text : json.description
		},

		properties : {
			itemId : json.group_id
		}
	}];
};

module.exports = Template;

