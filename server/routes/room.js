const express = require("express");

const { getRooms, getRoom, createRoom } = require("../controllers/room");

const router = express.Router();

router.route("/").get(getRooms).post(createRoom);
router.route("/:id").get(getRoom);

module.exports = router;
