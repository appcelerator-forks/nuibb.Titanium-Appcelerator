// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var SystemUrl = require('system_urls');
var system_url = new SystemUrl();

var userInfo = Ti.App.Properties.getObject('Current_User_Data');

Ti.API.info(JSON.stringify(userInfo));
$.userProfileImage.image = userInfo.photo;
$.userProfileName.text = userInfo.name;
$.userEmail.text = userInfo.email;

$.logout.addEventListener('click', function(e) {

	var param = {};
	param.user_id = userInfo.user_id;
	
	var callForProjectType = require('apiCallWithoutIndicator');
	new callForProjectType('POST', system_url.getLogoutUrl(), param, function(json) {

		if (json.message == "success") {

			Ti.App.Properties.removeProperty('deviceToken');
			Ti.App.Properties.removeProperty('Current_User_Data');
			var newProject = Alloy.createController('loginController', {
				id : 1
			}).getView();
			newProject.open();

		}

	});

});
