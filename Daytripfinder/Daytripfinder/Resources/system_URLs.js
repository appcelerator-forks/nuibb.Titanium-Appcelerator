function system_URL() {
	
	this.schema = 'http';
	this.host =  'www.daytripfinder.co.uk'; //'localhost:3000';
	this.login_uri = '/users/sign_in.json';
}

system_URL.prototype.getBaseUrl = function() {
	return this.schema + '://' + this.host;
};

system_URL.prototype.getLatitude_url = function() {
	return this.schema + '://' + this.host + '/offers/filters/location/latitude/longitude';
};

system_URL.prototype.getLatAndLong = function() {
	return this.schema + '://' + this.host + '/offers/filters/location';
};

/*system_URL.prototype.getId_url = function(_value, _id) {
	return this.schema + '://' + this.host + _value + '/' + _id +'.json?auth_token=' + this.token;
};

system_URL.prototype.getHealth_url = function() {
	return this.schema + '://' + this.host + '/health_and_cares/view_chronological.json?auth_token=' + this.token;
};*/

//http://localhost:3000/care_and_feeds/view_chronological.json?auth_token=xKUHV3VdYt6aCfeup752

module.exports = system_URL;
