const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    artist: { type: String, required: true },
    releaseYear: { type: Number },
    artwork: { type: String, default: "/images/temp.png" }, // Album Cover Image URL
    tracks: { type: Number, default: 0 }, // Number of tracks
    spotifyId: { type: String, unique: true, sparse: true } // Optional Spotify Album ID
});

module.exports = mongoose.model("Album", albumSchema);
