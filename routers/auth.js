const router = require("express").Router();
const {
  login,
  signup,
  logout,
  showlogin,
  showsignup,
  showindex,
  showabout,
  showcontact,
  showfaq,
} = require("../controllers/auth");

router.route("/contact").get(showcontact);
router.route("/faq").get(showfaq);
router.route("/about-us").get(showabout);
router.route("/about-us").get(showabout);
router.route("/index").get(showindex);
router.route("/sign-up").get(showsignup);
router.route("/login").get(showlogin);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
module.exports = router;
