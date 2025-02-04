const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// ✅ Correct Path to `users.json`
const usersFilePath = path.join(__dirname, "../users.json");

// ✅ Simple Login Check (Text Match)
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    // ✅ Check if `users.json` exists
    if (!fs.existsSync(usersFilePath)) {
        return res.status(500).json({ message: "❌ Users database not found." });
    }

    // ✅ Load Users from `users.json`
    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

    // ✅ Check if User Exists
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "❌ Invalid username or password." });
    }

    res.json({ message: "✅ Login successful!", username });
});

module.exports = router;
