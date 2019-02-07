var args = arguments[0] || {};
var user_info = Ti.App.Properties.getObject('user_info');

var isStatusBoxOpen = false;
var selectedSectionIndex,
    selectedItemIndex;
var selectedProjectStatus = 3,
    selectedTab = 0;
var dataForMeTab = [],
    dataForOthersTab = [],
    dataForAllTab = [];

var CloudPush = require('ti.cloudpush');
var Cloud = require("ti.cloud");
CloudPush.showTrayNotification = true;
CloudPush.enabled = true;
CloudPush.showTrayNotificationsWhenFocused = true;
CloudPush.showAppOnTrayClick = true;

// Initialize the module
CloudPush.retrieveDeviceToken({
	success : deviceTokenSuccess,
	error : deviceTokenError
});

// Enable push notifications for this device
// Save the device token for subsequent API calls
function deviceTokenSuccess(e) {

	if (Ti.App.Properties.getObject('deviceToken') !== e.deviceToken) {

		var param = {};
		param.email = user_info.username;
		param.password = user_info.password;
		param.device_id = Titanium.Platform.id;
		param.fcm_key = e.deviceToken;

		loginUser(param.email, "123456");

		var LoadData = require('apiCallWithoutIndicator');
		new LoadData('POST', system_url.getLoginUrl(), param, function(json) {

			if (json.message === "success") {

				Ti.App.Properties.setObject('deviceToken', e.deviceToken);

			}

		});

	} else {

		//Ti.API.info("Same token");
	}

}

function deviceTokenError(e) {
	//alert('Failed to register for push notifications! ' + e.error);
}

CloudPush.addEventListener('callback', function(evt) {

	var json = JSON.parse(evt.payload);
	//	alert(JSON.stringify(json));
	Ti.API.info("Json : " + JSON.stringify(json));

});

CloudPush.addEventListener('trayClickLaunchedApp', function(evt) {

	Ti.API.info('Tray Click Launched App (app was not running : )' + JSON.stringify(evt));

	if (Ti.App.Properties.getObject('Current_User_Data') && Ti.App.Properties.getObject('Current_User_Data') != null) {

		var json = JSON.parse(evt.payload);

		var editProject = Alloy.createController('editProject', {
			id : json.project_id,
			isFromNoti : true
		}).getView();

		editProject.open();

	}

});

CloudPush.addEventListener('trayClickFocusedApp', function(evt) {

	Ti.API.info('Tray Click Focused App (app was already running)' + JSON.stringify(evt));

	if (Ti.App.Properties.getObject('Current_User_Data') && Ti.App.Properties.getObject('Current_User_Data') != null) {

		var json = JSON.parse(evt.payload);

		var editProject = Alloy.createController('editProject', {
			id : json.project_id,
			isFromNoti : false
		}).getView();

		editProject.open();
	}

});

