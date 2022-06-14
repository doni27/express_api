var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const { User } = require("../models");
const { Task } = require("../models");
const v = new Validator();

router.get("/", async (req, res) => {
	const users = await User.findAll({
		attributes: ["email"],
		include: [
			{
				model: Task,
				as: "task",
			},
		],
	});
	return res.json(users);
});

module.exports = router;
