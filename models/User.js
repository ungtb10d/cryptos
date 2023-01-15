const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
        maxlength: [10, "Name cannot be more than 10 characters"],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
        maxlength: [10, "Name cannot be more than 10 characters"],
    },
    username: {
        type: String,
        required: [true, "Please input a user name"],
        trim: true,
        maxlength: [10, "Username cannot be more than 10 characters"],
    },
    password: {
        type: String,
        required: [true, "Please input a password"],
        trim: true,
        select: false,
        minlength: 6,
    },
    referrals: {
        type: Number,
        default: 0,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    isVerified: {
        type: Boolean,
        default: false,
    },
    deposits: {
        type: Number,
        default: 0,
    },
    balance: {
        type: Number,
        default: 0,
    },
    profit: {
        type: Number,
        default: 0,
    },
    referrer: {
        type: String,
    },
    rollover: {
        type: Boolean,
    },
    phoneNumber: {
        type: String,
    },
    owner: {
        type: String,
    },
    refBonus: {
        type: Number,
        default: 0,
    },
    email: {
        type: String,
        required: [true, "Please input a valid email"],
        unique: true,
        trim: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email",
        ],
    },
}, { timestamps: true });

// add middleware to hash passwords
UserSchema.pre("save", async function(next) {
    if (this.password) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});
// generate jsonwebtoken
UserSchema.methods.getJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_KEY, { expiresIn: "1d" });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;