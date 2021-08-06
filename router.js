'use-strict';

module.exports = function(app) {
	var json = require('./controller');
	
	app.route('/').get(json.index);
	
	app.route('/get').get(json.getData);
	
	app.route('/get/:id').get(json.getDataUser);
	
	app.route('/add').post(json.setDataUser);
	
	app.route('/update').put(json.updateDataUser);
	
	app.route('/delete').delete(json.deleteDataUser);
	
	app.route('/showAll').get(json.showNestedJson);
};