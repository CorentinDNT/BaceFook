const jwt = require("jsonwebtoken");

const maxAge = 24 * 60 * 60 * 1000;

exports.createToken = (id) => {
	return jwt.sign({ id }, process.env.TOKEN_SECRET, {
		expiresIn: maxAge,
	});
};
