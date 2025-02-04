require("dotenv").config();


const mongoose = require("mongoose");
const Song = require("./models/songs");

if (!globalThis.fetch) {
    import('node-fetch').then(fetchModule => {
        globalThis.fetch = fetchModule.default;
    });
}

// ✅ Connect to MongoDB Atlas
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Connected to MongoDB Atlas");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
}

// ✅ Function to Get Spotify Access Token
async function getSpotifyAccessToken() {
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(
                process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
            ).toString("base64")}`
        },
        body: "grant_type=client_credentials"
    });

    const data = await response.json();
    return data.access_token;
}

// ✅ Fetch Songs from Spotify API by Search Query
async function fetchSpotifySongs(query) {
    const accessToken = await getSpotifyAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    const data = await response.json();
    return data.tracks.items; // Returns an array of tracks
}

// ✅ Save Spotify Data to MongoDB
async function importSpotifySongs(query) {
    await connectDB();
    const songs = await fetchSpotifySongs(query);

    for (let track of songs) {
        const newSong = new Song({
            title: track.name,
            artist: track.artists.map(artist => artist.name).join(", "),
            album: track.album.name,
            genre: [], // Spotify API doesn't provide genre data for individual songs
            releaseYear: track.album.release_date ? track.album.release_date.split("-")[0] : null,
            duration: Math.round(track.duration_ms / 1000), // Convert milliseconds to seconds
            imageUrl: track.album.images.length > 0 ? track.album.images[0].url : null
        });

        try {
            await newSong.save();
            console.log(`✅ Saved: ${track.name} - ${track.artists[0].name}`);
        } catch (error) {
            console.error("❌ Error saving song:", error);
        }
    }

    mongoose.connection.close();
    console.log("🔌 Disconnected from MongoDB");
}

// ✅ Run the Function (Searches for a Specific Artist or Song)
importSpotifySongs("Dominic Fike"); // Change "Queen" to any artist/song you want to import
