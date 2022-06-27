const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.ObjectId,
    ref: "Room",
    required: true,
  },
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  content: { type: String, trim: true },
},
{ timestamps: true, versionKey: false });

module.exports = mongoose.model("Message", MessageSchema);
