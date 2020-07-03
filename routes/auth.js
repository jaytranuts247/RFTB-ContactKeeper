const express = require("express");
const router = express.Router();

// @router    GET api/auth
// @desc      get logged in user
// @access	  Pivate
router.get("/", (req, res) => {
	res.send("get logged in user ");
});

// @router    POST api/auth
// @desc      Auth user and get token
// @access	  public
router.post("/", (req, res) => {
	res.send("log in user ");
});

module.exports = router;
