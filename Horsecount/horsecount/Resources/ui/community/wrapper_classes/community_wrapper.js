function CommunityWrapperClass() {
}

/*
 * Update the Current User Data dwells in app system.
 */
CommunityWrapperClass.prototype.updateCurrentUserDataProfilePicture = function(updated_data) {

	var currentUserData = Ti.App.Properties.getObject('Current_User_Data');
	currentUserData.profile_picture_link = updated_data.image_url;
	Ti.App.Properties.setObject('Current_User_Data', currentUserData);
};

module.exports = CommunityWrapperClass;
