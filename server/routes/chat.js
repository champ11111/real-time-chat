const express = require("express");

const {
  register,
  login,
  logout,
  getUserRoom,
  getAdminRoom,
  accessChat,
} = require("../controllers/chat");

const router = express.Router();

router.get("/register", register);
router.get("/login", login);
router.get("/logout", logout);
router.get("/userroom", getUserRoom);
router.get("/adminroom", getAdminRoom);
router.post("/accesschat", accessChat);

module.exports = router;
