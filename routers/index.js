const router = require("express").Router();
const {
  about,
  activePlans,
  confirmation,
  contact,
  dashboard,
  faq,
  index,
  invest,
  signin,
  signup,
  rules,
  withdraw,
  deposit,
  userinvest,
  submitContact,
  userwithdraw,
  rollover,
} = require("../controllers/index");
const cloudinary = require("cloudinary");
const multer = require("multer");
const Deposit = require("../models/Deposit");
const Kycupload = require("../models/Kyc");
const User = require("../models/User");
require("dotenv").config();

var storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
var imageFilter = function (req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter });

cloudinary.config({
  cloud_name: "avwunufe",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route("/").get(index);
router.route("/index").get(index);
router.route("/about-us").get(about);
router.route("/activePlans").get(activePlans);
router.route("/confirmation").get(confirmation);
router.route("/contact").get(contact);
router.route("/deposit").get(deposit);
router.route("/dashboard").get(dashboard);
router.route("/faq").get(faq);
router.route("/invest").get(invest);
router.route("/login").get(signin);
router.route("/rules").get(rules);
router.route("/sign-up").get(signup);
router.route("/withdraw").get(withdraw);
router.route("/invest").post(userinvest);
router.route("/withdraw").post(userwithdraw);
router.route("/contact").post(submitContact);
router.route("/rollover").post(rollover);
router.post("/deposit", upload.single("image"), async (req, res, next) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  const obj = {
    ...req.body,
    userName: req.user.userName,
    imagePath: result.secure_url,
    publicId: result.public_id,
  };
  if (req.user.referrer != "") {
    const referrer = await User.findOne({ username: req.user.referrer });
    if (!referrer) {
      await Deposit.create(obj);
      return res.redirect("/activePlans");
    }
    referrer.refBonus += req.body.amount * 0.1;
    await referrer.save();
  }
  await Deposit.create(obj);
  return res.redirect("/activePlans");
});
router.post("/kycupload", upload.single("image"), async (req, res, next) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  const obj = {
    ...req.body,
    imagePath: result.secure_url,
    publicId: result.public_id,
  };
  await Kycupload.create(obj);
  return res.redirect("/activePlans");
});

module.exports = router;
