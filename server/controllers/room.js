const Room = require("../models/Room");

exports.getRooms = async (req, res, next) => {
  const rooms = await Room.find({});
  res.status(201).json({ success: true, data: rooms });
};

exports.getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(201).json({ success: true, data: room });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Cannot find Appointment" });
  }
};

exports.createRoom = async (req, res, next) => {
  const room = await Room.create(req.body);
  res.status(201).json({ success: true, data: room });
};
