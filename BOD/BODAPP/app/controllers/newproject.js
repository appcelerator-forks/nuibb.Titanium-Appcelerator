// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var managersList = [];

var Indicator = require('activityIndicator');
var activityIndicator = new Indicator();
$.win.add(activityIndicator);

var SystemUrl = require('system_urls');
var system_url = new SystemUrl();
var projectTypeList = [];
var projectTypeArray,
    projectTypeId,
    sponsorId;

if (OS_ANDROID) {
	$.win.addEventListener('open', function() {
		$.win.activity.actionBar.hide();
	});
}

var defaultImageView,
    selectedUser;
var userInfo = Ti.App.Properties.getObject('Current_User_Data');

var currentUserInfo = {
	name : {
		text : userInfo.name
	},
	profileImage : {
		image : userInfo.photo
	}
};

var defaultUserInfo = {
	name : {
		text : ""
	},
	profileImage : {
		image : "/images/defaultProfile.png"
	}
};

if (userInfo.user_type === 1) {

	var directorImageView = Alloy.createController('managerProfile', {
		user : currentUserInfo
	}).getView();

	$.directorsList.add(directorImageView);

	defaultImageView = Alloy.createController('managerProfile', {
		user : defaultUserInfo
	}).getView();

	defaultImageView.identifier = -1;
	defaultImageView.getChildren()[0].identifier = -1;
	defaultImageView.getChildren()[1].identifier = -1;

	defaultImageView.addEventListener('click', showListView);

	$.managersList.add(defaultImageView);
}

if (userInfo.user_type === 2) {

	defaultImageView = Alloy.createController('managerProfile', {
		user : defaultUserInfo
	}).getView();

	defaultImageView.identifier = -1;
	defaultImageView.getChildren()[0].identifier = -1;
	defaultImageView.getChildren()[1].identifier = -1;

	defaultImageView.addEventListener('click', showListView);

	$.directorsList.add(defaultImageView);

	var managerImageView = Alloy.createController('managerProfile', {
		user : currentUserInfo
	}).getView();

	$.managersList.add(managerImageView);
}

function refreshData(user, _id) {

	if (userInfo.user_type === 1) {

		if ((managersList.indexOf(user.userId) === -1) && (_id === -1)) {

			var profileImage = defaultImageView.getChildren()[0];
			var profileName = defaultImageView.getChildren()[1];
			defaultImageView.identifier = user.userId;
			defaultImageView.getChildren()[0].identifier = user.userId;
			defaultImageView.getChildren()[1].identifier = user.userId;

			profileImage.image = user.profileImage.image;
			profileName.text = user.name.text;

			//defaultImageView.removeEventListener('click', showListView);

			defaultImageView = Alloy.createController('managerProfile', {
				user : defaultUserInfo
			}).getView();

			defaultImageView.identifier = -1;
			defaultImageView.getChildren()[0].identifier = -1;
			defaultImageView.getChildren()[1].identifier = -1;

			defaultImageView.addEventListener('click', showListView);

			$.managersList.add(defaultImageView);
			managersList.push(user.userId);

			Ti.API.info("1 : " + JSON.stringify(managersList));

		} else {

			var children = $.managersList.getChildren();

			for (var i = 0; i < children.length - 1; i++) {

				if ((_id === children[i].identifier) && (managersList.indexOf(user.userId) === -1)) {

					var profileImage = children[i].getChildren()[0];
					var profileName = children[i].getChildren()[1];
					profileImage.identifier = user.userId;
					profileName.identifier = user.userId;
					children[i].identifier = user.userId;
					profileImage.image = user.profileImage.image;
					profileName.text = user.name.text;
					var index = managersList.indexOf(_id);

					if (index !== -1) {
						managersList.splice(index, 1);
					}

					managersList.push(user.userId);

				}
			}
		}

	} else {

		sponsorId = user.userId;
		var profileImage = defaultImageView.getChildren()[0];
		var profileName = defaultImageView.getChildren()[1];

		profileImage.image = user.profileImage.image;
		profileName.text = user.name.text;
	}
}

function showListView(e) {

	showBlurEffect();

	var child = Alloy.createController('ManagersListView', {
		callback : refreshData,
		identifier : e.source.identifier
	});

	child.on('close', function() {
		showFocusEffect();
		$.win.remove(child.getView());
	});

	$.win.add(child.getView());
}

