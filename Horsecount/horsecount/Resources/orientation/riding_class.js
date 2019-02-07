module.exports = function Orientation(toolView, listView) {
	Ti.Gesture.addEventListener('orientationchange', function(e) {
		if (e.orientation == Ti.UI.LANDSCAPE_LEFT || e.orientation == Ti.UI.LANDSCAPE_RIGHT) {
			toolView.applyProperties({
				height : '12%'
			});

			listView.applyProperties({
				height : '70%'
			});

		} else if (e.orientation == Ti.UI.PORTRAIT) {
			toolView.applyProperties({
				height : '10%'
			});

			listView.applyProperties({
				height : '72%'
			});
		}
	});
};
