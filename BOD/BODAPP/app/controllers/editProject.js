// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = arguments[0] || {};
var managersList = [];

var userInfo = Ti.App.Properties.getObject('Current_User_Data');
var projectInfo;

var Indicator = require('activityIndicator');
var activityIndicator = new Indicator();
$.win.add(activityIndicator);

var SystemUrl = require('system_urls');
var system_url = new SystemUrl();
var param = {};
param.project_id = args.id;

if (OS_ANDROID) {

	$.win.addEventListener('open', function() {
		$.win.activity.actionBar.hide();
	});

	if (args.isFromNoti) {

		$.win.addEventListener('android:back', function(e) {
			//e.cancelBubble = true;

			var ne = Alloy.createController('home').getView();
			ne.open();
			$.win.close();

		});
	} else {

		$.win.addEventListener('android:back', function(e) {

			Ti.App.fireEvent('disableSelectedRowColor');

		});

	}
}

disableEditView();

var API_Call = require('apiCallWithIndicator');
new API_Call('POST', system_url.getProjectDetailsUrl(), param, activityIndicator, function(json) {

	projectInfo = json;

	Ti.API.info(JSON.stringify(json));
	Ti.API.info(JSON.stringify(userInfo.user_id));

	if (((userInfo.user_id === json.assigned_by_id) || (userInfo.user_id === json.sponsored_by_id)) && (json.edit_status === 0)) {
		$.editBtn.visible = true;
	} else {
		$.editBtn.visible = false;
	}

	$.navLabel.text = json.title;
	$.profilePic.image = json.sponsored_by_photo;
	$.profileName.text = json.sponsored_by_name;
	$.projectType.text = json.type;
	$.projectName.value = json.title;
	$.projectDescription.value = json.details;
	$.teamSizeText.value = json.team_size;
	$.durationText.value = json.duration;
	$.responseDaysText.value = json.response_day;
	$.revenuePlanText.value = json.revenue_plan;
	$.targetRevenueText.value = json.target_revenue;
	$.additionalCostText.value = json.additional_cost;
	projectTypeId = json.project_type_id;
	getProjectType();

	if (json.status === 0) {
		$.statusIcon.backgroundColor = "#FF9800";
		$.status.text = "Pending" + " [ " + json.status_by.length + "/3 ]";
		$.status.color = "#FF9800";
		$.statusIcon.borderColor = "#FF9800";
	} else if (json.status === 1) {
		$.statusIcon.backgroundColor = "#66cf78";
		$.status.text = "Approved";
		$.status.color = "#66cf78";
		$.statusIcon.borderColor = "#66cf78";
	} else if (json.status === 2) {
		$.statusIcon.backgroundColor = "#FF575E";
		$.status.text = "Rejected";
		$.status.color = "#FF575E";
		$.statusIcon.borderColor = "#FF575E";
	}

	for (var i = 0; i < json.assigned_to.length; i++) {

		var manager = {
			name : {
				text : json.assigned_to[i].name
			},
			profileImage : {
				image : json.assigned_to[i].photo
			}
		};

		var user = Alloy.createController('managerProfile', {
			user : manager
		}).getView();

		user.identifier = json.assigned_to[i].id;
		user.getChildren()[0].identifier = json.assigned_to[i].id;
		user.getChildren()[1].identifier = json.assigned_to[i].id;

		$.managersList.add(user);
		managersList.push(json.assigned_to[i].id);

	};

	if ((userInfo.user_type !== 1) || (userInfo.user_id === json.assigned_by_id) || (userInfo.user_id === json.sponsored_by_id) || (json.status_by.indexOf(userInfo.user_id) !== -1) || (json.status === 2)) {

		$.scrollView.remove($.approveBtn);
		$.scrollView.remove($.rejectBtn);
		$.scrollView.remove($.contactBtn);

	}
});

var projectTypeList = [];
var projectTypeArray,
    projectTypeId,
    sponsorId;

function getProjectType() {

	var callForProjectType = require('apiCallWithoutIndicator');
	new callForProjectType('POST', system_url.getProjectType(), null, function(json) {

		projectTypeArray = json.project_type;
		var arraySize = projectTypeArray.length;
		var index = 0;

		for (var i = 0; i < arraySize; i++) {
			projectTypeList.push(projectTypeArray[i].title);
			if (projectTypeArray[i].id == projectTypeId) {
				index = i;
			}
		}

		$.dialog.options = projectTypeList;
		$.dialog.selectedIndex = index;
	});

}