function showBlurEffect() {

	$.navHeader.touchEnabled = false;
	$.navHeader.setOpacity(0.5);
	$.scrollView.scrollingEnabled = false;
	$.scrollView.touchEnabled = false;
	$.scrollView.setOpacity(0.5);
	$.win.setBackgroundColor("#000");

}

function showFocusEffect() {

	$.navHeader.touchEnabled = true;
	$.navHeader.setOpacity(1.0);
	$.scrollView.scrollingEnabled = true;
	$.scrollView.touchEnabled = true;
	$.scrollView.setOpacity(1.0);
	$.win.setBackgroundColor("#019AE8");

}

function crossBtnListener(e) {
	$.win.close();
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getParameters() {

	var param = {};
	param.type = projectTypeId + "";
	param.title = $.projectName.value;
	param.details = $.projectDescription.value;
	param.team_size = $.teamSizeText.value;
	param.duration = $.durationText.value;
	param.response_day = $.responseDaysText.value;
	param.revenue_plan = $.revenuePlanText.value;
	param.target_revenue = $.targetRevenueText.value;
	param.additional_cost = $.additionalCostText.value;
	param.code = getRandomInt(0, 100000) + "";
	param.budget = "0";
	param.assigned_by = userInfo.user_id + "";

	return param;

}

function assignNewProject(param, e) {

	e.source.touchEnabled = false;

	Ti.API.info("Param : " + JSON.stringify(param));

	var callAPI = require('apiCallWithoutIndicator');
	new callAPI('POST', system_url.addNewProject(), param, function(json) {

		e.source.touchEnabled = true;

		if (json.message == "success") {
			alert('Project successfully saved.');
			$.win.close();
			Ti.App.fireEvent('NewProjectPosted');
		}

	});

}

function saveBtnListener(e) {

	var projectName = $.projectName.value.trim();
	var projectDescription = $.projectDescription.value.trim();
	var teamSize = $.teamSizeText.value.trim();
	var duration = $.durationText.value.trim();
	var responseDays = $.responseDaysText.value.trim();
	var revenuePlan = $.revenuePlanText.value.trim();
	var targetRevenue = $.targetRevenueText.value.trim();
	var additionalCost = $.additionalCostText.value.trim();

	if ($.projectType.text != 'Select category' && projectName != '' && projectDescription != '' && teamSize != '' && duration != '' && responseDays != '' && revenuePlan != '' && targetRevenue != '' && additionalCost != '') {

		if (Math.floor(teamSize) == Number(teamSize)) {

			if (Math.floor(duration) == Number(duration)) {

				if (Math.floor(responseDays) == Number(responseDays)) {

					if (Math.floor(targetRevenue) == Number(targetRevenue)) {

						if (Math.floor(additionalCost) == Number(additionalCost)) {

							if (userInfo.user_type === 1) {

								if (managersList.length !== 0) {

									var param = getParameters();
									param.sponsored_by = userInfo.user_id + "";
									param.assigned_to = "" + managersList + "";
									assignNewProject(param, e);

								} else {
									alert('Select managers from manager list.');
								}

							} else {

								if (sponsorId && sponsorId !== null) {

									var param = getParameters();
									param.sponsored_by = sponsorId + "";
									param.assigned_to = "" + [userInfo.user_id] + "";
									assignNewProject(param, e);

								} else {
									alert('Fill all the fields...');
								}
							}

						} else {

							alert('Invalid characters in Additional Cost field.');
						}

					} else {

						alert('Invalid characters in Target Revenue field.');
					}

				} else {

					alert('Invalid characters in Response Days field.');
				}

			} else {

				alert('Invalid characters in Duration field.');
			}

		} else {

			alert('Invalid characters in Team Size field.');

		}

	} else {

		alert('Fill all the fields...');

	}
}

var API_Call = require('apiCallWithoutIndicator');
new API_Call('POST', system_url.getProjectType(), null, function(json) {

	projectTypeArray = json.project_type;
	var arraySize = projectTypeArray.length;

	for (var i = 0; i < arraySize; i++) {
		projectTypeList.push(projectTypeArray[i].title);
	}

	$.dialog.options = projectTypeList;
});

$.pickerHeader.addEventListener('click', function(e) {

	$.dialog.show();

});

$.dialog.addEventListener('click', function(e) {

	$.projectType.text = projectTypeList[e.index];
	projectTypeId = projectTypeArray[e.index].id;

});

