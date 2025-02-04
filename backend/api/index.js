const express = require("express");
const router = express.Router();

// ✅ Import routes
const songRoutes = require("../routes/songs");

// ✅ Use API routes
router.use("/songs", songRoutes);  // All song-related routes are now under /api/songs

module.exports = router;
