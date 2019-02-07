module.exports = function Orientation(toolview, btmToolview, listView) {
	Ti.Gesture.addEventListener('orientationchange', function(e) {
		if (e.orientation == Ti.UI.LANDSCAPE_LEFT || e.orientation == Ti.UI.LANDSCAPE_RIGHT) {
			toolview.applyProperties({
				height : '12%'
			});

			btmToolview.applyProperties({
				height : '12%'
			});
			
			listView.applyProperties({
				height : '65%'
			});
			
		} else if (e.orientation == Ti.UI.PORTRAIT) {
			toolview.applyProperties({
				height : '10%'
			});

			btmToolview.applyProperties({
				height : '10%'
			});
			
			listView.applyProperties({
				height : '71%'
			});
		}
	});
};
