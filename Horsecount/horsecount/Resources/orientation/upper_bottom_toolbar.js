module.exports = function Orientation(upperToolView, btmToolView) {
	var isAndroid = Ti.Platform.osname === 'android';
	Ti.Gesture.addEventListener('orientationchange', function(e) {
		if (e.orientation == Ti.UI.LANDSCAPE_LEFT || e.orientation == Ti.UI.LANDSCAPE_RIGHT) {
			upperToolView.applyProperties({
				height : '12%'
			});

			btmToolView.applyProperties({
				height : '12%'
			});
		} else if (e.orientation == Ti.UI.PORTRAIT) {
			upperToolView.applyProperties({
				height : '10%'
			});

			btmToolView.applyProperties({
				height : '10%'
			});
		}
	});
};
