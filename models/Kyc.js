const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const KycSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
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

const Kyc = mongoose.model("Kyc", KycSchema);

module.exports = Kyc;
