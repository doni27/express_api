var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const { Task } = require("../models");
const v = new Validator();

router.get("/", async (req, res) => {
	const task = await Task.findAll();
	return res.json(task);
});
router.get("/:id", async (req, res) => {
	const id = req.params.id;
	const task = await Task.findByPk(id);
	return res.json(task || {});
});
router.post("/", async (req, res) => {
	const schema = {
		id_user: "string",
		task: "string",
	};

	const validate = v.validate(req.body, schema);

	if (validate.length) {
		return res.status(400).json(validate);
	}
	const tasks = await Task.create(req.body);
	res.json(tasks);
	// res.send("ok");
});

router.put("/:id", async (req, res) => {
	const id = req.params.id;
	let tasks = await Task.findByPk(id);
	if (!tasks) {
		return res.json({ message: "task not found" });
	}

	const schema = {
		id_user: "string|optional",
		task: "string|optional",
	};

	const validate = v.validate(req.body, schema);

	if (validate.length) {
		return res.status(400).json(validate);
	}
	//res.send("ok");
	tasks = await tasks.update(req.body);
	res.json(tasks);
});

router.delete("/:id", async (req, res) => {
	const id = req.params.id;
	let tasks = await Task.findByPk(id);
	if (!tasks) {
		return res.json({ message: "tasks not found" });
	}
	await tasks.destroy();
	res.json({
		message: "tasks is deleted",
	});
});

module.exports = router;
