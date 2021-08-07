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

// controller for login
exports.login = function(req, res) {
	var post = {
		email: req.body.email,
		password: req.body.password
	};
	
	var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
	var table = ["users", "password", md5(post.password), "email", post.email];
	
	query = mysql.format(query, table);
	connection.query(query, function(error, rows){
		if(error) {
			console.log(error);
		}
		else {
			if(rows.length == 1) {
				var token = jwt.sign({rows}, config.secret, {
					expiresIn: 1440
				});
				
				user_id = rows[0].id;
				
				var data = {
					user_id: user_id,
					token: token,
					ip_address: ip.address()
				};
				
				var query = "INSERT INTO ?? SET ?";
				var table = ["access_token"];
				
				query = mysql.format(query, table);
				
				connection.query(query, data, function(error, rows) {
					if(error) {
						console.log(error);
					}
					else {
						res.json({
							success: true,
							message: "Token generated",
							token: token,
							user: data.user_id
						});
					}
				});
			}
			else {
				res.json({
					"error": true,
					"message": "Email or Password are invalid"
				});
			}
		}
	}); 
}