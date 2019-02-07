function createCheckbox(_align, _tickPath) {
	var imageView = Titanium.UI.createImageView({
		type : _align,
		checked : false,
		image : '',
		bottom : '5dp',
		width : '25dp',
		height : '25dp',
		borderRadius : 5,
		border : '3dp',
		borderColor : "silver"
	});

	if (_align === 'left') {
		imageView.setLeft('80dp');
	} else {
		imageView.setRight('10dp');
	}

	return imageView;
}

module.exports = createCheckbox;
