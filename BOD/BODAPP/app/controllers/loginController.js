var args = arguments[0] || {};

// Require the module
var CloudPush = require('ti.cloudpush');
var Cloud = require("ti.cloud");

//CloudPush.showTrayNotification = true;

// Initialize the module
CloudPush.retrieveDeviceToken({
	success : deviceTokenSuccess,
	error : deviceTokenError
});

// Enable push notifications for this device
// Save the device token for subsequent API calls
function deviceTokenSuccess(e) {
	Ti.App.Properties.setObject('deviceToken', e.deviceToken);
}

function deviceTokenError(e) {
	//alert('Failed to register for push notifications! ' + e.error);
}

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

function alertMessage(_title, msg) {
	var alertDialog = Titanium.UI.createAlertDialog({
		title : _title,
		message : msg,
		buttonNames : ['OK']
	});
	alertDialog.show();
}

function login(e) {

	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {

		alertMessage('WARNING!', 'Your device is not online.');

	} else {

		if ($.emailTextField.value.trim() !== "" && $.passwordTextField.value.trim() !== "") {

			var param = {};
			param.email = $.emailTextField.value.trim();
			param.password = $.passwordTextField.value.trim();
			param.device_id = Titanium.Platform.id;
			param.fcm_key = Ti.App.Properties.getObject('deviceToken');

			e.source.touchEnabled = false;
			var LoadData = require('apiCallToLogin');
			new LoadData(param, activityIndicator, function(json) {

				e.source.touchEnabled = true;

				var user_info = {};
				user_info.id = json.user_id;
				user_info.type = json.user_type;
				user_info.username = param.email;
				user_info.password = param.password;

				if (json.message === "success") {

					if (Ti.App.Properties.getObject('deviceToken') === null) {
						loginUser(param.email, "123456");
					}

					Ti.App.Properties.setObject('Current_User_Data', json);

					Ti.App.Properties.setObject('user_info', user_info);

					var ne = Alloy.createController('home').getView();

					ne.open();

				} else if (json.message === "error") {
					
					
					
				} else {

					alertMessage('WARNING!', json.status);
				}

			});

		} else {

			alertMessage('WARNING!', 'E-mail and password field are required.');

		}
	}
}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function validate(email) {

	var $result = $("#result");
	var email = $("#email").val();
	$result.text("");

	if (validateEmail(email)) {
		$result.text(email + " is valid :)");
		$result.css("color", "green");
	} else {
		$result.text(email + " is not valid :(");
		$result.css("color", "red");
	}

	return false;
}

if (OS_ANDROID) {

	if (args.id === 1) {

		$.win.addEventListener('android:back', function(e) {
			e.cancelBubble = true;
		});
	}
}

