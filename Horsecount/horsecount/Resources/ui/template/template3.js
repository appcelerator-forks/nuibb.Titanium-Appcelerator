function Template() {
	var plainTemplate = {

		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'one',
			properties : {
				top : '2dp',
				height : Ti.UI.SIZE,
				width : Ti.UI.FILL,
				left : '10dp',
				font : {
					fontFamily : 'Arial',
					fontSize : '14dp',
					fontWeight : 'bold'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'two',
			properties : {
				top : '22dp',
				height : Ti.UI.SIZE,
				width : Ti.UI.FILL,
				left : '10dp',
				font : {
					fontFamily : 'Arial',
					fontSize : '14dp'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'three',
			properties : {
				top : '42dp',
				height : Ti.UI.SIZE,
				width : Ti.UI.FILL,
				left : '10dp',
				font : {
					fontFamily : 'Arial',
					fontSize : '14dp'
				}
			}
		}],
		properties : {
			height : Ti.UI.SIZE,
			//selectedBackgroundColor: 'transparent',
			backgroundColor : '#FFF'
		}
	};

	return plainTemplate;
}

module.exports = Template;
