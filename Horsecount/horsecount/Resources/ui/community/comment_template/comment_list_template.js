function CommentsListTemplate() {
	var SystemUrl = require('ui/handheld/system_urls');
	this.system_url = new SystemUrl();
};

/*
 * Get Template for Comment List
 */
CommentsListTemplate.prototype.getCommentsListTemplate = function(onClickListener) {
	var leftUnit = '50dp';
	var commentTemplate = {
		childTemplates : [{
			type : 'Ti.UI.ImageView',
			bindId : 'profile_pic',
			properties : {
				backgroundColor : 'silver',
				height : '30dp',
				width : '30dp',
				left : '5dp',
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
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold',
					fontSize : '14dp'
				},
				top : '5dp'
			},
			events : {
				click : onClickListener
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'time',
			properties : {
				color : '#000',
				height : '20dp',
				width : Ti.UI.SIZE,
				right : '5dp',
				top : '5dp',
				font : {
					fontFamily : 'Arial',
					fontSize : '9dp'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'comment',
			properties : {
				color : '#000',
				height : Ti.UI.SIZE,
				width : Ti.UI.SIZE,
				left : leftUnit,
				top : '25dp',
				bottom : '5dp',
				// ellipsize : true,
				// wordWrap : false,
				// singleline : false,
				font : {
					fontFamily : 'Arial',
					// fontWeight : 'bold',
					fontSize : '14dp'
				}
			}
		}],
		properties : {
			height : Ti.UI.SIZE,
			backgroundColor : '#FFF'
		}
	};

	return commentTemplate;
};

/*
 * Set Data to Comment List Template
 */
CommentsListTemplate.prototype.setDataToCommentsListTemplate = function(_json) {
	var sections = [];
	for (var i = 0; i < _json.length; i++) {
		var section = Ti.UI.createListSection();
		section.setItems([{
			template : 'comments_list',
			profile_pic : {
				image : this.system_url.getHostUrl() + _json[i].profile_picture_link
			},
			profile_name : {
				text : _json[i].user_name
			},
			time : {
				text : _json[i].created_at
			},
			comment : {
				text : _json[i].content
			},

			properties : {
				user_id : _json[i].user_id,
				itemId : _json[i].comment_id
			}

		}]);
		sections.push(section);
	}
	return sections;
};

module.exports = CommentsListTemplate;

