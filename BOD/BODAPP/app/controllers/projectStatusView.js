// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = arguments[0] || {};
var selectedProjectStatus = args.status;

$.pendingBtn.backgroundImage = (selectedProjectStatus === 0) ? "/images/tick_focus.png" : "/images/tick_blur.png";
$.ongoingBtn.backgroundImage = (selectedProjectStatus == 1) ? "/images/tick_focus.png" : "/images/tick_blur.png";
$.rejectedBtn.backgroundImage = (selectedProjectStatus == 2) ? "/images/tick_focus.png" : "/images/tick_blur.png";
$.allBtn.backgroundImage = (selectedProjectStatus == 3) ? "/images/tick_focus.png" : "/images/tick_blur.png";

$.pendingHolder.addEventListener('click', function(e) {

	args.callback(0);
	$.trigger('close');

});

$.ongoingHolder.addEventListener('click', function(e) {

	args.callback(1);
	$.trigger('close');

});

$.rejectedHolder.addEventListener('click', function(e) {

	args.callback(2);
	$.trigger('close');

});

$.allHolder.addEventListener('click', function(e) {

	args.callback(3);
	$.trigger('close');

});
