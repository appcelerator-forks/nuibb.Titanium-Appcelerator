function Pubnub_Handler(update_like_counts, update_comment_counts, assign_new_post, update_blocked_user_list) {

	//Get all windows and states
	var SysEnum = require('ui/community/wrapper_classes/system_enums');

	//Pubnub Integration
	Ti.App.addEventListener('POST_LIKES_UPDATE', function(message) {
		update_like_counts(SysEnum.WINDOWS_AND_STATES.POST, message.attributes);
	});

	Ti.App.addEventListener('GROUP_POST_LIKES_UPDATE', function(message) {
		update_like_counts(SysEnum.WINDOWS_AND_STATES.GROUP_POST, message.attributes);
	});

	Ti.App.addEventListener(SysEnum.WINDOWS_AND_STATES.POST, function(message) {
		var _attributes = message.attributes;
		var json = {
			profile_picture_link : _attributes.profile_picture_url,
			profile_name : _attributes.posted_by,
			status : _attributes.post_status,
			image_url : _attributes.main_image_url,
			comment_count : _attributes.post_comments_count,
			likes_count : _attributes.post_likes_count,
			time_ago : _attributes.posted_at,
			user_id : _attributes.posted_by_id,
			post_id : _attributes.post_id
		};
		assign_new_post(json);
	});

	Ti.App.addEventListener('GROUP_POST', function(message) {
		var _attributes = message.attributes;
		var json = {
			group_id : _attributes.group_id,
			profile_picture_link : _attributes.profile_picture_url,
			profile_name : _attributes.posted_by,
			status : _attributes.post_status,
			image_url : _attributes.main_image_url,
			comment_count : _attributes.post_comments_count,
			likes_count : _attributes.post_likes_count,
			time_ago : _attributes.posted_at,
			user_id : _attributes.posted_by_id,
			post_id : _attributes.post_id
		};
		assign_new_post(json);
	});

	Ti.App.addEventListener('POST_COMMENT', function(message) {
		update_comment_counts(SysEnum.WINDOWS_AND_STATES.POST, message.attributes);
	});

	Ti.App.addEventListener('GROUP_POST_COMMENT', function(message) {
		update_comment_counts(SysEnum.WINDOWS_AND_STATES.GROUP_POST, message.attributes);
	});

	Ti.App.addEventListener('UserBlocked', function(message) {
		var _attributes = message.attributes;
		var json = {
			user_id : _attributes.user_id
		};

		update_blocked_user_list(json);
	});
}

module.exports = Pubnub_Handler;

