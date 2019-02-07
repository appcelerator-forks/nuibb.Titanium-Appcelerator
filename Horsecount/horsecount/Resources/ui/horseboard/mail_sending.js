function Send_Mail(_id, _board) {
	var isAndroid = Ti.Platform.osname === 'android';
	var API_Call = require('ui/apiCalling/call_without_indicator');
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();
	if (isAndroid) {
		var textfield = Ti.UI.createTextField();
		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'Enter Email Address',
			androidView : textfield,
			buttonNames : ['Send', 'Cancel']
		});

		alertDialog.addEventListener('click', function(e) {
			if (textfield.value !== '') {
				var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

				if (reg.test(textfield.value) === false) {
					alert('Invalid mail');
				} else {
					var _url = system_url.getHBSendToFriend_url(_id, textfield.value, _board);
					var _icons = new API_Call('GET', _url, null, function(json) {
						alertMessage('Message!', json.message_mail);
					});
				}
			}
		});

		alertDialog.show();
	} else {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'Enter Email Address',
			style : Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
			buttonNames : ['Send', 'Cancel']
		});

		alertDialog.addEventListener('click', function(e) {
			if (!e.index) {
				var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

				if (reg.test(e.text) === false) {
					alert('Invalid mail');
				} else {
					var _url = system_url.getHBSendToFriend_url(_id, e.text, _board);
					var _icons = new API_Call('GET', _url, null, function(json) {
						alertMessage('Message!', json.message_mail);
					});
				}
			}
		});

		alertDialog.show();
	}

	function alertMessage(_title, msg) {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : _title,
			message : msg,
			buttonNames : ['OK']
		});
		alertDialog.show();
	}

}

module.exports = Send_Mail;
