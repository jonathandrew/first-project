const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");
const userValidation = require("./controllers/userValidation");
const passport = require("passport");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});
router.get("/register", (req, res) => {
  res.render("users/register", { errors: req.flash("errors") });
});

router.post("/register", userValidation, userController.register);

router.get("/login", (req, res) => {
  return res.render("users/login", { errors: req.flash("errors") });
});
router.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true
  })
);

router.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    return res.render("user/profile");
  } else {
    return res.send("no");
  }
});

router.put("/update-profile", (req, res, next) => {
  userController
    .updateProfile(req.body, req.user._id)
    .then(user => {
      return res.redirect("/users/profile");
    })
    .catch(err => {
      console.log(err);
      return res.redirect("/users/update-profile");
    });
});

router.get("/update-profile", (req, res) => {
  if (req.isAuthenticated()) {
    return res.render("/update-profile");
  }
  return res.redirect("/");
});
module.exports = router;
