require("dotenv").config();
const mongoose = require("mongoose");

// ✅ Import the Song model from `models/songs.js`
const Song = require("./models/songs");

// ✅ Connect to MongoDB Atlas
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Connected to MongoDB Atlas (project1)");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
}

// ✅ Function to Add a Preset Song
async function addPresetSong() {
    await connectDB();

    const presetSong = new Song({
        title: "Bohemian Rhapsody",
        artist: "Queen",
        album: "A Night at the Opera",
        genre: ["Rock"],
        releaseYear: 1975,
        duration: 354,  // 5 minutes 54 seconds
        streamCount: 10000000,
        likes: 50000
    });

    try {
        await presetSong.save();
        console.log("🎵 Preset Song Added Successfully!");
    } catch (error) {
        console.error("❌ Error Adding Song:", error);
    } finally {
        mongoose.connection.close(); // ✅ Close DB connection after adding the song
        console.log("🔌 Disconnected from MongoDB");
    }
}

// ✅ Run the Function
addPresetSong();
