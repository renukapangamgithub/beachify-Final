import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const SOCKET_SERVER_URL = 'http://localhost:5000';  // Adjust if needed

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [user1] = useState('user1'); // logged-in user
  const [user2] = useState('user2'); // chat partner

  // Initialize socket outside useEffect to keep it stable
  const socket = React.useRef();

  useEffect(() => {
  console.log('Connecting to socket server...');
  socket.current = io(SOCKET_SERVER_URL);

  socket.current.on('connect', () => {
    console.log('Connected to socket:', socket.current.id);
  });

  socket.current.emit('join', user1);
  console.log('Joining room as:', user1);

  socket.current.on('receiveMessage', (message) => {
    console.log('Received message via socket:', message);
    if (
      (message.sender === user1 && message.receiver === user2) ||
      (message.sender === user2 && message.receiver === user1)
    ) {
      setMessages((prev) => [...prev, message]);
    }
  });

  return () => {
    console.log('Disconnecting socket...');
    socket.current.disconnect();
  };
}, [user1, user2]);

  const sendMessage = () => {
    if (!text.trim()) return;

   const messageData = {
  sender: user1,
  receiver: user2,
  content: text, 
};

    // Emit message to server via socket
    socket.current.emit('sendMessage', messageData);

    // Optionally add to local state immediately for instant UI update
    setMessages((prev) => [...prev, messageData]);

    setText('');
  };

return (
  <>
    <style>{`
      /* Responsive styles for Chat component */
      @media (max-width: 640px) {
        .max-w-md {
          max-width: 100% !important;
          padding: 1rem !important;
        }
        .h-64 {
          height: 40vh !important;
        }
        input[type="text"] {
          font-size: 1rem;
          padding: 0.5rem 0.75rem;
        }
        button {
          padding: 0.5rem 1rem;
          font-size: 1rem;
        }
      }
    `}</style>

    <div className="w-full h-full p-4 bg-white">
      <div className="w-full max-w-md p-4 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-center mb-4">Chat with Admin {user2}</h2>

        <div className="h-64 overflow-y-auto border p-2 rounded mb-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 flex ${msg.sender === user1 ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-xs ${
                  msg.sender === user1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                }`}
              >
                {msg.message || msg.content}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border rounded px-3 py-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </>
);

};

export default Chat;
