const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DepositSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    username: {
      type: String,
    },
    amount: {
      type: Number,
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Confirmed"],
    },
    paymentMode: {
      type: String,
      default: "Bitcoin",
    },
    imagePath: {
      type: String,
    },
    publicId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Deposit = mongoose.model("Deposit", DepositSchema);

module.exports = Deposit;
