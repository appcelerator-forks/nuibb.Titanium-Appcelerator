Gallery_Assets = function() {
	return this;
};

Gallery_Assets.prototype.getGalleryAssetTemplate = function() {
	var plainTemplate = {
		childTemplates : [{
			type : 'Ti.UI.ImageView',
			bindId : 'pic',
			properties : {
				backgroundColor : 'silver',
				height : '60dp',
				width : '60dp',
				left : '2dp',
				top : '2dp'
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'name',
			properties : {
				color : '#000',
				height : Ti.UI.SIZE,
				width : '100dp',
				left : '75dp',
				font : {
					fontFamily : 'Arial',
					fontWeight : 'bold',
					fontSize : '16dp'
				}

			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'count',
			properties : {
				color : '#000',
				height : Ti.UI.SIZE,
				width : Ti.UI.SIZE,
				left : '180dp',
				font : {
					fontFamily : 'Arial',
					fontSize : '14dp'
				}
			}
		}],
		properties : {
			height : '65dp',
			backgroundColor : '#FFF'
		}
	};
	return plainTemplate;
};

Gallery_Assets.prototype.setGalleryAssetTemplate = function(items) {
	var sections = [];
	var i = 0;
	for (var key in items) {
		var obj = items[key];
		var section = Ti.UI.createListSection();
		section.setItems([{
			pic : {
				image : obj.image
			},
			name : {
				text : obj.name
			},
			count : {
				text : '( ' + obj.count + ' )'
			},
			properties : {
				itemId : Ti.Platform.osname === 'android' ? key : i,
				accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
			}
		}]);
		
		sections.push(section);
		i++;
	}
	return sections;
};

module.exports = Gallery_Assets;
