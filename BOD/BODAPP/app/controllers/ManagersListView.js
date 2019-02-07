// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = arguments[0] || {};

var userInfo = Ti.App.Properties.getObject('Current_User_Data');

$.headerLabel.text = (userInfo.user_type === 1) ? "Manager's List" : "Director's List";

var Indicator = require('activityIndicator');
var activityIndicator = new Indicator();

var SystemUrl = require('system_urls');
var system_url = new SystemUrl();

var API_Call = require('apiCallWithIndicator');
new API_Call('POST', system_url.getUserList(), null, activityIndicator, function(json) {

	var userList = (userInfo.user_type !== 1) ? json.director_list : json.manager_list;
	var arraySize = userList.length;
	var data = [];

	for (var i = 0; i < arraySize; i++) {

		data.push({
			userId : userList[i].id,
			profileImage : {
				image : userList[i].photo
			},
			name : {
				text : userList[i].first_name + " " + userList[i].last_name
			}
		});
	}

	$.elementsList.sections[0].setItems(data);
});

function cancelBtnListener(e) {

	$.trigger('close');

}

function itemClick(e) {
	// Get the section of the clicked item
	var section = $.elementsList.sections[e.sectionIndex];
	// Get the clicked item from that section
	var item = section.getItemAt(e.itemIndex);
	args.callback(item, args.identifier);
	$.trigger('close');
}