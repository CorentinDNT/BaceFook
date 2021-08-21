const UserModel = require("../models/user.model");
const jwt = require("../middlewares/jwt.utils");
const { signUpErrors, signInErrors } = require("../utils/error.utils");

const maxAge = 24 * 60 * 60 * 1000;

exports.signUp = async (req, res) => {
	//Déstrucuration pour eviter de répéter
	//const argument = req.body.argument
	const { pseudo, email, password } = req.body;

	try {
		const user = await UserModel.create({ pseudo, email, password });
		res.status(201).json({ user: user._id });
	} catch (err) {
		const errors = signUpErrors(err);
		return res.status(500).json({ errors });
	}
};
exports.signIn = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await UserModel.login(email, password);
		const token = jwt.createToken(user._id);
		res.cookie("jwt", token, { httpOnly: true, maxAge });
		res.status(200).json({ user: user._id });
	} catch (err) {
		const errors = signInErrors(err);
		res.status(500).json({ errors });
	}
};

exports.logout = (req, res) => {
	res.cookie("jwt", "", { maxAge: 1 });
	res.redirect("/");
};
