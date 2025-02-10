require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

//  Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

//  Load Songs API Routes
const songRoutes = require("./routes/songs");
app.use("/api/songs", songRoutes); //  Ensure this exists

const albumRoutes = require("./routes/albums"); // Import albums route
app.use("/api/albums", albumRoutes); // Register album routes

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const spotifyRoutes = require("./routes/spotify");
app.use("/api/spotify", spotifyRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
