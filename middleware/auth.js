var connection = require('../connection');
var mysql = require('mysql');
var md5 = require('MD5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

// controller for registration
exports.registration = function(req, res) {
	var post = {
		username: req.body.username,
		email: req.body.email,
		password: md5(req.body.password),
		role_id: req.body.role_id,
		created_at: new Date()
	};
	
	var query = "SELECT email FROM ?? WHERE ??=?";
	var table = ["users", "email", post.email];
	
	query = mysql.format(query, table);
	
	connection.query(query, function(error, rows){
		if(error) {
			console.log(error);
		}
		else {
			if(rows.length == 0) {
				var query = "INSERT INTO ?? SET ?";
				var table = ["users"];
				query = mysql.format(query, table);
				connection.query(query, post, function(error, rows) {
					if(error) {
						console.log(error);
					}
					else {
						response.ok("Registered succefully", res);
					}
				});
			}
			else {
				response.ok("Email already registered!", res);
			}
		}
	});
};