// components/ChatWidget.jsx
import React, { useState } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';
import Chat from './Chat';

const ChatWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat toggle button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
        >
          <FaComments size={24} />
        </button>
      )}

      {/* Chat box */}
      {open && (
        <div className="relative w-[350px] h-[500px] shadow-xl rounded-xl overflow-hidden bg-white">
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 text-gray-600 hover:text-red-500 z-10"
          >
            <FaTimes />
          </button>

          {/* Chat component */}
          <div className="h-full pt-8">
            <Chat />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
