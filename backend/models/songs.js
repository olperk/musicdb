const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: String,
  genre: [String],
  releaseYear: Number,
  duration: Number,
  streamCount: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  imageUrl: {}
});

module.exports = mongoose.model("Song", SongSchema);
