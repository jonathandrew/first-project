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
  for (let i = 0; i < user.favorite.length; i++) {
    const element = user.favorite[i];
    if (element.fighter_id === fighter_id) {
      return res.redirect("/");
    }
  }
  user.favorite.push({
    fighter: fighter,
    fighter_id: fighter_id
  });
  user.save().then(info => {
    let list = info.favorite;
    // console.log(" mvkldfnsjkv djknbd", info.favorite);

    // for (let i = 0; i < list.length; i++) {
    //   for (j = i + 1; j < list.length; j++) {
    //     if (list[i] === list[j]) {
    //       console.log("mosmodmodod", list[j]);
    //       // const fighter = list[i].fighter;
    //     } else {
    //     }
    //   }
    // console.log("mnmnmnmnmnmnmn", list[i].fighter);

    // const words = list.filter((fighters, index) => {
    // return list.indexOf(fighters) === index;

    // console.log(fighters.fighter, index);
    // });
    // console.log(words);
    // console.log(result)
    // const list = info.push(info.favorite[i].fighter);
    // console.log("kdsjnvjkdsnvjks", list);
    // }
    // info.forEach(fighter => {
    // console.lof(fighter.favorite.fighter)
    // });
    // const list = [];
    // list.push(info.favorite[0].fighter);
    // console.log("dsm dnmv cjhkg mn vh", list);
    res.redirect("/fighters/mylist");
  });
});
router.get("/mylist", (req, res, next) => {
  if (req.user) {
    const username = req.user.username;
    const user = req.user.favorite;
    // user.filter((value, index, array) => {
    // array[0];
    // })
    res.render("fighters/mylist", { user, username });
  } else {
    res.redirect("/users/register/");
  }
});

module.exports = router;
