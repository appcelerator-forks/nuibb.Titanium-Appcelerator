function Events() {
	var SystemUrl = require('ui/handheld/system_urls');
	this.system_url = new SystemUrl();
}

/*
 * Get Events Template
 */
Events.prototype.getEventsTemplate = function() {
	var plainTemplate = {
		childTemplates : [{
			type : 'Ti.UI.View',
			bindId : 'first_block',
			properties : {
				//backgroundColor : 'red',
				layout : 'vertical',
				top : '2dp',
				left : '5dp',
				height : Ti.UI.SIZE,
				width : Ti.UI.SIZE
			},
			childTemplates : [{
				type : 'Ti.UI.Label',
				bindId : 'date_start',
				properties : {
					color : '#000',
					left : '0dp',
					height : Ti.UI.SIZE,
					width : Ti.UI.SIZE,
					font : {
						fontFamily : 'Arial',
						fontWeight : 'bold',
						fontSize : '12dp'
					}
				}
			}, {
				type : 'Ti.UI.ImageView',
				bindId : 'pic',
				properties : {
					backgroundColor : 'silver',
					top : '2dp',
					height : '80dp',
					width : '80dp'
				}
			}]
		}, {
			type : 'Ti.UI.View',
			bindId : 'second_block',
			properties : {
				//backgroundColor : 'red',
				layout : 'vertical',
				top : '2dp',
				left : '96dp',
				height : Ti.UI.SIZE,
				width : Ti.UI.SIZE
			},
			childTemplates : [{
				type : 'Ti.UI.Label',
				bindId : 'time_start',
				properties : {
					color : '#000',
					left : '0dp',
					height : Ti.UI.SIZE,
					width : Ti.UI.FILL,
					font : {
						fontFamily : 'Arial',
						fontWeight : 'bold',
						fontSize : '12dp'
					}
				}
			}, {
				type : 'Ti.UI.Label',
				bindId : 'eventname',
				properties : {
					color : '#27AAE1',
					left : '0dp',
					height : Ti.UI.SIZE,
					width : Ti.UI.FILL,
					font : {
						fontFamily : 'Arial',
						fontWeight : 'bold',
						fontSize : '14dp'
					}
				}
			}, {
				type : 'Ti.UI.Label',
				bindId : 'location',
				properties : {
					color : '#000',
					left : '0dp',
					height : Ti.UI.SIZE,
					width : Ti.UI.FILL,
					font : {
						fontFamily : 'Arial',
						fontSize : '14dp'
					}
				}
			}, {
				type : 'Ti.UI.Label',
				bindId : 'details',
				properties : {
					color : '#000',
					left : '0dp',
					height : Ti.UI.SIZE,
					width : Ti.UI.FILL,
					font : {
						fontFamily : 'Arial',
						fontSize : '14dp'
					}
				}
			}, {
				type : 'Ti.UI.Label',
				bindId : 'time_end',
				properties : {
					color : '#000',
					left : '0dp',
					height : Ti.UI.SIZE,
					width : Ti.UI.FILL,
					font : {
						fontFamily : 'Arial',
						fontSize : '12dp'
					}
				}
			}]
		}],
		properties : {
			height : Ti.UI.SIZE,
			backgroundColor : '#FFF'
		}
	};
	return plainTemplate;
};

/*
 * Set data to Events Template
 */
Events.prototype.setDataToEventsTemplate = function(json) {
	var data = [];
	for (var i = 0,
	    j = json.length; i < j; i++) {
		data.push({
			template : 'events',

			date_start : {
				text : json[i].start_date
			},
			pic : {
				image : this.system_url.getHostUrl() + json[i].image_url
			},
			time_start : {
				text : json[i].start_time
			},
			eventname : {
				text : json[i].event_name
			},
			location : {
				text : json[i].location
			},
			details : {
				text : json[i].remarks
			},
			time_end : {
				text : 'End: ' + json[i].end_date + ' ' + json[i].end_time
			}
		});
	};

	var section = Ti.UI.createListSection({
		items : data
	});

	return section;
};

module.exports = Events;
