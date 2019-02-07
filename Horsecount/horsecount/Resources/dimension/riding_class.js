module.exports = function Dimensions() {
	var isAndroid = Ti.Platform.osname === 'android';
	this.labelHeight = '15%';
	if (isAndroid) {
		if (Titanium.Gesture.orientation == Ti.UI.PORTRAIT) {
			this.toolViewHeight = '10%';
			this.listViewHeight = '72%';
		} else if (Titanium.Gesture.orientation == Ti.UI.LANDSCAPE_LEFT || Titanium.Gesture.orientation == Ti.UI.LANDSCAPE_RIGHT) {
			this.toolViewHeight = '12%';
			this.listViewHeight = '70%';
		}
	} else {
		if (Ti.UI.orientation == Ti.UI.PORTRAIT) {
			this.toolViewHeight = '10%';
			this.listViewHeight = '72%';
		} else if (Ti.UI.orientation == Ti.UI.LANDSCAPE_LEFT || Ti.UI.orientation == Ti.UI.LANDSCAPE_RIGHT) {
			this.toolViewHeight = '12%';
			this.listViewHeight = '70%';
		}
	}
};