function enableEditView() {

	$.disclosureBtn.visible = true;
	$.projectName.editable = true;
	$.projectDescription.editable = true;
	$.teamSizeText.editable = true;
	$.durationText.editable = true;
	$.responseDaysText.editable = true;
	$.revenuePlanText.editable = true;
	$.targetRevenueText.editable = true;
	$.additionalCostText.editable = true;

	$.projectName.borderStyle = Ti.UI.INPUT_BORDERSTYLE_ROUNDED;
	$.teamSizeText.borderStyle = Ti.UI.INPUT_BORDERSTYLE_ROUNDED;
	$.durationText.borderStyle = Ti.UI.INPUT_BORDERSTYLE_ROUNDED;
	$.responseDaysText.borderStyle = Ti.UI.INPUT_BORDERSTYLE_ROUNDED;
	$.revenuePlanText.borderStyle = Ti.UI.INPUT_BORDERSTYLE_ROUNDED;
	$.targetRevenueText.borderStyle = Ti.UI.INPUT_BORDERSTYLE_ROUNDED;
	$.additionalCostText.borderStyle = Ti.UI.INPUT_BORDERSTYLE_ROUNDED;

}

function disableEditView() {

	$.disclosureBtn.visible = false;
	$.projectName.editable = false;
	$.projectDescription.editable = false;
	$.teamSizeText.editable = false;
	$.durationText.editable = false;
	$.responseDaysText.editable = false;
	$.revenuePlanText.editable = false;
	$.targetRevenueText.editable = false;
	$.additionalCostText.editable = false;

	$.projectName.borderStyle = Ti.UI.INPUT_BORDERSTYLE_NONE;
	$.teamSizeText.borderStyle = Ti.UI.INPUT_BORDERSTYLE_NONE;
	$.durationText.borderStyle = Ti.UI.INPUT_BORDERSTYLE_NONE;
	$.responseDaysText.borderStyle = Ti.UI.INPUT_BORDERSTYLE_NONE;
	$.revenuePlanText.borderStyle = Ti.UI.INPUT_BORDERSTYLE_NONE;
	$.targetRevenueText.borderStyle = Ti.UI.INPUT_BORDERSTYLE_NONE;
	$.additionalCostText.borderStyle = Ti.UI.INPUT_BORDERSTYLE_NONE;

}

