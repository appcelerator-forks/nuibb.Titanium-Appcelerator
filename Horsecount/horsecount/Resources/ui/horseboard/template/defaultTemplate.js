function Template() {
	var plainTemplate = {

		childTemplates : [{
			type : 'Ti.UI.ImageView',
			bindId : 'pic',
			properties : {
				backgroundColor : 'silver',
				height : '80dp',
				width : '110dp',
				left : '5dp',
				top : '4dp'
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'breed',
			properties : {
				backgroundColor : '#C7EAFB',
				top : '0dp',
				height : '20dp',
				width : Ti.UI.FILL,
				left : '120dp',
				font : {
					fontFamily : 'Arial',
					fontSize : '14dp'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'date',
			properties : {
				height : '20dp',
				width : Ti.UI.FILL,
				left : '120dp',
				top : '20dp',
				font : {
					fontFamily : 'Arial',
					fontSize : '14dp'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'type',
			properties : {
				backgroundColor : '#C7EAFB',
				height : '20dp',
				width : Ti.UI.FILL,
				left : '120dp',
				top : '40dp',
				font : {
					fontFamily : 'Arial',
					fontSize : '14dp'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'Size',
			properties : {
				height : '20dp',
				width : Ti.UI.FILL,
				left : '120dp',
				top : '60dp',
				font : {
					fontFamily : 'Arial',
					fontSize : '14dp'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'Color',
			properties : {
				backgroundColor : '#C7EAFB',
				height : '20dp',
				width : Ti.UI.FILL,
				left : '120dp',
				top : '80dp',
				font : {
					fontFamily : 'Arial',
					fontSize : '14dp'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'country',
			properties : {
				height : '20dp',
				width : Ti.UI.FILL,
				left : '120dp',
				top : '100dp',
				font : {
					fontFamily : 'Arial',
					fontSize : '14dp'
				}
			}
		}],
		properties : {
			height : '121dp',
			//selectedBackgroundColor: 'transparent',
			backgroundColor : '#FFF'
		}
	};
	return plainTemplate;
}

module.exports = Template; 