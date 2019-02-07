function LogIn(param, _indicator, onComplete) {
	//Get app's API url object
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();

	//Show alert message function
	function alertMessage(_title, msg) {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : _title,
			message : msg,
			buttonNames : ['OK']
		});
		alertDialog.show();
	}

	function onSuccess() {
		var json = JSON.parse(this.responseText);
		onComplete(json);
		_indicator.hide();
	}

	function errorMessage() {
		_indicator.hide();
		//Ti.API.info("STATUS: " + this.status);
		//Ti.API.info("TEXT:   " + this.responseText);
		//Ti.API.info("ERROR:  " + this.error);
		if (this.responseText == null || this.status == 0) {
			alertMessage('WARNING!', 'Could not connect to server.Please try again');
		} else if (this.status == 401 || JSON.parse(this.responseText).error) {
			alertMessage('WARNING!', JSON.parse(this.responseText).error);
		} else {
			alertMessage('WARNING!', 'Could not connect to server.Please try again');
		}
	}

	// Checking whether the device is online or offline
	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
		alertMessage('WARNING!', 'Your device is not online.');
	} else {
		_indicator.show();
		try {
			var xhr = Titanium.Network.createHTTPClient({
				timeout : 10000
			});
			xhr.onload = onSuccess;
			xhr.onerror = errorMessage;
			xhr.open("POST", system_url.getLoginUrl());
			xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
			data_to_send = {
				username : param.username,
				password : param.password
			};

			xhr.send(JSON.stringify({
				prop : 'string',
				user : data_to_send
			}));

		} catch(e) {
			alert(e);
		}
	}
}

module.exports = LogIn;
