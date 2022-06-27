const Message = require("../models/Message");

// exports.getAllMessagesByUserId = async (req, res, next) => {
//   try {
//     let query;

//     //Copy req.query
//     const reqQuery = { ...req.query };

//     //Fields to exclude
//     const removeFields = ["select", "sort", "page", "limit"];

//     //Loop over removeFields and delete them from reqQuery
//     removeFields.forEach((param) => delete reqQuery[param]);
//     console.log(reqQuery);

//     //Create query string
//     let queryStr = JSON.stringify(req.query);
//     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

//     //Find Message
//     query = Message.find(JSON.parse(queryStr)).populate("appointments");

//     //Select Fields
//     if (req.query.select) {
//       const fields = req.query.select.split(",").join(" ");
//       query = query.select(fields);
//     }

//     //sort by
//     if (req.query.sort) {
//       const sortBy = req.query.sort.split(",").join(" ");
//       query = query.sort(sortBy);
//     } else {
//       query = query.sort("-createdAt");
//     }

//     //Pagination
//     const page = parseInt(req.query.page, 10) || 1;
//     const limit = parseInt(req.query.limit, 10) || 25;
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;
//     const total = await Message.countDocuments();

//     query = query.skip(startIndex).limit(limit);

//     //Execute query
//     const messages = await query;

//     //Pagination result
//     const pagination = {};

//     if (endIndex < total) {
//       pagination.next = {
//         page: page + 1,
//         limit,
//       };
//     }

//     if (startIndex > 0) {
//       pagination.prev = {
//         page: page - 1,
//         limit,
//       };
//     }

//     res.status(200).json({
//       success: true,
//       count: messages.length,
//       pagination,
//       data: messages,
//     });
//   } catch (e) {
//     return res
//       .status(500)
//       .json({ success: false, message: "Cannot get messages" });
//   }
// };

// exports.createMessage = async (req, res, next) => {
//   try {
//     const message = await Message.create(req.body);
//     res.status(201).json({ success: true, data: message });
//   } catch (e) {
//     console.log(e);
//     return res
//       .status(500)
//       .json({ success: false, message: "Cannot create message" });
//   }
// };

exports.getAllMessageByChatId = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.roomId })
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
    message = Message.findOne({ _id: message._id })
      .populate("sender", "name profilePic")
      .populate("room")
      .lean()
      .exec();
    message = await user.populate(message, {
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
    console.log(e);
    return res
      .status(500)
      .json({ success: false, message: "Cannot delete message" });
  }
};
