function system_URL() {
	this.schema = 'http';

	//this.host = 'localhost:3000';
	//this.host = 'staging.horsecount.com';
	this.host = '178.62.193.6:85/';//'192.168.2.87:8000';

	//this.token = Ti.App.Properties.getString('Token');
	//this.current_user_data = Ti.App.Properties.getObject('Current_User_Data');
}

system_URL.prototype.getHostUrl = function() {
	return this.schema + '://' + this.host;
};

system_URL.prototype.getLoginUrl = function() {
	return this.schema + '://' + this.host + '/api/login/';
};

system_URL.prototype.getLogoutUrl = function() {
	return this.schema + '://' + this.host + '/api/logout/';
};

system_URL.prototype.getUserProjectList = function() {
	return this.schema + '://' + this.host + '/api/project_list/';
};

system_URL.prototype.getProjectDetailsUrl = function() {
	return this.schema + '://' + this.host + '/api/project_details/';
};

system_URL.prototype.updateProject = function() {
	return this.schema + '://' + this.host + '/api/project_update/';
};

system_URL.prototype.addNewProject = function() {
	return this.schema + '://' + this.host + '/api/project_assign/';
};

system_URL.prototype.getUserList = function() {
	return this.schema + '://' + this.host + '/api/user_list/';
};

system_URL.prototype.getProjectType = function() {
	return this.schema + '://' + this.host + '/api/project_type/';
};

system_URL.prototype.getProjectStatus = function() {
	return this.schema + '://' + this.host + '/api/add_project_status/';
};

system_URL.prototype.getNotificationStatus = function() {
	return this.schema + '://' + this.host + '/api/status_log/';
};

module.exports = system_URL;
