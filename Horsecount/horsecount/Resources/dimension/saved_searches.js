module.exports = function Dimensions() {
	if (Ti.Platform.osname === 'android') {
		if (Titanium.Gesture.orientation == Ti.UI.PORTRAIT) {
			this.toolViewHeight = '10%';
			this.listViewTop = '11%';
			this.listViewHeight = '71%';
		} else if (Titanium.Gesture.orientation == Ti.UI.LANDSCAPE_LEFT || Titanium.Gesture.orientation == Ti.UI.LANDSCAPE_RIGHT) {
			this.toolViewHeight = '12%';
			this.listViewTop = '13%';
			this.listViewHeight = '65%';
		}
	} else {
		if (Ti.UI.orientation == Ti.UI.PORTRAIT) {
			this.toolViewHeight = '10%';
			this.listViewTop = '11%';
			this.listViewHeight = '71%';
		} else if (Ti.UI.orientation == Ti.UI.LANDSCAPE_LEFT || Ti.UI.orientation == Ti.UI.LANDSCAPE_RIGHT) {
			this.toolViewHeight = '12%';
			this.listViewTop = '13%';
			this.listViewHeight = '65%';
		}
	}
};
