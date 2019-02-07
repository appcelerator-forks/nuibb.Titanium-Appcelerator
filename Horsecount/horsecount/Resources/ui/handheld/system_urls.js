function system_URL() {
	this.schema = 'http';

	//this.host = 'localhost:3000';
	this.host = 'staging.horsecount.com';
	//this.host = '192.168.1.2:3000';

	this.token = Ti.App.Properties.getString('Token');
	this.current_user_data = Ti.App.Properties.getObject('Current_User_Data');
}

system_URL.prototype.getHostUrl = function() {
	return this.schema + '://' + this.host;
};

system_URL.prototype.getLoginUrl = function() {
	return this.schema + '://' + this.host + '/users/sign_in.json';
};

system_URL.prototype.getLogoutUrl = function() {
	return this.schema + '://' + this.host + '/users/sign_out.json';
};

system_URL.prototype.getCurrentUserId = function() {
	return this.current_user_data.id;
};

system_URL.prototype.getCurrentUserPic = function() {
	return this.schema + '://' + this.host + this.current_user_data.profile_picture_link;
};

system_URL.prototype.getMain_UI_Url = function() {
	return this.schema + '://' + this.host + '/api/v1/modules_enabled.json?auth_token=' + this.token;
};

system_URL.prototype.getTDL_url = function() {
	return this.schema + '://' + this.host + '/api/v1/to_dos/mobile_view.json?auth_token=' + this.token;
};

system_URL.prototype.getTodoUpdate_url = function(_ids) {
	return this.schema + '://' + this.host + '/api/v1/tasks/update_task_mobile.json?task_ids=' + _ids + '&auth_token=' + this.token;
};

system_URL.prototype.getCnF_url = function() {
	return this.schema + '://' + this.host + '/api/v1/care_and_feeds/view_chronological.json?auth_token=' + this.token;
};

system_URL.prototype.getTraining_url = function() {
	Ti.API.log(this.token);
	return this.schema + '://' + this.host + '/api/v1/trainings/view_chronological.json?auth_token=' + this.token;
};

system_URL.prototype.getFeedback_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/training_details/' + _id + '/update_feedback.json?auth_token=' + this.token;
};

system_URL.prototype.getId_url = function(_value, _id) {
	return this.schema + '://' + this.host + _value + _id + '.json?auth_token=' + this.token;
};

system_URL.prototype.getHealth_url = function() {
	return this.schema + '://' + this.host + '/api/v1/health_and_cares/view_chronological.json?auth_token=' + this.token;
};

system_URL.prototype.getGestation_url = function() {
	return this.schema + '://' + this.host + '/api/v1/gestation.json?auth_token=' + this.token;
};

//Riding School section url's
system_URL.prototype.getRidingSchool_url = function() {
	return this.schema + '://' + this.host + '/api/v1/lessons/overview.json?auth_token=' + this.token;
};

system_URL.prototype.getClassManagement_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/lessons/lesson_details.json?riding_class_id=' + _id + '&auth_token=' + this.token;
};

system_URL.prototype.getHorseAssignment_url = function(_id, _discipline) {
	return this.schema + '://' + this.host + '/api/v1/lessons/assign_preferred_horse.json?sales_lesson_id=' + _id + '&discipline=' + _discipline + '&auth_token=' + this.token;
};

system_URL.prototype.createPreferedHorse_url = function(_id, horse_id) {
	return this.schema + '://' + this.host + '/api/v1/lessons/create_preferred_horse.json?sales_lesson_id=' + _id + '&horse_id=' + horse_id + '&auth_token=' + this.token;
};

system_URL.prototype.undoPreferedHorse_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/lessons/undo_preferred_horse.json?lesson_schedule_id=' + _id + '&auth_token=' + this.token;
};

system_URL.prototype.getLessonFeedback_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/lessons/class_management/new_feedback.json?lesson_schedule_id=' + _id + '&auth_token=' + this.token;
};

