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
 * Get Post With Image Template
 */
Template.prototype.getPostWithImageTemplate = function(onClickListener) {
	var plainTemplate = {
		properties : {
			backgroundColor : '#FFF',
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE
		},
		childTemplates : [{
			type : 'Ti.UI.View',
			bindId : 'parent_view',
			properties : {
				layout : 'vertical',
				width : Ti.UI.SIZE,
				height : Ti.UI.SIZE
			},
			childTemplates : [{
				type : 'Ti.UI.View',
				bindId : 'image_text_block',
				properties : {
					//backgroundColor : 'red',
					width : Ti.UI.FILL,
					height : Ti.UI.SIZE
				},
				childTemplates : [{
					type : 'Ti.UI.ImageView',
					bindId : 'profile_pic',
					properties : {
						backgroundColor : 'silver',
						defaultImage : this.imagePath.no_image,
						top : '2dp',
						left : '5dp',
						height : '45dp',
						width : '45dp'
					},
					events : {
						click : onClickListener
					}
				}, {
					type : 'Ti.UI.View',
					bindId : 'text_holder',
					properties : {
						//backgroundColor : 'green',
						layout : 'vertical',
						left : '60dp',
						height : Ti.UI.SIZE,
						width : Ti.UI.FILL
					},
					childTemplates : [{
						type : 'Ti.UI.Label',
						bindId : 'profile_name',
						properties : {
							color : '#27AAE1',
							left : '0dp',
							height : Ti.UI.SIZE,
							width : Ti.UI.SIZE,
							font : {
								fontFamily : 'Arial',
								fontSize : '16dp'
							}
						},
						events : {
							click : onClickListener
						}
					}, {
						type : 'Ti.UI.Label',
						bindId : 'post_text',
						properties : {
							left : '0dp',
							height : Ti.UI.SIZE,
							width : Ti.UI.SIZE,
							font : {
								fontFamily : 'Arial',
								fontSize : '14dp'
							}
						}
					}]
				}]
			}, {
				type : 'Ti.UI.ImageView',
				bindId : 'post_image',
				properties : {
					backgroundColor : 'silver',
					defaultImage : this.imagePath.no_image,
					top : '2dp',
					left : '5dp',
					right : '5dp',
					height : '100dp'
				},
				events : {
					click : onClickListener
				}
			}, {
				type : 'Ti.UI.View',
				bindId : 'count_holder',
				properties : {
					layout : 'horizontal',
					right : '5dp',
					height : Ti.UI.SIZE,
					width : Ti.UI.SIZE
				},
				childTemplates : [{
					type : 'Ti.UI.Label',
					bindId : 'comment_count',
					properties : {
						//backgroundColor : 'red',
						height : Ti.UI.SIZE,
						width : Ti.UI.SIZE,
						font : {
							fontFamily : 'Arial',
							fontSize : '12dp'
						}
					},
					events : {
						click : onClickListener
					}
				}, {
					type : 'Ti.UI.ImageView',
					bindId : 'comment_pic',
					properties : {
						image : this.imagePath.comment_focus,
						height : '20dp',
						width : '20dp',
						left : '2dp'
					},
					events : {
						click : onClickListener
					}
				}, {
					type : 'Ti.UI.Label',
					bindId : 'like_count',
					properties : {
						//backgroundColor : 'blue',
						height : Ti.UI.SIZE,
						width : Ti.UI.SIZE,
						left : '10dp',
						font : {
							fontFamily : 'Arial',
							fontSize : '12dp'
						}
					}
				}, {
					type : 'Ti.UI.ImageView',
					bindId : 'like_pic',
					properties : {
						image : this.imagePath.like_focus,
						height : '20dp',
						width : '20dp',
						left : '2dp'
					}
				}, {
					type : 'Ti.UI.Label',
					bindId : 'time',
					properties : {
						color : '#27AAE1',
						left : '10dp',
						height : Ti.UI.SIZE,
						width : Ti.UI.SIZE,
						font : {
							fontFamily : 'Arial',
							fontSize : '12dp'
						}
					}
				}]
			}]
		}]
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
		// comment_pic : {
		// image : this.imagePath.comment_focus
		// },
		like_count : {
			text : json.likes_count
		},
		// like_pic : {
		// image : this.imagePath.like_focus
		// },
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
