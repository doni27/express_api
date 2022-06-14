var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const { User } = require("../models");
const { Task } = require("../models");
const v = new Validator();

router.get("/", async (req, res) => {
	const users = await User.findAll({});
	return res.json(users);
});
router.get("/:id", async (req, res) => {
	const id = req.params.id;
	const users = await User.findByPk(id);
	return res.json(users || {});
});
router.post("/", async (req, res) => {
	const schema = {
		name: "string",
		email: "string",
	};
	const validate = v.validate(req.body, schema);
	if (validate.length) {
		return res.status(400).json(validate);
	}
	const user = await User.create(req.body);
	res.json(user);
});

router.put("/:id", async (req, res) => {
	const id = req.params.id;
	let user = await User.findByPk(id);
	if (!user) {
		return res.json({ message: "user not found" });
	}

	const schema = {
		name: "string|optional",
		email: "string|optional",
	};

	const validate = v.validate(req.body, schema);

	if (validate.length) {
		return res.status(400).json(validate);
	}
	//res.send("ok");
	user = await user.update(req.body);
	res.json(user);
});

router.delete("/:id", async (req, res) => {
	const id = req.params.id;
	let user = await User.findByPk(id);
	if (!user) {
		return res.json({ message: "user not found" });
	}
	await user.destroy();
	res.json({
		message: "user is deleted",
	});
});

module.exports = router;