system_URL.prototype.createLessonFeedback_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/lessons/class_management/create_feedback.json?lesson_schedule_id=' + _id + '&auth_token=' + this.token;
};

//Logbook Part
system_URL.prototype.getEdit_Logbook_url = function() {
	return this.schema + '://' + this.host + '/api/v1/logbook_items.json?auth_token=' + this.token;
};

system_URL.prototype.getEdit_View_url = function() {
	return this.schema + '://' + this.host + '/api/v1/logbook_items/filter_logbook_item.json?auth_token=' + this.token;
};

system_URL.prototype.getEdit_View_id_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/logbook_items/' + _id + '.json?auth_token=' + this.token;
};

system_URL.prototype.getEdit_View_feedback_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/logbook_items/' + _id + '.json?auth_token=' + this.token;
};

system_URL.prototype.getAdd_Logbook_url = function() {
	return this.schema + '://' + this.host + '/api/v1/logbook_items/new.json?auth_token=' + this.token;
};

system_URL.prototype.getAdd_Recent_url = function() {
	return this.schema + '://' + this.host + '/api/v1/logbook_items/recent_horses.json?auth_token=' + this.token;
};

system_URL.prototype.getAdd_feedback_url = function() {
	return this.schema + '://' + this.host + '/api/v1/logbook_items.json?auth_token=' + this.token;
};

//Horseboard part
system_URL.prototype.getHorseboard_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/horse_board.json?page=' + _id + '&auth_token=' + this.token;
};

system_URL.prototype.getMyHorse_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/horse_board/my_horses.json?page=' + _id + '&auth_token=' + this.token;
};

system_URL.prototype.getFaboriteHorse_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/horse_board/favorite_horses.json?page=' + _id + '&auth_token=' + this.token;
};

system_URL.prototype.getComparedHorse_url = function(board) {
	return this.schema + '://' + this.host + '/api/v1/boards/compare_horses.json?board=' + board + '&auth_token=' + this.token;
};

system_URL.prototype.getHBMap_url = function(board) {
	return this.schema + '://' + this.host + '/api/v1/boards/google_map_view.json?board=' + board + '&auth_token=' + this.token;
};

system_URL.prototype.markFaboriteHorse_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/boards/mark_horse_as_favorite.json?horse_id=' + _id + '&auth_token=' + this.token;
};

system_URL.prototype.unmarkFaboriteHorse_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/boards/unmark_horse_as_favorite.json?favorite_horse_id=' + _id + '&auth_token=' + this.token;
};

system_URL.prototype.getHBDetails_url = function(_id, _board) {
	return this.schema + '://' + this.host + '/api/v1/horse_board/details.json?horse_id=' + _id + '&board=' + _board + '&auth_token=' + this.token;
};

system_URL.prototype.getPedigree_android_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/boards/print_pedigree.json?horse_id=' + _id + '&auth_token=' + this.token;
};

system_URL.prototype.getPedigree_iPhone_url = function(_id) {
	return this.schema + '://' + this.host + '/horses/' + _id + '/print_pedigree.pdf';
};

system_URL.prototype.getPdf_url = function() {
	return this.schema + '://' + this.host + '/pdfs/pedigree/';
};

system_URL.prototype.getHBBreedHistory_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/breeding_history.json?horse_id=' + _id + '&auth_token=' + this.token;
};

system_URL.prototype.getHBCompetition_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/competition_result.json?horse_id=' + _id + '&auth_token=' + this.token;
};

system_URL.prototype.getFavorite_Compare_Icons = function(_id, board) {
	return this.schema + '://' + this.host + '/api/v1/boards/get_favorite_compare_icon.json?horse_id=' + _id + '&board=' + board + '&auth_token=' + this.token;
};

system_URL.prototype.getAddToCompare_url = function(_id, board) {
	return this.schema + '://' + this.host + '/api/v1/boards/mark_horse_to_compare.json?horse_id=' + _id + '&board=' + board + '&auth_token=' + this.token;
};

