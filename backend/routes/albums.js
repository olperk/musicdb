const express = require("express");
const router = express.Router();
const Album = require("../models/album");

// ✅ Fetch all albums
router.get("/", async (req, res) => {
    try {
        const albums = await Album.find();
        res.json(albums);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// ✅ Fetch an album by name (used for checking if album exists)
router.get("/search", async (req, res) => {
    const albumName = req.query.name;
    if (!albumName) return res.status(400).json({ message: "Album name is required" });

    try {
        const album = await Album.findOne({ name: albumName });

        if (!album) {
            console.log(`❌ Album not found in database: ${albumName}`);
            return res.status(404).json({ message: "Album not found" }); // ✅ Return proper 404 error
        }

        console.log(`✅ Album found in database: ${album.name}`);
        res.json(album);
    } catch (error) {
        console.error(`❌ Error searching for album:`, error);
        res.status(500).json({ message: "Server Error", error });
    }
});


// ✅ Fetch an album by ID
router.get("/:id", async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) return res.status(404).json({ message: "Album not found" });
        res.json(album);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// ✅ Add a new album (POST request)
router.post("/", async (req, res) => {
    const { name, artist, releaseYear, artwork, tracks, spotifyId } = req.body;

    try {
        // Prevent duplicate albums
        let albumExists = await Album.findOne({ name });
        if (albumExists) return res.status(400).json({ message: "Album already exists" });

        const newAlbum = new Album({
            name,
            artist,
            releaseYear,
            artwork,
            tracks,
            spotifyId
        });

        const savedAlbum = await newAlbum.save();
        res.status(201).json(savedAlbum);
    } catch (error) {
        res.status(500).json({ message: "Error saving album", error });
    }
});

// ✅ Update album details
router.put("/:id", async (req, res) => {
    try {
        const updatedAlbum = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAlbum) return res.status(404).json({ message: "Album not found" });
        res.json(updatedAlbum);
    } catch (error) {
        res.status(500).json({ message: "Error updating album", error });
    }
});

// ✅ Delete an album
router.delete("/:id", async (req, res) => {
    try {
        const deletedAlbum = await Album.findByIdAndDelete(req.params.id);
        if (!deletedAlbum) return res.status(404).json({ message: "Album not found" });
        res.json({ message: "Album deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting album", error });
    }
});

module.exports = router;
