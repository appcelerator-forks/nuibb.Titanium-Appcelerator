function Template() {
}

/*
 * Get Post With Image Template
 */
Template.prototype.getPostWithImageTemplate = function(onClickListener) {
	var plainTemplate = {

			childTemplates : [{
				type : 'Ti.UI.View',
				bindId : 'image_01_holder',
				properties : {
					backgroundColor : '#000',
					height : imgSizeHeight,
					width : imgSizeWidth,
					left : marginLeftRight
				},
				childTemplates : [{
					type : 'Ti.UI.ImageView',
					bindId : 'image_01',
					properties : {
						// backgroundColor : '#FFF'
					},
					events : {
						click : eventListener
					}
				}]
			}, {
				type : 'Ti.UI.View',
				bindId : 'image_02_holder',
				properties : {
					backgroundColor : '#000',
					height : imgSizeHeight,
					width : imgSizeWidth
				},
				childTemplates : [{
					type : 'Ti.UI.ImageView',
					bindId : 'image_02',
					properties : {
						// backgroundColor : '#FFF'
					},
					events : {
						click : eventListener
					}
				}]
			}, {
				type : 'Ti.UI.View',
				bindId : 'image_03_holder',
				properties : {
					backgroundColor : '#000',
					height : imgSizeHeight,
					width : imgSizeWidth,
					right : marginLeftRight
				},
				childTemplates : [{
					type : 'Ti.UI.ImageView',
					bindId : 'image_03',
					properties : {
						// backgroundColor : '#FFF',
					},
					events : {
						click : eventListener
					}
				}]
			}],
			properties : {
				height : Ti.UI.SIZE,
				backgroundColor : '#FFF',
				top : marginTopBottom,
				bottom : marginTopBottom
			}
		};

	return plainTemplate;
};
/*
 * Set Data to Post With Image Template
 */
Template.prototype.setDataToPostWithImageTemplate = function(json) {
	return [{
		template : 'postWithImage',
		profile_pic : {
			image : this.system_url.getHostUrl() + json.profile_picture_link
		},
		profile_name : {
			text : json.profile_name
		},
		post_text : {
			text : json.status
		},
		post_image : {
			image : this.system_url.getHostUrl() + json.image_url
		},
		comment_count : {
			text : json.comment_count
		},
		comment_pic : {
			image : this.imagePath.comment_focus
		},
		like_count : {
			text : json.likes_count
		},
		like_pic : {
			image : this.imagePath.like_focus
		},
		time : {
			text : json.time_ago
		},
		properties : {
			user_id : json.user_id,
			itemId : json.post_id
		}
	}];
};
module.exports = Template;
