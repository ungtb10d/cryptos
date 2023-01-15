const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WithdrawalSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    amountRequested: {
      type: Number,
    },
    amountWithCharge: {
      type: Number,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "processed"],
    },
    paymentMode: {
      type: String,
      default: "bitcoin",
    },
    bitcoinAddress: {
      type: String,
    },
  },
  { timestamps: true }
);

const Withdrawal = mongoose.model("Withdrawal", WithdrawalSchema);

module.exports = Withdrawal;
