function ApplicationWindow(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});
	
	var button = Ti.UI.createButton({
		height:44,
		width:200,
		title:L('openWindow'),
		top:20
	});
	self.add(button);
	
	button.addEventListener('click', function() {
		//containingTab attribute must be set by parent tab group on
		//the window for this work
		var win = Ti.UI.createWindow({
			title: L('newWindow'),
			backgroundColor: 'white'
		});
		
		win.open();
	});
	
	return self;
};

module.exports = ApplicationWindow;
