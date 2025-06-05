import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hotel from '../models/hotelModel.js';

dotenv.config();

const hotels = [
  {
    name: 'Blue Wave Inn',
    price: 1500,
    rating: 4.5,
    state: 'Maharashtra',
    city: 'Mumbai',
    distanceFromBeach: 400,
    address: 'Juhu Beach, Mumbai',
    amenities: ['Wi-Fi', 'Pool', 'Breakfast'],
    location: { type: 'Point', coordinates: [72.8777, 19.076] },
  },
  {
    name: 'Sea Shell Retreat',
    price: 2300,
    rating: 4.8,
    state: 'Maharashtra',
    city: 'Mumbai',
    distanceFromBeach: 300,
    address: 'Versova, Mumbai',
    amenities: ['Wi-Fi', 'Pet Friendly', 'AC'],
    location: { type: 'Point', coordinates: [72.881, 19.079] },
  },
  {
    name: 'Goa Beach Resort',
    price: 2000,
    rating: 4.7,
    state: 'Goa',
    city: 'Panaji',
    distanceFromBeach: 500,
    address: 'Calangute Beach, Goa',
    amenities: ['Wi-Fi', 'Pool', 'Breakfast', 'Gym'],
    location: { type: 'Point', coordinates: [73.8278, 15.4909] },
  },
];

async function seedHotels() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    console.log('Deleting old hotels...');
    await Hotel.deleteMany({});
    console.log('Old hotels deleted');

    console.log('Inserting new hotels...');
    await Hotel.insertMany(hotels);
    console.log('New hotels inserted');

    console.log('Creating 2dsphere index...');
    await Hotel.collection.createIndex({ location: '2dsphere' });
    console.log('Index created');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Seeding error:', error);
  }
}


seedHotels();
