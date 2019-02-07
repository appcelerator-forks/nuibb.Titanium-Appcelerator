function API_Calling(_method, _url, _param, _indicator, onCreate) {
	function returnJson() {
		var json = JSON.parse(this.responseText);
		onCreate(json);
		if (_indicator && _indicator !== null) {
			_indicator.hide();
		}
	}

	function alertMessage(_title, msg) {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : _title,
			message : msg,
			buttonNames : ['OK']
		});
		alertDialog.show();
	}

	function errorMessage() {
		
		if (_indicator && _indicator != null) {
			_indicator.hide();
		}
		Ti.API.info("STATUS: " + this.status);
		Ti.API.info("TEXT:   " + this.responseText);
		Ti.API.info("ERROR:  " + this.error);
		
		alertMessage('WARNING!', 'Could not connect to server. Please try again');
		
	}

	// Checking whether the device is online or offline
	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
		alertMessage('WARNING!', 'Your device is not online.');
	} else {
		if (_indicator && _indicator != null) {
			_indicator.show();
		}
		try {
			var xhr = Titanium.Network.createHTTPClient({
				timeout : 10000
			});
			xhr.onload = returnJson;
			xhr.onerror = errorMessage;
			xhr.open(_method, _url);
			if (_param != null)
				xhr.send(_param);
			else
				xhr.send();
		} catch(e) {
			alert(e);
		}
	}
}

module.exports = API_Calling;
