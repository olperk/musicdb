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


router.get("/:id", async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) {
            return res.status(404).json({ message: "Song not found" });
        }
        res.json(song);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});




module.exports = router;
