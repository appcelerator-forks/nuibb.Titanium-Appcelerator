function Header() {
	var headerBox = Titanium.UI.createImageView({
		image : '',
		left : '10dp',
		width : '14dp',
		height : '14dp'
	});

	var title = Titanium.UI.createLabel({
		text : '',
		color : '#FFF',
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : '14dp'
		},
		left : '30dp',
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL
	});

	var _view = Titanium.UI.createView({
		top : '0dp',
		left : '5dp',
		right : '5dp',
		height : '7%',
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
				color : '#1c75BC',
				offset : 0.75
			}]
		}
	});

	_view.add(headerBox);
	_view.add(title);

	return _view;

}

module.exports = Header;
