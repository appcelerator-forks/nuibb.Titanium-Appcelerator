function Template(onClickListener) {
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
 * Get Profile Block Template
 */
Template.prototype.getProfileBlockTemplate = function(onClickListener) {
	var imgHeightWidth = '80dp';
	var plainTemplate = {
		childTemplates : [{
			type : 'Ti.UI.ImageView',
			bindId : 'profile_pic',
			properties : {
				defaultImage : this.imagePath.no_image,
				backgroundColor : 'silver',
				top : '5dp',
				height : imgHeightWidth,
				width : imgHeightWidth,
				left : '5dp',
				bottom : '5dp'
			},
			events : {
				click : onClickListener
			}
		}, {
			type : 'Ti.UI.View',
			bindId : 'text_holder',
			properties : {
				layout : 'vertical',
				top : '0dp',
				height : Ti.UI.SIZE,
				width : Ti.UI.FILL,
				top : '5dp',
				left : (parseFloat(imgHeightWidth) + 10) + 'dp'
			},
			childTemplates : [{
				type : 'Ti.UI.Label',
				bindId : 'gender',
				properties : {
					height : Ti.UI.SIZE,
					width : Ti.UI.SIZE,
					left : '5dp',
					font : {
						fontFamily : 'Arial',
						fontSize : '14dp'
					}
				}
			}, {
				type : 'Ti.UI.Label',
				bindId : 'date',
				properties : {
					//backgroundColor : 'blue',
					height : Ti.UI.SIZE,
					width : Ti.UI.SIZE,
					left : '5dp',
					font : {
						fontFamily : 'Arial',
						fontSize : '14dp'
					}
				}
			}, {
				type : 'Ti.UI.Label',
				bindId : 'company',
				properties : {
					//backgroundColor : 'red',
					height : Ti.UI.SIZE,
					width : Ti.UI.SIZE,
					left : '5dp',
					font : {
						fontFamily : 'Arial',
						fontSize : '14dp'
					}
				}
			}, {
				type : 'Ti.UI.Label',
				bindId : 'location',
				properties : {
					//backgroundColor : 'red',
					height : Ti.UI.SIZE,
					width : Ti.UI.SIZE,
					left : '5dp',
					font : {
						fontFamily : 'Arial',
						fontSize : '14dp'
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
 * Set data to Profile Block Template
 */
Template.prototype.setDataToProfileBlockTemplate = function(json) {
	return [{
		template : 'profile_block',

		profile_pic : {
			image : this.system_url.getHostUrl() + json.profile_picture_link
		},
		gender : {
			text : json.gender
		},
		date : {
			text : json.date_of_birth
		},
		company : {
			text : json.company
		},
		location : {
			text : json.city + '\n' + json.country
		},
		properties : {
			itemId : json.user_id
		}
	}];
};
module.exports = Template;
