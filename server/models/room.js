const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomName: { type: String, lowercase: true, unique: true },
  isGroupChat: { type: Boolean, default: false },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "message",
  },
  groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
},{ timestamps: true, versionKey: false });

module.exports = mongoose.model("Room", RoomSchema);

