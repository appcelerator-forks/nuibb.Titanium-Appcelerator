function Template() {
	var plainTemplate = {
		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'one',
			properties : {
				color : '#000',
				left : '5dp',
				top : '2dp',
				height : Ti.UI.SIZE,
				width : Ti.UI.SIZE,
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold',
					fontSize : '17dp'
				}
			}
		}, {
			type : 'Ti.UI.View',
			bindId : 'parent_view',
			properties : {
				layout : 'vertical',
				left : '65dp',
				top : '2dp',
				width : Ti.UI.SIZE,
				height : Ti.UI.SIZE
			},
			childTemplates : [{
				type : 'Ti.UI.Label',
				bindId : 'two',
				properties : {
					color : '#000',
					left : '0dp',
					height : Ti.UI.SIZE,
					width : Ti.UI.SIZE,
					font : {
						fontFamily : 'Arial',
						fontWeight : 'bold',
						fontSize : '17dp'
					}
				}
			}, {
				type : 'Ti.UI.Label',
				bindId : 'three',
				properties : {
					color : '#000',
					left : '0dp',
					height : Ti.UI.SIZE,
					width : Ti.UI.SIZE,
					font : {
						fontFamily : 'Arial',
						fontSize : '14dp'
					}
				}
			}, {
				type : 'Ti.UI.Label',
				bindId : 'four',
				properties : {
					color : '#000',
					left : '0dp',
					height : Ti.UI.SIZE,
					width : Ti.UI.SIZE,
					font : {
						fontFamily : 'Arial',
						fontSize : '14dp'
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
}

module.exports = Template;
