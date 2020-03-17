const express = require("express");
const router = express.Router();
const fetch = require("fetch");

/* GET home page. */

router.get("/", function(req, res, next) {
  res.render("home");
});
router.get("/login", (req, res) => {});

module.exports = router;