system_URL.prototype.getDeleteFromCompare_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/boards/remove_compare_horse.json?compare_horse_id=' + _id + '&auth_token=' + this.token;
};

system_URL.prototype.getHBSendToFriend_url = function(_id, mail, board) {
	return this.schema + '://' + this.host + '/api/v1/boards/mail_friend.json?horse_id=' + _id + '&email=' + mail + '&board=' + board + '&auth_token=' + this.token;
};

system_URL.prototype.getHBFilter_url = function() {
	return this.schema + '://' + this.host + '/api/v1/horse_board/filter.json?auth_token=' + this.token;
};

//Salesboard part
system_URL.prototype.getSalesboard_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/sales_board.json?page=' + _id + '&auth_token=' + this.token;
};

system_URL.prototype.getSB_MyHorse_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/sales_board/my_horses.json?page=' + _id + '&auth_token=' + this.token;
};

system_URL.prototype.getSB_FaboriteHorse_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/sales_board/favorite_horses.json?page=' + _id + '&auth_token=' + this.token;
};

//Salesboard part
system_URL.prototype.getStudboard_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/stud_board.json?page=' + _id + '&auth_token=' + this.token;
};

system_URL.prototype.getSTB_MyHorse_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/stud_board/my_horses.json?page=' + _id + '&auth_token=' + this.token;
};

system_URL.prototype.getSTB_FaboriteHorse_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/stud_board/favorite_horses.json?page=' + _id + '&auth_token=' + this.token;
};

system_URL.prototype.getBoardAllHorse_url = function() {
	return this.schema + '://' + this.host + '/api/v1/boards/view_all_horses.json?auth_token=' + this.token;
};

system_URL.prototype.getBreeder_url = function() {
	return this.schema + '://' + this.host + '/api/v1/boards/view_all_contacts.json?auth_token=' + this.token;
};

system_URL.prototype.getCountry_url = function() {
	return this.schema + '://' + this.host + '/api/v1/boards/view_all_countries.json?auth_token=' + this.token;
};

system_URL.prototype.getStates_url = function(_code) {
	return this.schema + '://' + this.host + '/api/v1/boards/view_all_states.json?country=' + _code + '&auth_token=' + this.token;
};

system_URL.prototype.getCity_url = function(_code, _term) {
	return this.schema + '://' + this.host + '/cities.json?country_code=' + _code + '&term=' + _term + '&auth_token=' + this.token;
};

system_URL.prototype.getSaved_Search_ids = function(_board) {
	return this.schema + '://' + this.host + '/api/v1/boards/get_search_filter_ids.json?board=' + _board + '&auth_token=' + this.token;
};

system_URL.prototype.getSaved_Searches_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/boards/view_custom_search.json?saved_search_filter_id=' + _id + '&auth_token=' + this.token;
};

system_URL.prototype.getBoardsUnit_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/boards/get_size_unit.json?auth_token=' + this.token;
};

system_URL.prototype.getScamReport_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/boards/new_horse_scam_report.json?horse_id=' + _id + '&auth_token=' + this.token;
};

system_URL.prototype.postBoardsReport_url = function() {
	return this.schema + '://' + this.host + '/api/v1/boards/save_horse_scam_report.json?auth_token=' + this.token;
};

/*
 * Community section
 */
system_URL.prototype.getNewsfeedPosts_url = function(_page) {
	return this.schema + '://' + this.host + '/api/v1/community/posts.json?page=' + _page + '&auth_token=' + this.token;
};

system_URL.prototype.getBirthdayLists_url = function(_page) {
	return this.schema + '://' + this.host + '/api/v1/community/users/friends_birthday.json?page=' + _page + '&auth_token=' + this.token;
};

system_URL.prototype.getEventsLists_url = function(_page) {
	return this.schema + '://' + this.host + '/api/v1/community/users/events.json?page=' + _page + '&auth_token=' + this.token;
};

system_URL.prototype.getCommunityReport_url = function() {
	return this.schema + '://' + this.host + '/api/v1/complain_list_item.json?auth_token=' + this.token;
};

