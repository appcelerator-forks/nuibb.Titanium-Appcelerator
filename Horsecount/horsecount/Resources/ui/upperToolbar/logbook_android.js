function upperToolBar(editBtn, addBtn, toolviewHeight, closeWindow) {
	var imageHolder = Titanium.UI.createView({
		height : Ti.UI.FILL,
		width : '80dp',
		left : '0dp'
	});

	var navArrow = Titanium.UI.createImageView({
		image : "/images/arrow.png",
		height : '25dp',
		width : '25dp',
		left : '15dp'
	});

	imageHolder.addEventListener('touchend', function(e) {
		closeWindow();
	});

	imageHolder.add(navArrow);

	var icon = Titanium.UI.createImageView({
		image : "/images/logbook.png",
		height : '30dp',
		width : '30dp'
	});

	var middleView = Ti.UI.createView({
		layout : 'horizontal',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	middleView.add(icon);
	middleView.add(editBtn);
	middleView.add(addBtn);

	var toolview = Ti.UI.createView({
		top : '0dp',
		backgroundColor : '#C7EAFB',
		tintColor : '#27AAE1',
		width : '100%',
		height : toolviewHeight
	});

	toolview.add(imageHolder);
	toolview.add(middleView);

	return toolview;
}

module.exports = upperToolBar;