function crossBtnListener(e) {

	if (args.isFromNoti) {

		var ne = Alloy.createController('home').getView();
		ne.open();
		$.win.close();

	} else {

		$.win.close();
		Ti.App.fireEvent('disableSelectedRowColor');

	}
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateThisProject(param, e) {

	e.source.touchEnabled = false;
	var callAPI = require('apiCallWithoutIndicator');
	new callAPI('POST', system_url.updateProject(), param, function(json) {

		e.source.touchEnabled = true;

		if (json.message == "success") {
			alert('Project successfully updated.');
			$.win.close();
			Ti.App.fireEvent('NewProjectPosted');
		};

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

	if ($.projectType.text != '' && projectName != '' && projectDescription != '' && teamSize != '' && duration != '' && responseDays != '' && revenuePlan != '' && targetRevenue != '' && additionalCost != '') {

		if (Math.floor(teamSize) == Number(teamSize)) {

			if (Math.floor(duration) == Number(duration)) {

				if (Math.floor(responseDays) == Number(responseDays)) {

					if (Math.floor(targetRevenue) == Number(targetRevenue)) {

						if (Math.floor(additionalCost) == Number(additionalCost)) {

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
							param.assigned_by = projectInfo.assigned_by_id + "";
							param.sponsored_by = projectInfo.sponsored_by_id;
							param.project_id = args.id;

							if (userInfo.user_type === 1) {

								if (managersList.length !== 0) {

									param.assigned_to = "" + managersList + "";
									updateThisProject(param, e);

								} else {
									alert('Select managers from manager list.');
								}

							} else {

								param.assigned_to = "" + [userInfo.user_id] + "";
								updateThisProject(param, e);

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

var defaultImageView;
function editBtnListener(e) {

	if (!e.source.type) {

		e.source.type = true;
		e.source.title = "SAVE";
		e.source.setWidth(Ti.UI.SIZE);

		enableEditView();

		$.pickerHeader.addEventListener('click', pickerEventListener);

		if (userInfo.user_type === 1) {

			var manager = {
				name : {
					text : ""
				},
				profileImage : {
					image : "/images/defaultProfile.png"
				}
			};

			defaultImageView = Alloy.createController('managerProfile', {
				user : manager
			}).getView();

			defaultImageView.identifier = -1;
			defaultImageView.getChildren()[0].identifier = -1;
			defaultImageView.getChildren()[1].identifier = -1;

			defaultImageView.addEventListener('click', showListView);
			$.managersList.add(defaultImageView);

		}

	} else {

		saveBtnListener(e);

	}
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

			var defaultUser = {
				name : {
					text : ""
				},
				profileImage : {
					image : "/images/defaultProfile.png"
				}
			};

			defaultImageView = Alloy.createController('managerProfile', {
				user : defaultUser
			}).getView();

			defaultImageView.identifier = -1;
			defaultImageView.getChildren()[0].identifier = -1;
			defaultImageView.getChildren()[1].identifier = -1;

			defaultImageView.addEventListener('click', showListView);

			$.managersList.add(defaultImageView);
			managersList.push(user.userId);

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

function pickerEventListener(e) {

	$.dialog.show();

};

$.dialog.addEventListener('click', function(e) {

	$.projectType.text = projectTypeList[e.index];
	projectTypeId = projectTypeArray[e.index].id;

});

function approve(e) {

	var parameters = {};
	parameters.project_id = args.id;
	parameters.status = 1;
	parameters.user_id = userInfo.user_id;
	parameters.comment = "";

	e.source.touchEnabled = false;
	var callForProjectType = require('apiCallWithoutIndicator');
	new callForProjectType('POST', system_url.getProjectStatus(), parameters, function(json) {

		e.source.touchEnabled = true;

		if (json.message == "success") {
			alert('Project successfully approved.');
			$.win.close();
			Ti.App.fireEvent('PostedUpdated');
		};

	});

}

function reject(e) {

	var parameters = {};
	parameters.project_id = args.id;
	parameters.status = 2;
	parameters.user_id = userInfo.user_id;
	parameters.comment = "";

	e.source.touchEnabled = false;
	var callForProjectType = require('apiCallWithoutIndicator');
	new callForProjectType('POST', system_url.getProjectStatus(), parameters, function(json) {

		e.source.touchEnabled = true;

		if (json.message == "success") {
			alert('Project successfully rejected.');
			$.win.close();
			Ti.App.fireEvent('PostedUpdated');
		};

	});

}

function showBlurEffect() {

	$.navHeader.touchEnabled = false;
	$.navHeader.setOpacity(0.5);
	$.scrollView.scrollingEnabled = false;
	$.scrollView.touchEnabled = false;
	$.scrollView.setOpacity(0.5);

	if ($.approveBtn != null && $.rejectBtn != null && $.contactBtn != null) {
		$.approveBtn.touchEnabled = false;
		$.rejectBtn.touchEnabled = false;
		$.contactBtn.touchEnabled = false;
	}

	$.win.setBackgroundColor("#000");
}

function showFocusEffect() {

	$.navHeader.touchEnabled = true;
	$.navHeader.setOpacity(1.0);
	$.scrollView.scrollingEnabled = true;
	$.scrollView.touchEnabled = true;
	$.scrollView.setOpacity(1.0);

	if ($.approveBtn != null && $.rejectBtn != null && $.contactBtn != null) {
		$.approveBtn.touchEnabled = true;
		$.rejectBtn.touchEnabled = true;
		$.contactBtn.touchEnabled = true;
	}

	$.win.setBackgroundColor("#019AE8");
}

function contact(e) {

	Ti.API.info(JSON.stringify(projectInfo));

	var user = {};
	user.image = projectInfo.sponsored_by_photo;
	user.name = projectInfo.sponsored_by_name;
	user.email = projectInfo.sponsored_by_email;
	user.contact = projectInfo.sponsored_by_contact;

	showBlurEffect();
	var child = Alloy.createController('contactForm', {
		user : user
	});

	child.on('close', function() {
		showFocusEffect();
		$.win.remove(child.getView());
	});

	$.win.add(child.getView());
}

var showInfo = false;

$.infoPic.addEventListener('click', function(e) {

	if (!showInfo) {

		showInfo = true;
		e.source.setImage("/images/info_cross.png");

		var user = {
			name : {
				text : projectInfo.assigned_by_name
			},
			profileImage : {
				image : projectInfo.assigned_by_photo
			}
		};

		$.scrollView.scrollingEnabled = false;
		$.scrollView.touchEnabled = false;
		var infoView = Alloy.createController('infoView', {
			user : user
		}).getView();

		$.win.add(infoView);

	} else {

		showInfo = false;
		e.source.setImage("/images/info.png");

		if ($.win.children) {
			for (var i = 0; i < $.win.children.length; i++) {
				if ($.win.children[i] !== undefined) {

					if ($.win.children[i].id === "infoView") {

						$.win.remove($.win.children[i]);
						$.scrollView.scrollingEnabled = true;
						$.scrollView.touchEnabled = true;

					};
				}
			}
		}
	}
});
