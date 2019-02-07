module.exports = function BtmToolabar(arrayToLoad, _toolViewHeight) {
	var isAndroid = Ti.Platform.osname === 'android';

	//handling gap of consecutive icons
	function countSpace(_count) {
		if (_count === 6) {
			return ['5%', '22%', '39%', '56%', '73%'];
		} else if (_count === 5) {
			return ['5%', '26%', '46%', '66%'];
		} else if (_count === 4) {
			
		} else if (_count === 3) {
			return ['5%', '45%'];
		}
	}

	var btmToolview = Ti.UI.createView({
		backgroundColor : '#C7EAFB',
		tintColor : '#27AAE1',
		bottom : '0dp',
		width : Ti.UI.FILL,
		height : _toolViewHeight
	});

	var arraySize = arrayToLoad.length;
	var space = countSpace(arraySize);
	for (var i = 0; i < arraySize - 1; i++) {
		arrayToLoad[i].left = space[i];
		btmToolview.add(arrayToLoad[i]);
	}

	arrayToLoad[arraySize - 1].right = space[0];
	btmToolview.add(arrayToLoad[arraySize - 1]);

	return btmToolview;
};
