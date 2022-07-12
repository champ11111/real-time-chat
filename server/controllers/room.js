// exports.getRooms = async (req, res, next) => {
//   const rooms = await Room.find({});
//   res.status(201).json({ success: true, data: rooms });
// };

// exports.getRoom = async (req, res, next) => {
//   try {
//     const room = await Room.findById(req.params.id);
//     res.status(201).json({ success: true, data: room });
//   } catch (e) {
//     return res
//       .status(500)
//       .json({ success: false, message: "Cannot find Appointment" });
//   }
// };

// exports.createRoom = async (req, res, next) => {
//   const room = await Room.create(req.body);
//   res.status(201).json({ success: true, data: room });
// };

const express = require("express");
const Room = require("../models/room");
const User = require("../models/user");

exports.getUserRoom = async (req, res) => {
  try {
    let room = await Room.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
exports.upsertRoom = async (req, res) => {
  try {
    console.log(req.body);
    const { userId } = req.body;
    console.log(req.user);
    console.log(userId);
    let room = await Room.find({
      isGroupChat: false,
      $and: [
        {
          users: { $elemMatch: { $eq: req.user._id } },
        },
        {
          users: { $elemMatch: { $eq: userId } },
        },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");
    room = await User.populate(room[0], {
      path: "latestMessage.sender",
      select: "name pic email",
    });
    console.log(room);

    if (room !== undefined) {
      return res.status(200).send(room);
    } else {
      var roomData = {
        roomName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      try {
        const createdRoom = await Room.create(roomData);
        const FullRoom = await Room.findOne({ _id: createdRoom._id }).populate(
          "users",
          "-password"
        );
        return res.status(200).send(FullRoom);
      } catch (error) {
        return res.status(400).send(error.message);
      }
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

exports.createGroup = async (req, res) => {
  try {
    let users = req.body.users;
    users.push(req.user);
    const groupRoom = await Room.create({
      roomName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });
    const CreatedGroupDetails = await Room.findOne({ _id: groupRoom._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    return res.status(200).send(CreatedGroupDetails);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

exports.renameRoom = async (req, res) => {
  try {
    const { roomId, roomName } = req.body;

    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      {
        roomName: roomName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedRoom) {
      return res.status(404).send("Room Not Found");
    } else {
      res.json(updatedRoom);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

exports.removeMember = async (req, res) => {
  try {
    const { roomId, userId } = req.body;
    const removed = await Room.findByIdAndUpdate(
      roomId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!removed) {
      return res.status(404).send("Room Not Found");
    } else {
      res.json(removed);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

exports.addMember = async (req, res) => {
  try {
    const { roomId, userId } = req.body;

    const added = await Room.findByIdAndUpdate(
      roomId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!added) {
      return res.status(404).send("Room Not Found");
    } else {
      res.json(added);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
