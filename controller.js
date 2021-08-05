'use-strict';

var response = require('./res');
var connection = require('./connection');


exports.index = function (req, res) {
	response.ok("Apps Run", res);
};

// Get All Data from Database
exports.getData = function (req, res) {
	connection.query('SELECT * FROM users', function(error, rows, fields){
		if(error) {
			console.log(error);
		}
		else {
			response.ok(rows, res);
		}
	});
};

// Get Data based on id from Database
exports.getDataUser = function (req, res) {
	let id = req.params.id;
	connection.query('SELECT * FROM users WHERE ID = ?', [id],function(error, rows, fields){
		if(error) {
			console.log(error);
		}
		else {
			response.ok(rows, res);
		}
	});
};
