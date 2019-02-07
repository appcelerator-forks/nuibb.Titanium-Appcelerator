function API_Calling(_customMethod, _url, onCreate) {
	function returnJson() {
		onCreate();
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
		//Ti.API.info("STATUS: " + this.status);
		//Ti.API.info("TEXT:   " + this.responseText);
		//Ti.API.info("ERROR:  " + this.error);
		if (this.responseText === null || this.status == 0) {
			alertMessage('WARNING!', 'Could not connect to server. Please try again');
		} else if (this.status === 401) {
			alertMessage('WARNING!', JSON.parse(this.responseText).error);
			Ti.App.fireEvent('backtoRoot');
		} else if (this.status === 403) {
			Ti.App.fireEvent('ModuleHiding');
			alertMessage('WARNING!', JSON.parse(this.responseText).error);
		} else if (JSON.parse(this.responseText).error) {
			alertMessage('WARNING!', JSON.parse(this.responseText).error);
		} else {
			alertMessage('WARNING!', 'Could not connect to server. Please try again');
		}
	}

	// Checking whether the device is online or offline
	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
		alertMessage('WARNING!', 'Your device is not online.');
	} else {
		try {
			var xhr = Titanium.Network.createHTTPClient({
				timeout : 10000
			});
			xhr.onload = returnJson;
			xhr.onerror = errorMessage;
			xhr.open(_customMethod, _url);
			xhr.send();
		} catch(e) {
			alert(e);
		}
	}

}

module.exports = API_Calling;
