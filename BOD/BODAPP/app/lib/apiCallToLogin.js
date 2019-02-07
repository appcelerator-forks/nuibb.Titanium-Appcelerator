function LogIn(param, _indicator, onComplete) {
	//Get app's API url object
	var SystemUrl = require('system_urls');
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
		if (_indicator && _indicator != null) {
			_indicator.hide();
		}
	}

	function errorMessage() {
		
		if (_indicator && _indicator != null) {
			_indicator.hide();
		}
		
		Ti.API.info("STATUS: " + this.status);
		Ti.API.info("TEXT:   " + this.responseText);
		Ti.API.info("ERROR:  " + this.error);
		if (this.responseText == null || this.status == 0) {
			alertMessage('WARNING!', 'Could not connect to server.Please try again');
		} else if (this.status == 400 || JSON.parse(this.responseText).error) {
			alertMessage('WARNING!', JSON.parse(this.responseText).error);
		} else {
			alertMessage('WARNING!', 'Could not connect to server.Please try again');
		}
		
		var json = {};
		json.message = "error";
		
		onComplete(json);
		
	}

	// Checking whether the device is online or offline
	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
		alertMessage('WARNING!', 'Your device is not online.');
	} else {
		
		if (_indicator && _indicator != null) {
			_indicator.show();
		}
		
		Ti.API.info("helio");
		
		try {
			var xhr = Titanium.Network.createHTTPClient({
				timeout : 5000
			});
			xhr.onload = onSuccess;
			xhr.onerror = errorMessage;
			xhr.open("POST", system_url.getLoginUrl());
			xhr.send(param);
			
		} catch(e) {
			alert(e);
		}
	}
}

module.exports = LogIn;
