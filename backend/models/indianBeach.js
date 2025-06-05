import mongoose from "mongoose";

const indianBeachSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  description: String,
  bestTimeToVisit: String,
  imageUrl: String,
  coordinates: {
    lat: Number,
    lng: Number,
  },
});

const IndianBeach = mongoose.model("IndianBeach", indianBeachSchema);

export default IndianBeach;
