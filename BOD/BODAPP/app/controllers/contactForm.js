// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = arguments[0] || {};

$.profilePic.image = args.user.image;
$.profileName.text = args.user.name;

function callBtnClick(e) {

	//if (OS_IOS) {

	Ti.Platform.openURL('tel://01775994477');
	// Ti.Platform.openURL('telprompt://911');

	//	}

	//	if (OS_ANDROID) {

	// var intent = Ti.Android.createIntent({
	// action : Ti.Android.ACTION_CALL,
	// data : 'tel:01775994477'
	// });
	// Ti.Android.currentActivity.startActivity(intent);

	//	}
}

function crossButtonClick(e) {

	$.trigger('close');

}

function messageBtnClick(e) {

	Ti.Platform.openURL("sms:" + args.user.contact);

}

function emailBtnClick(e) {

	var emailDialog = Titanium.UI.createEmailDialog();
	emailDialog.subject = "";
	emailDialog.toRecipients = [args.user.email];
	emailDialog.messageBody = '';

	emailDialog.open();

}