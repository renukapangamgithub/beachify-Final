import Tour from "../models/TourModel.js";

export const getTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const createTour = async (req, res) => {
    try {
      console.log("Received req.body:", req.body); // ✅ Log the request body
  
      const { title, description, price, location, image } = req.body;
  
      if (!title || !description || !price || !location || !image) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const newTour = new Tour({ title, description, price, location, image });
      await newTour.save();
      res.status(201).json(newTour);
    } catch (error) {
      console.error("Tour creation error:", error);
      res.status(500).json({ message: "Failed to create tour", error: error.message });
    }
  };
  
