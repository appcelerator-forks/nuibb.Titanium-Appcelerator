function Template() {
	var plainTemplate = {
		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'name',
			properties : {
				color : '#000',
				top : '2dp',
				height : '20dp',
				width : '233dp',
				left : '5dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold',
					fontSize : '14dp'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'horse',
			properties : {
				color : '#000',
				top : '22dp',
				height : '20dp',
				width : '233dp',
				left : '5dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold',
					fontSize : '14dp'
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'num',
			properties : {
				color : '#000',
				right : '52dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold',
					fontSize : '14dp'
				}
			}
		}, {
			type : 'Ti.UI.ImageView',
			bindId : 'pic',
			properties : {
				height : '25dp',
				width : '25dp',
				right : '22dp'
			}
		}, {
			type : 'Ti.UI.ImageView',
			bindId : 'arrow',
			properties : {
				height : '12dp',
				width : '12dp',
				right : '5dp'
			}
		}],
		properties : {
			height : '44dp',
			backgroundColor : '#FFF'
		}
	};

	return plainTemplate;
}

module.exports = Template;
