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
	connection.query('SELECT * FROM users WHERE ID = ?', [id],
	function(error, rows, fields){
		if(error) {
			console.log(error);
		}
		else {
			response.ok(rows, res);
		}
	});
};

// Post Data user
exports.setDataUser = function (req, res) {
	let username = req.body.username;
	let email = req.body.email;
	
	connection.query('INSERT INTO users (username, email) VALUES(?,?)', [username, email],
	function(error, rows, fields){
		if(error) {
			console.log(error);
		}
		else {
			response.ok('Data added successfully', res);
		}
	});
};

// Update data based on id
exports.updateDataUser = function (req, res) {
	let id = req.body.id;
	let username = req.body.username;
	let email = req.body.email;
	
	connection.query('UPDATE users SET username=?, email=? WHERE id=?', [username, email, id],
	function(error, rows, fields){
		if(error) {
			console.log(error);
		}
		else {
			response.ok('Data updated successfully', res);
		}
	});
};

// Delete data based on id
exports.deleteDataUser = function (req, res) {
	let id = req.body.id;
	
	connection.query('DELETE FROM users WHERE id=?', [id],
	function(error, rows, fields){
		if(error) {
			console.log(error);
		}
		else {
			response.ok('Data deleted successfully', res);
		}
	});
};

// Display nested json
exports.showNestedJson = function (req, res) {
	connection.query('SELECT students.id, students.name, students.matric_no, students.major, subjects.subject, subjects.credit FROM css JOIN students JOIN subjects WHERE students.id = css.student_id AND subjects.id = css.subject_id ORDER BY students.id',
		function (error, rows, fields) {
			if(error) {
				console.log(error);
			}
			else {
				response.nested(rows, res);
			}
		}
	);
};
