const User = require("../models/user");
const Room = require("../models/room");

exports.register = async (req, res) => {
  return res.sendFile("register.js", { root: "./react_chat/" });
};

exports.login = async (req, res) => {
  return res.sendFile("login.js", { root: "./react_chat/" });
};

exports.logout = async (req, res) => {
  return res.sendFile("logout.js", { root: "./react_chat/" });
};

exports.getUserRoom = async (req, res) => {
  return res.sendFile("userRoom.js", { root: "./react_chat/" });
};

exports.getAdminRoom = async (req, res) => {
  return res.sendFile("adminRoom.js", { root: "./react_chat/" });
};

exports.accessChat = async (req, res) => {
  try {
    let {
      name,
      email,
      password,
      role,
      profilePic,
      serviceEmail,
      servicePic,
      serviceName,
    } = req.body;

    if (!password) password = process.env.CHAT_DEFAULT_PASSWORD;

    //Validate email and password
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Please enter email and password" });
    }

    //Get user admin
    const admin = await User.findOne({ email: serviceEmail }).select(
      "+password"
    );

    //Check for user
    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      try {
        //Create user
        let adminId;
        if (role === "admin") {
          user = await User.create({
            name,
            email,
            password,
            role,
            profilePic,
            servicePic: profilePic,
            serviceName,
          });
          adminId = user._id;
        } else {
          user = await User.create({
            name,
            email,
            password,
            role,
            profilePic,
            serviceId: admin._id,
            servicePic: admin.profilePic,
            serviceName,
          });
          adminId = admin._id;
        }

        await findOrCreateRoom(user._id, adminId, req, res);

        return sendTokenResponse(user, 200, res);
      } catch (e) {
        res.status(400).json({ success: false });
        console.log(e.stack);
      }
    }
    //Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }
    await findOrCreateRoom(user.id, admin.id, req, res);
    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(401).json({
      success: false,
      error: "Cannot convert email or password to string",
    });
  }
};

const sendTokenResponse = (user, statusCode, res) => {
  //Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

const findOrCreateRoom = async (userId, adminId, req, res) => {
  try {
    let room = await Room.find({
      isGroupChat: false,
      $and: [
        {
          users: { $elemMatch: { $eq: userId } },
        },
        {
          users: { $elemMatch: { $eq: adminId } },
        },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    room = await User.populate(room[0], {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (room) {
      return;
    } else {
      let roomData = {
        roomName: "room_" + adminId + "_" + userId,
        isGroupChat: false,
        users: [userId, adminId],
      };
      try {
        const createdRoom = await Room.create(roomData);
        const FullRoom = await Room.findOne({ _id: createdRoom._id }).populate(
          "users",
          "-password"
        );
        console.log(FullRoom);
      } catch (error) {
        console.log(error.message);
        return res.status(400).send(error.message);
      }
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
