const express = require("express");

const {
  getUserRoom,
  upsertRoom,
  createGroup,
  renameRoom,
  addMember,
  removeMember,
} = require("../controllers/room");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(protect, getUserRoom).post(protect, upsertRoom);
router.route("/group").post(protect, createGroup);
router.route("/rename").put(renameRoom);
router.route("/addmember").put(addMember);
router.route("/removemember").put(removeMember);

module.exports = router;
