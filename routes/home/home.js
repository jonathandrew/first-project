const express = require("express");
const router = express.Router();
const homeController = require("./controllers/homeController");
// Make a request for a user with a given ID

router.get("/", homeController.rankings);

module.exports = router;
