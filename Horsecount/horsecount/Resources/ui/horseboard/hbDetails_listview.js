function Details() {
	var plainTemplate1 = {
		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'tag_label',
			properties : {
				height : Ti.UI.SIZE,
				width : '35%',
				left : '5dp',
				font : {
					fontFamily : 'Arial',
					fontSize : '14dp',
					fontWeight : 'bold'
				}
			}
		},{
			type : 'Ti.UI.Label',
			bindId : 'tag_title',
			properties : {
				height : Ti.UI.SIZE,
				width : Ti.UI.FILL,
				left : '36%',
				font : {
					fontFamily : 'Arial',
					fontSize : '14dp',
					fontWeight : 'bold'
				}
			}
		}],
		properties : {
			height : '40dp',
			//selectedBackgroundColor: 'transparent',
			backgroundColor : '#FFF'
		}
	};

	var plainTemplate2 = {
		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'tag_label',
			properties : {
				height : Ti.UI.SIZE,
				width : '35%',
				left : '5dp',
				font : {
					fontFamily : 'Arial',
					fontSize : '14dp',
					fontWeight : 'bold'
				}
			}
		},{
			type : 'Ti.UI.Label',
			bindId : 'tag_title',
			properties : {
				height : Ti.UI.SIZE,
				width : Ti.UI.FILL,
				left : '36%',
				font : {
					fontFamily : 'Arial',
					fontSize : '14dp',
					fontWeight : 'bold'
				}
			}
		}],
		properties : {
			height : '40dp',
			//selectedBackgroundColor: 'transparent',
			backgroundColor : '#C7EAFB'
		}
	};

	var listView = Ti.UI.createListView({
		height : '40%',
		left : '5dp',
		right : '5dp',
		top : '0dp',
		templates : {
			'default' : plainTemplate1,
			'highlight' : plainTemplate2
		},
		defaultItemTemplate : 'default'
	});

	return listView;
}

module.exports = Details;
