const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);
const passport = require("passport");
const flash = require("connect-flash");
const methodOverride = require("method-override");

const logger = require("morgan");
const mongoose = require("mongoose");

require("dotenv").config();

const homeRouter = require("./routes/home/home");
const usersRouter = require("./routes/user/users");
const fighterRouter = require("./routes/fighter/fighter");
const secondHomeRouter = require("./routes/secondHome/secondHome");

const app = express();

// view engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(flash());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => {
    console.log(`Mongo Error: ${err}`);
  });

app.use(passport.initialize());
app.use(passport.session());
require("./routes/user/controllers/passport")(passport);

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new mongoStore({
      url: process.env.MONGODB_URI,
      autoReconnect: true,
      cookie: { maxAge: 6000 }
    })
  })
);

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.errors = req.flash("error");
  res.locals.message = req.flash("message");
  res.locals.success = req.flash("success");

  next();
});

app.use("/", homeRouter);
app.use("/users", usersRouter);
app.use("/fighters", fighterRouter);
app.use("/:_id", secondHomeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;
