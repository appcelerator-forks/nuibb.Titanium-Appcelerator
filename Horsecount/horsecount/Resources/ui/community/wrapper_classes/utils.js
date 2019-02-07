function Utilities() {
}

Utilities.prototype.getCurrentDateTime = function() {
	var currentTime = new Date();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	var seconds = currentTime.getSeconds();
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();

	// return hours + ":" + minutes + ":" + seconds + " - " + day + "/" + month + "/" + year;
	return hours + "_" + minutes + "_" + seconds + "_" + day + "_" + month + "_" + year;
};
/*
 * The following code is to show hintText for TextArea in iOS.
 */
Utilities.prototype.getHintForTextAreaiOS = function(_hintText, _textArea) {

	_textArea.value = _hintText;
	_textArea._hintText = _textArea.value;

	_textArea.addEventListener('focus', function(e) {
		if (e.source.value == e.source._hintText) {
			e.source.value = "";
		}
	});
	_textArea.addEventListener('blur', function(e) {
		if (e.source.value == "") {
			e.source.value = e.source._hintText;
		}
	});
};

module.exports = Utilities;
