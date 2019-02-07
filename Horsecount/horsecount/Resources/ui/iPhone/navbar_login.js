module.exports = function Navbar(imagePath) {
	var navImage = Ti.UI.createImageView({
		image : imagePath.title_horse,
		width : '70dp',
		height : '25dp'
	});

	var navLabel = Titanium.UI.createLabel({
		color : '#FFF',
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		top : '15dp',
		text : 'The Horse Management Network',
		textAlign : 'center',
		font : {
			fontFamily : 'Trebuchet MS',
			fontWeight : 'bold',
			fontSize : '14dp'
		}
	});

	var homeWindow = Titanium.UI.createWindow({
		barColor:'#000',
		leftNavButton : navImage,
		titleControl : navLabel,
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
			}]
		},
		statusBarStyle : Titanium.UI.iPhone.StatusBar.DEFAULT
	});
	
	homeWindow.orientationModes = [Titanium.UI.PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];

	return homeWindow;
}; 