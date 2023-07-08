const express = require("express");

const router = express.Router();
const memberRoutes = require("./members.js");
const familyRoutes = require("./family.js");
const eventRoutes = require("./events.js");

router.use("/members", memberRoutes);
router.use("/family", familyRoutes);
router.use("/events", eventRoutes);

module.exports = router;
