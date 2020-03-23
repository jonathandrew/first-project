const express = require("express");
const router = express.Router();
const fighterController = require("./controller/fighterController");
// Make a request for a user with a given ID

router.get("/:id", fighterController.fighters);

router.post("/", (req, res, next) => {});
module.exports = router;
