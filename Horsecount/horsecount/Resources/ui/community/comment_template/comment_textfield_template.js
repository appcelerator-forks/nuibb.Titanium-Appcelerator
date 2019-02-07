module.exports = function Comment_TextField(postCommentCallback) {
	var param = {};
	var newCommentTemplate = {
		childTemplates : [{
			type : 'Ti.UI.TextArea',
			bindId : 'comment_text',
			properties : {
				color : '#000',
				height : Ti.UI.SIZE,
				width : '80%',
				backgroundColor : '#FFF',
				borderRadius : '5dp',
				borderColor : '#177ba5',
				borderWidth : '2dp',
				textAlign : 'left',
				hintText : "Write a comment...",
				color : '#000',
				left : '10dp',
				right : '5dp'
			},
			events : {
				change : function(e) {
					param.content = e.value;
				}
			}
		}, {
			type : 'Ti.UI.ImageView',
			bindId : 'post_comment_image',
			properties : {
				height : '30dp',
				width : '30dp',
				right : '10dp',
				image : Ti.Platform.osname === 'android' ? '/images/hbMail.png' : 'hbMail@2x.png'
			},
			events : {
				click : function(e) {
					postCommentCallback(param);
				}
			}
		}],
		properties : {
			height : '50dp',
			backgroundColor : '#c7eafb'
		}
	};

	return newCommentTemplate;
};
