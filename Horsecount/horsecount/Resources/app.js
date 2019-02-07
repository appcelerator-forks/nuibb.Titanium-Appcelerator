// This is a single context application with mutliple windows in a stack
(function() {
	//Database setup
	var isAndroid = Ti.Platform.osname === 'android';
	if (!isAndroid) {
		try {
			var db = Titanium.Database.open('Horsecount');
			db.file.setRemoteBackup(false);
		} catch(e) {
			alert('Database exception occured.');
		} finally {
			db.close();
		}
	}

	var windowStack = [];

	if (!Ti.App.Properties.getString('Token')) {
		var Login_Window = require('ui/handheld/login');
		var Window = new Login_Window(windowStack);
		windowStack.push(Window);
		Window.open();
	} else {
		var Window = require('ui/handheld/ApplicationWindow');
		var main_window = new Window(false, windowStack, false);
		windowStack.push(main_window);
		main_window.open();
	}
})();