function loginUser(userName, password) {
	// Log in to Arrow
	Cloud.Users.login({
		login : userName,
		password : password
	}, function(e) {
		if (e.success) {
			//alert('Login successful');
			subscribeToChannel();
		} else {
			//alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}

function subscribeToChannel() {

	// Subscribe the user and device to the 'test' channel
	// Specify the push type as either 'android' for Android or 'ios' for iOS
	// Check if logged in:
	Cloud.PushNotifications.subscribe({
		channel : 'my_channel',
		device_token : Ti.App.Properties.getObject('deviceToken'),
		type : Ti.Platform.name === 'android' ? 'android' : 'ios'
	}, function(e) {
		if (e.success) {
			//alert('Subscribed');
		} else {
			//alert('Errorrr:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}

function unsubscribeToChannel() {
	// Unsubscribes the user and device from the 'test' channel
	Cloud.PushNotifications.unsubscribe({
		channel : 'my_channel',
		device_token : Ti.App.Properties.getObject('deviceToken')
	}, function(e) {
		if (e.success) {
			alert('Unsubscribed');
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}

var Indicator = require('activityIndicator');
var activityIndicator = new Indicator();
$.win.add(activityIndicator);

var SystemUrl = require('system_urls');
var system_url = new SystemUrl();

if (OS_ANDROID) {

	$.win.addEventListener('open', function() {
		$.win.activity.actionBar.hide();
	});

}

function loadDataFromServer() {

	var API_Call = require('apiCallWithIndicator');
	new API_Call('POST', system_url.getUserProjectList(), null, activityIndicator, function(json) {

		var projectList = json.data;
		var arraySize = projectList.length;

		for (var i = 0; i < arraySize; i++) {

			var projectStatus,
			    colorCode;
			if (projectList[i].status === 0) {
				projectStatus = "Pending";
				colorCode = "#FF9800";
			} else if (projectList[i].status === 1) {
				projectStatus = "Approved";
				colorCode = "#66cf78";
			} else if (projectList[i].status === 2) {
				projectStatus = "Rejected";
				colorCode = "#FF575E";
			}

			var project = {
				id : projectList[i].id,
				profileImage : {
					image : projectList[i].sponsored_by_photo
				},
				statusView : {
					backgroundColor : colorCode,
					borderColor : colorCode
				},
				status : {
					id : projectList[i].status,
					text : projectStatus,
					color : colorCode
				},
				title : {
					text : projectList[i].title
				},
				descript : {
					text : projectList[i].details
				},
				holderView : {
					backgroundColor : "#f2f2f2"
				}
			};

			if (user_info.id == projectList[i].assigned_by_id || user_info.id == projectList[i].sponsored_by_id) {

				dataForMeTab.push(project);

			} else {

				dataForOthersTab.push(project);
			}

			dataForAllTab.push(project);
		}

		if (selectedTab === 0) {

			if (dataForMeTab.length !== 0 && $.elementsList.sections[0]) {

				$.elementsList.visible = true;
				$.emptyProject.visible = false;
				$.elementsList.sections[0].setItems(dataForMeTab);

			} else {

				$.elementsList.visible = false;
				$.emptyProject.visible = true;

			}

		} else if (selectedTab === 1 && dataForOthersTab.length !== 0) {

			$.elementsList.sections[0].setItems(dataForOthersTab);

		} else if (selectedTab === 2 && dataForAllTab.length !== 0) {

			$.elementsList.sections[0].setItems(dataForAllTab);

		}

	});
}

loadDataFromServer();

function meBtnClick(e) {

	selectedTab = 0;
	selectedSectionIndex = null;
	selectedItemIndex = null;
	$.meButton.setColor('white');
	$.otherButton.setColor('#58BCEF');
	$.allButton.setColor('#58BCEF');
	$.meSegment.setBackgroundColor('white');
	$.otherSegment.setBackgroundColor('transparent');
	$.allSegment.setBackgroundColor('transparent');

	if (dataForMeTab.length !== 0) {

		$.elementsList.visible = true;
		$.emptyProject.visible = false;

		if (selectedProjectStatus === 3) {

			$.elementsList.sections[0].setItems(dataForMeTab);

		} else {

			var array = [];

			for (var i = 0; i < dataForMeTab.length; i++) {

				if (dataForMeTab[i].status.id === selectedProjectStatus) {
					array.push(dataForMeTab[i]);
				}

			}

			$.elementsList.sections[0].setItems(array);
		}

	} else {

		$.elementsList.visible = false;
		$.emptyProject.visible = true;

	}
}

function otherBtnClick(e) {

	selectedTab = 1;
	selectedSectionIndex = null;
	selectedItemIndex = null;
	$.meButton.setColor('#58BCEF');
	$.otherButton.setColor('white');
	$.allButton.setColor('#58BCEF');
	$.meSegment.setBackgroundColor('transparent');
	$.otherSegment.setBackgroundColor('white');
	$.allSegment.setBackgroundColor('transparent');
	$.elementsList.visible = true;
	$.emptyProject.visible = false;

	if (dataForOthersTab.length !== 0) {

		if (selectedProjectStatus === 3) {

			$.elementsList.sections[0].setItems(dataForOthersTab);

		} else {

			var array = [];

			for (var i = 0; i < dataForOthersTab.length; i++) {

				if (dataForOthersTab[i].status.id === selectedProjectStatus) {
					array.push(dataForOthersTab[i]);
				}

			}

			$.elementsList.sections[0].setItems(array);
		}
	}
}

function allBtnClick(e) {

	selectedTab = 2;
	selectedSectionIndex = null;
	selectedItemIndex = null;
	$.meButton.setColor('#58BCEF');
	$.otherButton.setColor('#58BCEF');
	$.allButton.setColor('white');
	$.meSegment.setBackgroundColor('transparent');
	$.otherSegment.setBackgroundColor('transparent');
	$.allSegment.setBackgroundColor('white');
	$.elementsList.visible = true;
	$.emptyProject.visible = false;

	if (dataForAllTab.length !== 0) {

		if (selectedProjectStatus === 3) {

			$.elementsList.sections[0].setItems(dataForAllTab);

		} else {

			var array = [];

			for (var i = 0; i < dataForAllTab.length; i++) {

				if (dataForAllTab[i].status.id === selectedProjectStatus) {
					array.push(dataForAllTab[i]);
				}

			}

			$.elementsList.sections[0].setItems(array);
		}
	}
}

Ti.App.addEventListener('disableSelectedRowColor', function(e) {
	if (selectedSectionIndex != null && selectedItemIndex != null) {
		var section = $.elementsList.sections[selectedSectionIndex];
		var item = section.getItemAt(selectedItemIndex);
		item.holderView.backgroundColor = "#f2f2f2";
		section.updateItemAt(selectedItemIndex, item);
	}
});

function itemClick(e) {

	if (selectedSectionIndex != null && selectedItemIndex != null) {
		var section = $.elementsList.sections[selectedSectionIndex];
		var item = section.getItemAt(selectedItemIndex);
		item.holderView.backgroundColor = "#f2f2f2";
		section.updateItemAt(selectedItemIndex, item);
	}

	// Get the section of the clicked item
	selectedSectionIndex = e.sectionIndex;
	selectedItemIndex = e.itemIndex;
	var section = $.elementsList.sections[e.sectionIndex];
	// Get the clicked item from that section
	var item = section.getItemAt(e.itemIndex);
	item.holderView.backgroundColor = "#CCCCCC";
	section.updateItemAt(e.itemIndex, item);

	if (!isStatusBoxOpen) {

		var editProject = Alloy.createController('editProject', {
			id : item.id,
			isFromNoti : false
		}).getView();

		editProject.open();

	} else {

		isStatusBoxOpen = false;

		if ($.win.children) {
			for (var i = 0; i < $.win.children.length; i++) {
				if ($.win.children[i] !== undefined) {
					if ($.win.children[i].id === "statusBox") {
						$.win.remove($.win.children[i]);
					}
				}
			}
		}
	}
}

function refreshData(value) {

	isStatusBoxOpen = false;
	selectedProjectStatus = value;

	if (selectedTab === 0) {

		if (dataForMeTab.length !== 0) {

			if (selectedProjectStatus === 3) {

				$.elementsList.sections[0].setItems(dataForMeTab);

			} else {

				var array = [];

				for (var i = 0; i < dataForMeTab.length; i++) {

					if (dataForMeTab[i].status.id === selectedProjectStatus) {
						array.push(dataForMeTab[i]);
					}
				}

				$.elementsList.sections[0].setItems(array);
			}
		}

	} else if (selectedTab === 1) {

		if (dataForOthersTab.length !== 0) {

			if (selectedProjectStatus === 3) {

				$.elementsList.sections[0].setItems(dataForOthersTab);

			} else {

				var array = [];

				for (var i = 0; i < dataForOthersTab.length; i++) {

					if (dataForOthersTab[i].status.id === selectedProjectStatus) {
						array.push(dataForOthersTab[i]);
					}

				}

				$.elementsList.sections[0].setItems(array);
			}
		}
	} else if (selectedTab === 2) {

		if (dataForAllTab.length !== 0) {

			if (selectedProjectStatus === 3) {

				$.elementsList.sections[0].setItems(dataForAllTab);

			} else {

				var array = [];

				for (var i = 0; i < dataForAllTab.length; i++) {

					if (dataForAllTab[i].status.id === selectedProjectStatus) {
						array.push(dataForAllTab[i]);
					}

				}

				$.elementsList.sections[0].setItems(array);
			}
		}
	}
}

$.rightNavImage.addEventListener('click', function(e) {

	isStatusBoxOpen = true;

	var child = Alloy.createController('projectStatusView', {
		status : selectedProjectStatus,
		callback : refreshData
	});

	child.on('close', function() {
		$.win.remove(child.getView());
	});

	$.win.add(child.getView());
});

$.notiNavImage.addEventListener('click', function(e) {

	var newProject = Alloy.createController('notificationPanel').getView();
	newProject.open();

});

$.floatingImage.addEventListener('click', function(e) {

	if (!isStatusBoxOpen) {

		var newProject = Alloy.createController('newproject').getView();
		newProject.open();

	} else {

		isStatusBoxOpen = false;

		if ($.win.children) {
			for (var i = 0; i < $.win.children.length; i++) {
				if ($.win.children[i] !== undefined) {
					if ($.win.children[i].id === "statusBox") {
						$.win.remove($.win.children[i]);
					};
				}
			}
		}
	}
});

$.elementsList.addEventListener('click', function(e) {

	if (isStatusBoxOpen) {

		if ($.win.children) {
			for (var i = 0; i < $.win.children.length; i++) {
				if ($.win.children[i] !== undefined) {
					if ($.win.children[i].id === "statusBox") {
						$.win.remove($.win.children[i]);
					};
				}
			}
		}
	}
});

//Navigation Drawer

if (OS_ANDROID) {

	var leftView = Alloy.createController('navDrawerLeftView').getView();

	var drawer = Ti.UI.Android.createDrawerLayout({
		leftView : leftView,
		centerView : $.rootHolder
	});

	$.win.add(drawer);

	$.leftNavImage.addEventListener('click', function(e) {

		if (!isStatusBoxOpen) {
			drawer.toggleLeft();
		}

	});

}

Ti.App.addEventListener('NewProjectPosted', function(e) {
	selectedTab = 0;
	$.meButton.setColor('white');
	$.otherButton.setColor('#58BCEF');
	$.allButton.setColor('#58BCEF');
	$.meSegment.setBackgroundColor('white');
	$.otherSegment.setBackgroundColor('transparent');
	$.allSegment.setBackgroundColor('transparent');

	dataForMeTab = [];
	dataForOthersTab = [];
	dataForAllTab = [];
	loadDataFromServer();
});

Ti.App.addEventListener('PostedUpdated', function(e) {

	dataForMeTab = [];
	dataForOthersTab = [];
	dataForAllTab = [];
	loadDataFromServer();
});
