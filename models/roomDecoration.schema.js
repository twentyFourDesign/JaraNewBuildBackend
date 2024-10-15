const mongoose = require("mongoose");

const roomDecoration = mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
    // type: {
    //   type: String,
    //   default: "roomDecoration",
    // },
  },
  { timestamps: true }
);

const RoomDecoration = mongoose.model(
  "RoomDecoration",
  roomDecoration,
  "RoomDecoration"
);
module.exports = RoomDecoration;
