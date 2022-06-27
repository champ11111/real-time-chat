const User = require("../models/User");

//@ des     Register a user
//@ route   POST /api/v1/auth/register
//@ access  Public
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    //Create user
    const user = await User.create({ name, email, password, role });

    sendTokenResponse(user, 200, res);
  } catch (e) {
    res.status(400).json({ success: false });
    console.log(e.stack);
  }
};

//@ des     Login a user
//@ route   POST /api/v1/auth/login
//@ access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //Validate email and password
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Please enter email and password" });
    }

    //Check for user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }

    //Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }

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
  });
};

//@ des     Get current logged in user
//@ route   GET /api/v1/auth/me
//@ access  Private
exports.getMe = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
};

//@desc     Log user out/ clear cookie
//@route    GET /api/v1/auth/logout
//@access   Private
exports.logout = async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
};

exports.getUser = async (req, res) => {
  try {
    let user = await User.find(req.params.id).lean().exec();
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let user = await User.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
