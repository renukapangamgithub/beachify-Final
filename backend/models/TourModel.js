import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
  image: String,
});

const Tour = mongoose.model("Tour", tourSchema);
export default Tour;
