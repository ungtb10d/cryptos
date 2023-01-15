const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
require("dotenv").config();
const index = require("./routers/index");
const admin = require("./routers/admin");
const auth = require("./routers/auth");
const config = require("./utils/config");
const errorHandler = require("./middleware/error");

app.set("view engine", "ejs");
app.use(express.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.get("*", function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});
app.post("*", function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static("public"), index);
app.use("/tarvixxx", express.static("adminpublic"), admin);
app.use("/api/v1/auth", express.static("public"), auth);
require("./config/passport")(passport);
app.use(errorHandler);
mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection
  .once("open", () => {
    console.log("Database is up");
  })
  .on("error", () => {
    console.log("Error connecting to database");
  });
const PORT = process.env.PORT;
app.listen(PORT, console.log("Listening on " + process.env.PORT));
