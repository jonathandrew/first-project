const express = require("express");
const router = express.Router();
const fighterController = require("./controller/fighterController");
// Make a request for a user with a given ID
const User = require("../user/models/User");

router.get("/single-fighter/:id", fighterController.fighters);

// router.get("/mylist", fighterController.mylist);

router.get("/mylist/:fighter/:fighter_id", (req, res, next) => {
  let fighter = req.params.fighter;
  let fighter_id = req.params.fighter_id;
  console.log(fighter);
  res.render("fighters/mylist", { fighter, fighter_id });
});
module.exports = router;
