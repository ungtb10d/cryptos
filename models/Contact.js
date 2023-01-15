const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ContactSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
