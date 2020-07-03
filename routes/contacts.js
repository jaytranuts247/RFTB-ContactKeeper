const express = require("express");
const router = express.Router();

// @router    GET api/contacts
// @desc      get all user contacts
// @access	  Private
router.get("/", (req, res) => {
	res.send("get  all contacts ");
});

// @router    POST api/contacts
// @desc      add new contacts
// @access	  private
router.post("/", (req, res) => {
	res.send("Add contacts");
});

// @router    PUT api/contacts/:id
// @desc      update contacts
// @access	  private
router.put("/:id", (req, res) => {
	res.send("update contacts");
});

// @router    Delete api/contacts/:id
// @desc      Delete contacts
// @access	  private
router.delete("/:id", (req, res) => {
	res.send("Delete contacts");
});

module.exports = router;
