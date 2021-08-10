const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verification() {
	return function(req, res, next) {
		var roles = req.body.role_id;
		var tokenWithBearer = req.headers.authorization;
		if(tokenWithBearer) {
			var token = tokenWithBearer.split(' ')[1];
			// verification
			jwt.verify(token, config.secret, function(err, decoded) {
				if(err) {
					return res.status(401).send({
						auth: false,
						message: "Token invalid"
					});
				} else {
					if(roles == 1) {
						req.auth = decoded;
						next();
					}
					else {
						return res.status(401).send({
							auth: false,
							message: "Unauthorized roles"
						});
					}
				}
			});
		}
		else {
			return res.status(401).send({
				auth: false,
				message: "Token unavailable"
			});
		}
	}
}

module.exports = verification;