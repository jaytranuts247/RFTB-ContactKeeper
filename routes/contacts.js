const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Contact = require("../models/Contact");

// @router    GET api/contacts
// @desc      get all user contacts
// @access	  Private
router.get("/", auth, async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({
			data: -1,
		}); // sort recent contact first

		res.json(contacts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @router    POST api/contacts
// @desc      add new contacts
// @access	  private
router.post(
	"/",
	[auth, [check("name", "Name is required").not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, phone, type } = req.body;

		try {
			const newContact = new Contact({
				name,
				email,
				phone,
				type,
				user: req.user.id,
			});

			const contact = await newContact.save();

			res.json(contact);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

// @router    PUT api/contacts/:id
// @desc      update contacts
// @access	  private
router.put("/:id", auth, async (req, res) => {
	const { name, email, phone, type } = req.body;

	// Builc Object contact
	const contactField = {};
	if (name) contactField.name = name;
	if (phone) contactField.phone = phone;
	if (email) contactField.email = email;
	if (type) contactField.type = type;

	try {
		let contact = await Contact.findById(req.params.id);
		if (!contact) return res.status(400).json({ msg: "Contact not found" });

		// Make sure user owns contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "Not authorized" });
		}

		contact = await Contact.findByIdAndUpdate(
			req.params.id,
			{ $set: contactField },
			{ new: true }
		);
		console.log("Contact is upadted");
		res.json(contact);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @router    Delete api/contacts/:id
// @desc      Delete contacts
// @access	  private
router.delete("/:id", auth, async (req, res) => {
	try {
		let contact = await Contact.findById(req.params.id);
		if (!contact) return res.status(400).json({ msg: "Contact not found" });

		// Make sure user owns contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "Not authorized" });
		}

		await Contact.findByIdAndRemove(req.params.id);
		res.json({ msg: "Contact remove " });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
