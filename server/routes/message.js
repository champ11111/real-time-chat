const express = require("express");

const {
  getAllMessageByUserId,
  createMessage,
  deleteMessage,
} = require("../controllers/message");

const router = express.Router();

router.route("/").post(createMessage).delete(deleteMessage);
router.route("/:id").get(getAllMessageByUserId);