system_URL.prototype.postCommunityReport_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/community/posts/' + _id + '/report.json?auth_token=' + this.token;
};

system_URL.prototype.postGroupReport_url = function(_id) {
	return this.schema + '://' + this.host + '/api/v1/community/group_posts/' + _id + '/report.json?auth_token=' + this.token;
};

system_URL.prototype.getGroupList_url = function(_page) {
	return this.schema + '://' + this.host + '/api/v1/community/users/groups.json?page=' + _page + '&auth_token=' + this.token;
};

system_URL.prototype.getGroup_url = function(_page, _id) {
	return this.schema + '://' + this.host + '/api/v1/community/groups/' + _id + '.json?page=' + _page + '&auth_token=' + this.token;
};

system_URL.prototype.getCurrentUserProfile_url = function(_page) {
	return this.schema + '://' + this.host + '/api/v1/community/users/current_user_profile.json?page=' + _page + '&auth_token=' + this.token;
};

system_URL.prototype.getFriendProfile_url = function(_page, _id) {
	return this.schema + '://' + this.host + '/api/v1/community/users/' + _id + '/profile.json?page=' + _page + '&auth_token=' + this.token;
};

system_URL.prototype.getUpdateCount_url = function(_post_id, _count_state) {
	return _count_state ? this.schema + '://' + this.host + '/api/v1/community/posts/' + _post_id + '/dislike.json?auth_token=' + this.token : this.schema + '://' + this.host + '/api/v1/community/posts/' + _post_id + '/like.json?auth_token=' + this.token;
};

system_URL.prototype.getAllComment_url = function(_post_id, _page) {
	return this.schema + '://' + this.host + '/api/v1/community/posts/' + _post_id + '/all_comments.json?page=' + _page + '&auth_token=' + this.token;
};

system_URL.prototype.getPostStatus_url = function() {
	return this.schema + '://' + this.host + '/api/v1/community/posts.json?&auth_token=' + this.token;
};

system_URL.prototype.getDirectContacts_url = function(_user_id, _page) {
	return this.schema + '://' + this.host + '/api/v1/community/users/' + _user_id + '/friends_list.json?page=' + _page + '&auth_token=' + this.token;
};

system_URL.prototype.getPostComment_url = function(_post_id) {
	return this.schema + '://' + this.host + '/api/v1/community/posts/' + _post_id + '/comment.json?auth_token=' + this.token;
};

/*
 * Community Group related APIs
 */
system_URL.prototype.getUpdateCountGroup_url = function(_post_id, _count_state) {
	return _count_state ? this.schema + '://' + this.host + '/api/v1/community/group_posts/' + _post_id + '/dislike.json?auth_token=' + this.token : this.schema + '://' + this.host + '/api/v1/community/group_posts/' + _post_id + '/like.json?auth_token=' + this.token;
};

system_URL.prototype.getAllCommentForGroups_url = function(_post_id, _page) {
	return this.schema + '://' + this.host + '/api/v1/community/group_posts/' + _post_id + '/all_comments.json?page=' + _page + '&auth_token=' + this.token;
};

system_URL.prototype.getFindMember_url = function(_group_id, _page) {
	return this.schema + '://' + this.host + '/api/v1/community/groups/' + _group_id + '/group_members.json?page=' + _page + '&auth_token=' + this.token;
};

system_URL.prototype.getAllCommentGroup_url = function(_post_id, _page) {
	return this.schema + '://' + this.host + '/api/v1/community/group_posts/' + _post_id + '/all_comments.json?page=' + _page + '&auth_token=' + this.token;
};

system_URL.prototype.getPostCommentGroup_url = function(_post_id) {
	return this.schema + '://' + this.host + '/api/v1/community/group_posts/' + _post_id + '/comment.json?auth_token=' + this.token;
};

system_URL.prototype.getGroupEvents_url = function(_id, _page) {
	return this.schema + '://' + this.host + '/api/v1/community/groups/' + _id + '/events.json?page=' + _page + '&auth_token=' + this.token;
};

