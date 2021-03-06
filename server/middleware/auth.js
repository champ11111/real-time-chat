const jwt = require("jsonwebtoken");
const User = require("../models/user");

//Protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  //Make sure token exists
  if (!token || token === "null") {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }

  try {
    //Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    //Add user from payload
    req.user = await User.findById(decoded.id);

    next();
  } catch (e) {
    console.log(e.stack);
    res
      .status(400)
      .json({ success: false, message: "Not authorized to access this route" });
  }
};

//Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};
