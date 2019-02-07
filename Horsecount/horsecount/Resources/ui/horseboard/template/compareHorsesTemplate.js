function Template(argument) {
	var plainTemplate = {

		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'a',
			properties : {
				backgroundColor : '#C7EAFB',
				top : '0dp',
				height : '20dp',
				width : Ti.UI.FILL,
				left : '10dp',
				font : {
					fontFamily : 'Arial',
					fontSize : '14dp'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'b',
			properties : {
				height : '20dp',
				width : Ti.UI.FILL,
				left : '10dp',
				top : '20dp',
				font : {
					fontFamily : 'Arial',
					fontSize : '14dp'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'c',
			properties : {
				backgroundColor : '#C7EAFB',
				height : '20dp',
				width : Ti.UI.FILL,
				left : '10dp',
				top : '40dp',
				font : {
					fontFamily : 'Arial',
					fontSize : '14dp'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'd',
			properties : {
				height : '20dp',
				width : Ti.UI.FILL,
				left : '10dp',
				top : '60dp',
				font : {
					fontFamily : 'Arial',
					fontSize : '14dp'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'e',
			properties : {
				backgroundColor : '#C7EAFB',
				height : '20dp',
				width : Ti.UI.FILL,
				left : '10dp',
				top : '80dp',
				font : {
					fontFamily : 'Arial',
					fontSize : '14dp'
				}
			}
		}],
		
		properties : {
			height : '101dp',
			backgroundColor : '#FFF'
		}
	};
	
	return plainTemplate;
}

module.exports = Template; 