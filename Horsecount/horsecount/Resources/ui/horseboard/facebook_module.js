function FB_install(_array) {
	var fb = require('facebook');
	fb.appid = '486681711448384';
	fb.permissions = ['publish_stream', 'read_stream'];


	var data = {
	link : _array[0],
	name : _array[1],
	caption : _array[2],
	picture : _array[3],
	description : _array[4]
	};


	fb.dialog("feed", data, showRequestResult);
	fb.authorize();


	// if (!fb.loggedIn) {
		// fb.authorize();
		// fb.dialog("feed", data, showRequestResult);
	// } else {
		// fb.reauthorize(['publish_stream'], 'me', function(e) {
			// fb.dialog("feed", data, showRequestResult);
		// });
	// }


	function alertMessage(_title, msg) {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : _title,
			message : msg,
			buttonNames : ['OK']
		});
		alertDialog.show();
	}

	function showRequestResult(e) {
		if (e.success) {
			if (e.result) {
				var s = "Successfully posted to your wall";
				alert(s);
			}

			if (!e.result && !e.data) {
				var s = "You canceled dialog";
				alert(s);
			}

		} else {
			if (e.error) {
				var s = "Failed to post by - " + e.error;
				alert(s);
			}
		}
	}


}

module.exports = FB_install;
