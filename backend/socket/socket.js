import { Server } from 'socket.io';
import Message from '../models/messageModel.js'; // Adjust path as needed

export function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: '*', // Change this to your frontend URL in production
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('New user connected:', socket.id);

    // User joins their own room to receive messages privately
    socket.on('join', (userId) => {
      socket.join(userId);
      console.log(`${userId} joined their room`);
    });

    // Listen for sendMessage event from clients
    socket.on('sendMessage', async (data) => {
      console.log('Message received:', data);
      try {
        // Save the message to DB with correct field 'content'
        const newMessage = await Message.create({
          sender: data.sender,
          receiver: data.receiver,
          content: data.content,
        });

        // Emit the saved message to both sender and receiver rooms
        io.to(data.receiver).emit('receiveMessage', newMessage);
        io.to(data.sender).emit('receiveMessage', newMessage);
      } catch (err) {
        console.error('Error saving message:', err);

        // Notify sender about the error
        socket.emit('errorMessage', { error: 'Failed to save message' });
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
}
