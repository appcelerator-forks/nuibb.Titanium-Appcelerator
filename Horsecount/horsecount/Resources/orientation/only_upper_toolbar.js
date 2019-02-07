module.exports = function Orientation(btmToolView) {
	Ti.Gesture.addEventListener('orientationchange', function(e) {
		if (e.orientation == Ti.UI.LANDSCAPE_LEFT || e.orientation == Ti.UI.LANDSCAPE_RIGHT) {
			btmToolView.applyProperties({
				height : '12%'
			});	
		} else if (e.orientation == Ti.UI.PORTRAIT) {
			btmToolView.applyProperties({
				height : '10%'
			});
		}
	});
};
