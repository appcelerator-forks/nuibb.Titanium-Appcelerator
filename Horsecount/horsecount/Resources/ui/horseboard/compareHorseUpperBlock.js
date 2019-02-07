function UpperBlock() {
	var holderView = Ti.UI.createScrollView({
		backgroundColor : '#FFF',
		layout : 'vertical',
		top : '0dp',
		left : '5dp',
		right : '5dp',
		height : '30%',
		contentWidth : Ti.UI.SIZE,
		contentHeight : Ti.UI.SIZE
	});

	var label1 = Ti.UI.createLabel({
		backgroundColor : '#C7EAFB',
		text : '',
		height : '20dp',
		width : Ti.UI.FILL,
		left : '10dp',
		font : {
			fontFamily : 'Arial',
			fontSize : '14dp'
		}
	});

	var label2 = Ti.UI.createLabel({
		text : '',
		height : '20dp',
		width : Ti.UI.FILL,
		left : '10dp',
		font : {
			fontFamily : 'Arial',
			fontSize : '14dp'
		}
	});

	var label3 = Ti.UI.createLabel({
		backgroundColor : '#C7EAFB',
		text : '',
		height : '20dp',
		width : Ti.UI.FILL,
		left : '10dp',
		font : {
			fontFamily : 'Arial',
			fontSize : '14dp'
		}
	});

	var label4 = Ti.UI.createLabel({
		text : '',
		height : '20dp',
		width : Ti.UI.FILL,
		left : '10dp',
		font : {
			fontFamily : 'Arial',
			fontSize : '14dp'
		}
	});

	var label5 = Ti.UI.createLabel({
		backgroundColor : '#C7EAFB',
		text : '',
		height : '20dp',
		width : Ti.UI.FILL,
		left : '10dp',
		font : {
			fontFamily : 'Arial',
			fontSize : '14dp'
		}
	});

	function compareSectionHeader(_title) {
		var _view = Titanium.UI.createView({
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE,
			backgroundGradient : {
				type : 'linear',
				startPoint : {
					x : '0%',
					y : '0%'
				},
				endPoint : {
					x : '0%',
					y : '100%'
				},
				colors : [{
					color : '#27AAE1',
					offset : 0.00
				}, {
					color : '#1c75BC ',
					offset : 0.75
				}]
			}
		});

		var title = Titanium.UI.createLabel({
			text : _title,
			color : '#FFF',
			font : {
				fontFamily : 'Arial',
				fontWeight : 'bold',
				fontSize : '15dp'
			},
			left : '10dp',
			height : '25dp',
			width : Ti.UI.SIZE
		});

		_view.add(title);

		return _view;
	}


	holderView.add(compareSectionHeader('Horse Name'));
	holderView.add(label1);
	holderView.add(label2);
	holderView.add(label3);
	holderView.add(label4);
	holderView.add(label5);

	return holderView;
}

module.exports = UpperBlock;
