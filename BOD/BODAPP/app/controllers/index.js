if (Ti.App.Properties.getObject('Current_User_Data') && Ti.App.Properties.getObject('Current_User_Data') != null && Ti.App.Properties.getObject('deviceToken') && Ti.App.Properties.getObject('deviceToken') != null) {

	var user = Ti.App.Properties.getObject('Current_User_Data');
	var user_info = {};
	user_info.id = user.user_id;
	user_info.type = user.user_type;

	var ne = Alloy.createController('home', {
		user_info : user_info
	}).getView();

	ne.open();

} else {

	var newProject = Alloy.createController('loginController', {
		id : 0
	}).getView();
	newProject.open();

}
