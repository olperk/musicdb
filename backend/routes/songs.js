const express = require("express");
const Song = require("../models/songs");

const router = express.Router();

// ✅ POST route to add a new song
router.post("/", async (req, res) => {
    try {
        const newSong = new Song(req.body);
        await newSong.save();
        res.status(201).json({ message: "Song added successfully!", song: newSong });
    } catch (error) {
        res.status(400).json({ message: "Error adding song", error });
    }
});



    





// ✅ GET all songs and return JSON response
router.get("/", async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: "❌ Error fetching songs", error });
    }
});



module.exports = router;
