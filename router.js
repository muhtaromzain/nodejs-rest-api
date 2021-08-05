'use-strict';

module.exports = function(app) {
	var json = require('./controller');
	
	app.route('/').get(json.index);
	
	app.route('/get').get(json.getData);
	
	app.route('/get/:id').get(json.getDataUser);
};