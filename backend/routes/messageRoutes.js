// routes/messageRoutes.js
import express from 'express';
import Message from '../models/messageModel.js';

const router = express.Router();

// Send a message
router.post('/', async (req, res) => {
  const { sender, receiver, content } = req.body;

  if (!sender || !receiver || !content) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const message = new Message({ sender, receiver, content });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Server error while sending message.' });
  }
});

// Get messages between two users
router.get('/', async (req, res) => {
  const { user1, user2 } = req.query;

  if (!user1 || !user2) {
    return res.status(400).json({ error: 'user1 and user2 query parameters are required.' });
  }

  try {
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching messages.' });
  }
});

export default router;
