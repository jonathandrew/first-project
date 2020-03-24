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

module.exports = router;
