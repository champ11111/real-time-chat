const express = require("express");

const {
  getAllMessageByRoomId,
  createMessage,
  deleteMessage,
} = require("../controllers/message");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(protect, createMessage).delete(deleteMessage);
router.route("/:roomId").get(protect, getAllMessageByRoomId);

module.exports = router;
