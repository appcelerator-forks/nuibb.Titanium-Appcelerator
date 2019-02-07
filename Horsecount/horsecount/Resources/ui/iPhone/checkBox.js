function createCheckbox(_width, _height, _borderRadius, _border, _left) {

	var view = Titanium.UI.createView({
		backgroundColor : '#fff',
		width : _width,
		height : _height,
		left: _left,
		borderRadius : _borderRadius,
		border : _border,
		borderColor : "silver"
	});

	var imageView = Titanium.UI.createImageView({
		image : Ti.Filesystem.resourcesDirectory + "Tick@2x.png",
		width: view.width,
		height : view.height,
		opacity : 0
	});

	view.add(imageView);

	function togglecheck() {
		if (!view.checked) {
			view.checked = true;
			imageView.opacity = 1;

		} else {
			view.checked = false;
			imageView.opacity = 0;
		}
	}

	view.addEventListener("click", togglecheck);

	return view;
}

module.exports = createCheckbox;
