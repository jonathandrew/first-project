const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

module.exports = {
  register: (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return req.status(400).json({ errors: errors.array() });
    }
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.send("User already exists");
      } else {
        const newUser = new User();
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        newUser.username = req.body.username;
        newUser.email = req.body.email;
        newUser.password = hash;
        newUser
          .save()
          .then(user => {
            req.login(user, err => {
              // console.log("hello from line 26 in controller", err);
              if (err) {
                return res
                  .status(400)
                  .json({ confirmation: false, message: err });
              } else {
                return res.redirect("/");
              }
            });
          })
          .catch(err => {
            return next(err);
          });
      }
    });
  }
};