system_URL.prototype.getPostStatusGroup_url = function() {
	return this.schema + '://' + this.host + '/api/v1/community/group_posts.json?&auth_token=' + this.token;
};

/*
 * Community Image related APIs
 */
system_URL.prototype.getImageByPostId_url = function(_post_id) {
	return this.schema + '://' + this.host + '/api/v1/community/posts/' + _post_id + '/images.json?auth_token=' + this.token;
};

system_URL.prototype.getGroupImageByPostId_url = function(_post_id) {
	return this.schema + '://' + this.host + '/api/v1/community/group_posts/' + _post_id + '/images.json?auth_token=' + this.token;
};

system_URL.prototype.getImageByImageId_url = function(_image_id) {
	return this.schema + '://' + this.host + '/api/v1/community/images/' + _image_id + '.json?auth_token=' + this.token;
};

system_URL.prototype.getUpdateCountImage_url = function(_image_id, _count_state) {
	return _count_state ? this.schema + '://' + this.host + '/api/v1/community/images/' + _image_id + '/like.json?auth_token=' + this.token : this.schema + '://' + this.host + '/api/v1/community/images/' + _image_id + '/dislike.json?auth_token=' + this.token;
};

system_URL.prototype.getImageReport_url = function(_image_id) {
	return this.schema + '://' + this.host + '/api/v1/community/images/' + _image_id + '/report.json?auth_token=' + this.token;
};

system_URL.prototype.getAlbums_url = function(_user_id) {
	return this.schema + '://' + this.host + '/api/v1/community/users/' + _user_id + '/albums.json?auth_token=' + this.token;
};

system_URL.prototype.getImagesForContact_url = function(_user_id, _page) {
	return this.schema + '://' + this.host + '/api/v1/community/users/' + _user_id + '/images.json?page=' + _page + '&auth_token=' + this.token;
};

system_URL.prototype.getImagesForGroup_url = function(_group_id, _page) {
	return this.schema + '://' + this.host + '/api/v1/community/groups/' + _group_id + '/images.json?page=' + _page + '&auth_token=' + this.token;
};

system_URL.prototype.getProfileImageByChoose_url = function() {
	return this.schema + '://' + this.host + '/api/v1/community/users/change_profile_photo.json?&auth_token=' + this.token;
};

system_URL.prototype.getProfileImageByUpload_url = function() {
	return this.schema + '://' + this.host + '/api/v1/community/users/upload_profile_photo.json?&auth_token=' + this.token;
};
system_URL.prototype.getStatusImageUpload_url = function() {
	return this.schema + '://' + this.host + '/api/v1/community/images.json?&auth_token=' + this.token;
};

system_URL.prototype.getStatusImageRemove_url = function(_image_id) {
	return this.schema + '://' + this.host + '/api/v1/community/images/' + _image_id + '.json?&auth_token=' + this.token;
};
/*
 * Community Video related APIs
 */
system_URL.prototype.getVideoByVideoId_url = function(_video_id) {
	return this.schema + '://' + this.host + '/api/v1/community/videos/' + _video_id + '.json?auth_token=' + this.token;
};

system_URL.prototype.getUpdateCountVideo_url = function(_video_id, _count_state) {
	return _count_state ? this.schema + '://' + this.host + '/api/v1/community/videos/' + _video_id + '/like.json?auth_token=' + this.token : this.schema + '://' + this.host + '/api/v1/community/videos/' + _video_id + '/dislike.json?auth_token=' + this.token;
};

system_URL.prototype.getVideoReport_url = function(_video_id) {
	return this.schema + '://' + this.host + '/api/v1/community/videos/' + _video_id + '/report.json?auth_token=' + this.token;
};

system_URL.prototype.getBlockedUsersId_url = function(_video_id) {
	return this.schema + '://' + this.host + '/api/v1/community/users/get_block_user_ids.json?&auth_token=' + this.token;
};

module.exports = system_URL;

