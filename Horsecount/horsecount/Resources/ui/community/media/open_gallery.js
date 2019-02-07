function UploadPhoto(_userOrGroupId, _from, _indicator, updateListener) {
	var SystemUrl = require('ui/handheld/system_urls');
	var system_url = new SystemUrl();

	var Utilities = require('ui/community/wrapper_classes/utils');
	var utilities = new Utilities();

	function eventListenerForImage(event) {
		var image = event.media;
		var params = {
			content_type : event.media.mimeType,
			filename : utilities.getCurrentDateTime() + '.jpg',
			file_data : Ti.Utils.base64encode(event.media).toString()
		};

		var API_Call = require('ui/apiCalling/call_with_indicator');
		if (_from === 'Profile') {
			new API_Call('POST', system_url.getProfileImageByUpload_url(), params, _indicator, function(json) {
				updateListener(json);
			});
		} else {
			params.image_type = _from === 'newsfeed' ? 'user' : 'group';
			params.accessor_id = _userOrGroupId;

			new API_Call('POST', system_url.getStatusImageUpload_url(), params, _indicator, function(json) {
				updateListener(json);
			});
		}
	}


	Titanium.Media.openPhotoGallery({
		success : eventListenerForImage,
		cancel : function() {

		},
		error : function(error) {
		},
		allowImageEditing : true
	});
}

module.exports = UploadPhoto;
