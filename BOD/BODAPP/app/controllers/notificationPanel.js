// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var data = [];

var Indicator = require('activityIndicator');
var activityIndicator = new Indicator();

var SystemUrl = require('system_urls');
var system_url = new SystemUrl();
$.win.add(activityIndicator);

var API_Call = require('apiCallWithIndicator');
new API_Call('POST', system_url.getNotificationStatus(), null, activityIndicator, function(json) {

	Ti.API.info(JSON.stringify(json));

	var data = [];

	var array = json.data;

	for (var i = 0,
	    j = array.length; i < j; i++) {
		
		var day, hour, min;
		
		var days = array[i].time.split(',');
		
		if(days.length === 1) {
			
			var hours = days[0].split(':');
			day = "";
			hour = hours[0];
			min = hours[1];
			
		} else if (days.length === 2) {
			
			day = days[0];
			
			var hours = days[1].split(':');
			hour = hours[0];
			min = hours[1];
			
		}

		var project = {

			title : {
				text : array[i].user_name
			},
			timeAgo : {
				text : day + " " + hour + " hours " + min + " minites" + " ago"
			},
			details : {
				text : "Approved " + array[i].project_name + " project"
			}
		};

		data.push(project);

	}

	$.elementsList.sections[0].setItems(data);
});

/*function clearBtnListener(e) {
	
	var data = [];
	$.elementsList.sections[0].setItems(data);

}*/

function crossBtnListener(e) {
	$.win.close();
}