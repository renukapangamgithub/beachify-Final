// hotelModel.js (unchanged)

import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  rating: Number,
  state: String,
  city: String,
  distanceFromBeach: Number,
  address: String,
  amenities: [String],
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true,
    },
  },
  amadeusId: { type: String },
  thumbnail: { type: String },
  source: { type: String, default: 'local' },
});

hotelSchema.index({ location: '2dsphere' });

const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;
