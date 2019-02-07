module.exports = function Upper_Array(_icon, _title, _rightIcon, _toolViewHeight) {
	var isAndroid = Ti.Platform.osname === 'android';

	var backBtnHolder = Titanium.UI.createView({
		height : isAndroid ? Ti.UI.FILL : '30dp',
		width : isAndroid ? '80dp' : '60dp',
		left : '0dp'
	});

	var backArrow = Titanium.UI.createImageView({
		image : isAndroid ? "/images/arrow.png" : "arrow@2x.png",
		height : '25dp',
		width : '25dp',
		left : '5dp'
	});

	backBtnHolder.add(backArrow);

	var middleView = Ti.UI.createView({
		layout : 'horizontal',
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE
	});

	var icon = Titanium.UI.createImageView({
		image : _icon,
		height : '20dp',
		width : '20dp'
	});

	var _label = Ti.UI.createLabel({
		color : '#27AAE1',
		text : _title,
		font : {
			fontFamily : 'Arial',
			fontWeight : 'bold',
			fontSize : '18dp'
		},
		left : '10dp',
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE
	});

	middleView.add(icon);
	middleView.add(_label);

	var nextBtnHolder = Titanium.UI.createView({
		height : isAndroid ? Ti.UI.FILL : '30dp',
		width : isAndroid ? '80dp' : '60dp',
		right : '0dp'
	});

	var nextArrow = Ti.UI.createImageView({
		image : _rightIcon,
		height : '25dp',
		width : '25dp',
		right : '10dp'
	});

	nextBtnHolder.add(nextArrow);
	
	var upperToolView = Ti.UI.createView({
		backgroundColor : '#C7EAFB',
		tintColor : '#27AAE1',
		top : '0dp',
		width : Ti.UI.FILL,
		height : _toolViewHeight
	});

	upperToolView.add(backBtnHolder);
	upperToolView.add(middleView);
	upperToolView.add(nextBtnHolder);

	return upperToolView;
};
