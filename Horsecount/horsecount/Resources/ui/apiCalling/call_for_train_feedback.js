function API_Calling(_url, param,  onCreate) {
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
		onCreate();
		alertMessage('Alert!', 'Feedback successfully updated.');
	}

	function errorMessage() {
		if (this.responseText === null || this.status == 0) {
			alertMessage('WARNING!', 'Could not connect to server. Please try again');
		} else if (this.status === 401) {
			//if we get status 401 after api calling for stuff authorization checking then window will close by closeWindow function
			alertMessage('WARNING!', JSON.parse(this.responseText).error);
			Ti.App.fireEvent('backtoRoot');
		} else if (this.status === 403) {
			Ti.App.fireEvent('ModuleHiding');
			alertMessage('WARNING!', JSON.parse(this.responseText).error);
		} else {
			var response = this.responseText.substring(1, this.responseText.length - 1);
			var res_array = response.split(',');
			var alertString = 'Unable to update feedback: ' + '\n';
			for (i in res_array) {
				var properties = res_array[i].split(':');
				if (properties[0] == '"work_load_adj"') {
					var text = properties[1].substring(2, properties[1].length - 2);
					alertString = alertString + 'Workload ' + text + '\n';
				} else if (properties[0] == '"target_p_adj"') {
					var text = properties[1].substring(2, properties[1].length - 2);
					alertString = alertString + 'Target performance ' + text + '\n';
				} else if (properties[0] == '"heart_rate_load"') {
					var text = properties[1].substring(2, properties[1].length - 2);
					alertString = alertString + 'Heart rate @load ' + text + '\n';
				} else if (properties[0] == '"heart_rate_cd"') {
					var text = properties[1].substring(2, properties[1].length - 2);
					alertString = alertString + 'Heart rate @10 min CD ' + text + '\n';
				} else if (properties[0] == '"temperature"') {
					var text = properties[1].substring(2, properties[1].length - 2);
					alertString = alertString + 'Body temperature ' + text + '\n';
				} else if (properties[0] == '"scheduled_at"') {
					var text = properties[1].substring(2, properties[1].length - 2);
					alertString = alertString + text + '\n';
				}
			}
			alertMessage('ERROR!', alertString);
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
			xhr.onload = onSuccess;
			xhr.onerror = errorMessage;
			xhr.open('POST', _url);
			xhr.send(param);
		} catch(e) {
			alert(e);
		}
	}

}

module.exports = API_Calling;
