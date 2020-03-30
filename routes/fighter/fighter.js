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
  const user = req.user;
  user.favorite.push({
    fighter: fighter,
    fighter_id: fighter_id
  });
  user.save().then(info => {
    console.log("dsm dnmv cjhkg mn vh", info);
    res.redirect("/fighters/mylist");
  });
});
router.get("/mylist", (req, res, next) => {
  if (req.user) {
    const user = req.user.favorite;
    user.filter((value, index, array) => {
      array[0];
    });
    res.render("fighters/mylist", { user });
  } else {
    res.redirect("/users/register/");
  }
});
module.exports = router;
