module.exports = function Login(imagePath) {
	var homeWindow = Titanium.UI.createWindow({
		backgroundGradient : {
			type : 'linear',
			startPoint : {
				x : '0%',
				y : '0%'
			},
			endPoint : {
				x : '0%',
				y : '100%'
			},
			colors : [{
				color : '#36A9E1',
				offset : 0.25
			}, {
				color : '#297DA4',
				offset : 0.5
			}],
		},

		fullscreen : true,
		exitOnClose : true
	});

	var actionBar;
	homeWindow.addEventListener("open", function(e) {
		actionBar = homeWindow.activity.actionBar;
		if (actionBar) {
			actionBar.icon = imagePath.title_horse;
			actionBar.title = "The Horse Management Network";
		}
	});
	
	homeWindow.orientationModes = [Titanium.UI.PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];

	return homeWindow;
};
