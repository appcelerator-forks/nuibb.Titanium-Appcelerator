function Navbar(_title, _layout) {
	var win = Ti.UI.createWindow({
		backgroundColor : '#36A9E1',
		barColor : '#66B2FF',
		layout : _layout,
		fullscreen : true
	});

	var actionBar;
	win.addEventListener("open", function(e) {
		actionBar = win.activity.actionBar;
		if (actionBar) {
			actionBar.icon = "/images/TitleHorse.png";
			actionBar.title = "";
		}

		win.activity.onCreateOptionsMenu = function(e) {
			var menu = e.menu;
			var homeMenu = menu.add({
				icon : "/images/Home.png",
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
			});

			homeMenu.addEventListener("click", function(e) {
				Ti.App.fireEvent('BackToMain');
			});

			var logoutMenu = menu.add({
				icon : "/images/Logout.png",
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
			});

			logoutMenu.addEventListener("click", function(e) {
				Ti.App.Properties.removeProperty('Token');
				Ti.App.fireEvent('backtoRoot');
			});
		};
	});

	win.orientationModes = [Titanium.UI.PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];

	return win;
}

module.exports = Navbar;
