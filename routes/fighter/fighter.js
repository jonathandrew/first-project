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
  console.log(fighter_id);
  res.render("fighters/mylist", { fighter, fighter_id });
});
router.post("/mylist", (req, res, next) => {
  const userList = new User();
  userList.fighter = req.body.favorite;
  userList.fighter_id = req.body.fighter_id;
  userList
    .save()
    .then(info => {
      console.log(info);
      res.redirect("/mylist/", { userlist });
    })
    .catch(err => {
      return res.status(500).json({ err: err });
    });
});

module.exports = router;
