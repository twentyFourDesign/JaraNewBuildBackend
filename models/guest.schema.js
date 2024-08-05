const mongoose = require("mongoose");

const guestSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    member: { type: Boolean, required: true },
    birthdayReminded: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Guest = mongoose.model("Guest", guestSchema, "Guest");
module.exports = Guest;
