module.exports = function Dimensions() {
	if (Ti.Platform.osname === 'android') {
		if (Titanium.Gesture.orientation == Ti.UI.PORTRAIT) {
			this.toolViewHeight = '10%';
			this.listViewHeight = '88%';
		} else if (Titanium.Gesture.orientation == Ti.UI.LANDSCAPE_LEFT || Titanium.Gesture.orientation == Ti.UI.LANDSCAPE_RIGHT) {
			this.toolViewHeight = '12%';
			this.listViewHeight = '86%';
		}
	} else {
		if (Ti.UI.orientation == Ti.UI.PORTRAIT) {
			this.toolViewHeight = '10%';
			this.listViewHeight = '88%';
		} else if (Ti.UI.orientation == Ti.UI.LANDSCAPE_LEFT || Ti.UI.orientation == Ti.UI.LANDSCAPE_RIGHT) {
			this.toolViewHeight = '12%';
			this.listViewHeight = '86%';
		}
	}
};
