const express = require("express");

const {
  getAllMessageByChatId,
  createMessage,
  deleteMessage,
} = require("../controllers/message");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(protect, createMessage).delete(deleteMessage);
router.route("/:chatId").get(protect, getAllMessageByChatId);

module.exports = router;
