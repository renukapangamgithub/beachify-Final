import express from 'express';
import multer from 'multer';
import Image from '../models/Image.js';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// POST: Upload Image
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const image = new Image({
      imageUrl: `uploads/${req.file.filename}`,
      caption: req.body.caption || '',
    });
    await image.save();
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload image', error });
  }
});

// GET: Fetch All Images
router.get('/', async (req, res) => {
  try {
    const images = await Image.find().sort({ uploadedAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch images', error });
  }
});

export default router;
