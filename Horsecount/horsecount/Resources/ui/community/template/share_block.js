function Template(onClickListener) {
	var plainTemplate = {
		childTemplates : [{
			type : 'Ti.UI.View',
			bindId : 'header',
			properties : {
				layout : 'horizontal',
				top : '0dp',
				height : Ti.UI.SIZE,
				width : Ti.UI.FILL,
				left : '5dp'
			},
			childTemplates : [{
				type : 'Ti.UI.Label',
				bindId : 'post_owner',
				properties : {
					color : '#27AAE1',
					//top : '0dp',
					height : '20dp',
					width : Ti.UI.SIZE,
					font : {
						fontFamily : 'Arial',
						fontSize : '14dp'
					}
				},
				events : {
					click : onClickListener
				}
			}, {
				type : 'Ti.UI.Label',
				bindId : 'static_text',
				properties : {
					//top : '0dp',
					height : '20dp',
					width : Ti.UI.SIZE,
					font : {
						fontFamily : 'Arial',
						fontSize : '14dp'
					}
				}
			}, {
				type : 'Ti.UI.Label',
				bindId : 'shared_from',
				properties : {
					color : '#27AAE1',
					//top : '0dp',
					height : '20dp',
					width : Ti.UI.SIZE,
					font : {
						fontFamily : 'Arial',
						fontSize : '14dp'
					}
				},
				events : {
					click : onClickListener
				}
			}, {
				type : 'Ti.UI.Label',
				bindId : 'post_type',
				properties : {
					//top : '0dp',
					height : '20dp',
					width : Ti.UI.SIZE,
					font : {
						fontFamily : 'Arial',
						fontSize : '14dp'
					}
				}
			}]
		}],
		properties : {
			backgroundColor : '#FFF',
			height : Ti.UI.SIZE
		}
	};

	return plainTemplate;
}

module.exports = Template;
