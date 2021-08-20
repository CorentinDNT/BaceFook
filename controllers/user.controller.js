const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

exports.getAllUsers = async (req, res) => {
	const users = await UserModel.find().select("-password");
	res.status(201).json(users);
};

exports.getUser = async (req, res) => {
	if (!ObjectID.isValid(req.params.id))
		return res.status(400).send("ID unknow : " + req.params.id);

	UserModel.findById(req.params.id, (err, docs) => {
		if (!err) res.send(docs);
		else console.log("ID unknow : " + e);
	}).select("-password");
};

exports.update = async (req, res) => {
	if (!ObjectID.isValid(req.params.id))
		return res.status(400).send("ID unknow : " + req.params.id);

	try {
		await UserModel.findOneAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					bio: req.body.bio,
				},
			},
			{ new: true, upset: true, setDefaultsOnInsert: true },
			(err, docs) => {
				if (!err) return res.send(docs);
				if (err) return res.status(500).send({ message: err });
			}
		);
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};

exports.delete = async (req, res) => {
	if (!ObjectID.isValid(req.params.id))
		return res.status(400).send("ID unknow : " + req.params.id);

	try {
		await UserModel.findOneAndDelete({ _id: req.params.id });
		res.status(200).json({
			message: "uttilisateur supprimé avec succès",
		});
	} catch (err) {
		return res.status(500).json({ err });
	}
};

exports.follow = async (req, res) => {
	if (
		!ObjectID.isValid(req.params.id) ||
		!ObjectID.isValid(req.body.idToFollow)
	)
		return res.status(400).send("ID unknow : " + req.params.id);

	try {
		//add to the followers list
		await UserModel.findByIdAndUpdate(
			req.params.id,
			{
				$addToSet: { following: req.body.idToFollow },
			},
			{ new: true, upset: true },
			(err, docs) => {
				if (!err) res.status(201).json(docs);
				else return res.status(500).json(err);
			}
		);

		//add to following lsit
		await UserModel.findByIdAndUpdate(
			req.body.idToFollow,
			{
				$addToSet: { followers: req.params.id },
			},
			{ new: true, upset: true },
			(err, docs) => {
				if (err) return res.status(400).json({ err });
			}
		);
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};

exports.unfollow = async (req, res) => {
	if (
		!ObjectID.isValid(req.params.id) ||
		!ObjectID.isValid(req.body.idToUnfollow)
	)
		return res.status(400).send("ID unknow : " + req.params.id);

	try {
		//remove to the followers list
		await UserModel.findByIdAndUpdate(
			req.params.id,
			{
				$pull: { following: req.body.idToUnollow },
			},
			{ new: true, upset: true },
			(err, docs) => {
				if (!err) res.status(201).json(docs);
				else return res.status(500).json(err);
			}
		);

		//remove to following lsit
		await UserModel.findByIdAndUpdate(
			req.body.idToUnfollow,
			{
				$pull: { followers: req.params.id },
			},
			{ new: true, upset: true },
			(err, docs) => {
				if (err) return res.status(400).json({ err });
			}
		);
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};
