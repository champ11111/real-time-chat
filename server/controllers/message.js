const Message = require("../models/message");
const User = require("../models/user");
const Room = require("../models/room");

exports.getAllMessageByRoomId = async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.roomId })
      .populate("sender", "name profilePic email")
      .populate("room")
      .lean()
      .exec();
    return res.status(200).send(messages);
  } catch (error) {
    return res.status(400).send(error.messages);
  }
};

//Post create new message
exports.createMessage = async (req, res) => {
  const { content, roomId } = req.body;
  if (!content || !roomId) {
    return res.status(400).send("Invalid data passed into request");
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    room: roomId,
  };
  try {
    var message = await Message.create(newMessage);
    message = await Message.findOne({ _id: message._id })
      .populate("sender", "name profilePic")
      .populate("room")
      .lean()
      .exec();
    message = await User.populate(message, {
      path: "room.users",
      select: "name profilePic email",
    });

    let data = await Room.findByIdAndUpdate(req.body.roomId, {
      latestMessage: message._id,
    });

    return res.status(200).send(message);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: `Message with id ${req.params.id} not found`,
      });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Cannot delete message" });
  }
};
