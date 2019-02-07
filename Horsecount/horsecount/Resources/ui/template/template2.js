function Template() {
	var plainTemplate = {

		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'one',
			properties : {
				color : '#000',
				top : '3dp',
				height : Ti.UI.SIZE,
				width : Ti.UI.FILL,
				left : '10dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold',
					fontSize : '15dp'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'two',
			properties : {
				color : '#C0C0C0',
				top : '26dp',
				height : Ti.UI.SIZE,
				width : Ti.UI.FILL,
				left : '10dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold',
					fontSize : '13dp'
				}
			}
		}],
		properties : {
			height : Ti.UI.SIZE,
			backgroundColor : '#FFF'
		}
	};
	
	return plainTemplate;
}

module.exports = Template;
