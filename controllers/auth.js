const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const passport = require("passport");
// const ErrorResponse = require("../utils/ErrorResponse");

// @desc Logs a user in
// @access public
exports.login = asyncHandler(async(req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
        failureFlash: false,
    })(req, res, next);
});
// @desc Renders login page
// @access public
exports.showlogin = asyncHandler(async(req, res, next) => {
    res.render("login", { message: "" });
});
// @desc Renders signup page
// @access public
exports.showsignup = asyncHandler(async(req, res, next) => {
    if (req.query.referrer) {
        res.render("sign-up", { referrer: req.query.referrer });
    } else {
        res.render("sign-up", { referrer: "" });
    }
});
// @desc Renders index page
// @access public
exports.showindex = asyncHandler(async(req, res, next) => {
    res.render("index", { message: "" });
});
// @desc Renders about page
// @access public
exports.showabout = asyncHandler(async(req, res, next) => {
    res.render("about-us", { message: "" });
});
// @desc Renders contact page
// @access public
exports.showcontact = asyncHandler(async(req, res, next) => {
    res.render("contact", { message: "" });
});
// @desc Renders faq page
// @access public
exports.showfaq = asyncHandler(async(req, res, next) => {
    res.render("faq", { message: "" });
});

// @desc Registers a user
// @access public
exports.signup = asyncHandler(async(req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        password,
        username,
        phoneNumber,
        referrer,
    } = req.body;
    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        username,
        phoneNumber,
        referrer,
    });
    req.login(user, function(err) {
        if (err) {
            return res.render("sign-up", { message: "" });
        }
        return res.redirect("/dashboard");
    });
});

// @desc Logs a user out
// @access public
exports.logout = asyncHandler(async(req, res, next) => {
    req.logout();
    res.redirect("login");
});