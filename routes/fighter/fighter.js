const express = require("express");
const router = express.Router();
const fighterController = require("./controller/fighterController");
// Make a request for a user with a given ID

router.get("/", (req, res, next) => {
  res.render("fighters/fighters");
});

module.exports = router;
