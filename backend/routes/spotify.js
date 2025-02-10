const express = require("express");
require("dotenv").config();

const router = express.Router();

// ✅ Route to Get Spotify Access Token
router.post("/getSpotifyToken", async (req, res) => {  // ✅ Make sure it's a POST route
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        return res.status(500).json({ message: "Spotify credentials are missing" });
    }

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    try {
        const response = await fetch("https://accounts.spotify.com/api/token", { // ✅ Now fetch() will work
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${credentials}`
            },
            body: "grant_type=client_credentials"
        });

        const data = await response.json();
        
        if (!data.access_token) {
            throw new Error("Failed to retrieve Spotify access token");
        }

        res.json({ access_token: data.access_token });
    } catch (error) {
        console.error("❌ Error fetching Spotify token:", error);
        res.status(500).json({ message: "Failed to get token", error: error.message });
    }
});

module.exports = router;
