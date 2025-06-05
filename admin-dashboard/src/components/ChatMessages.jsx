import React from 'react';

const ChatMessages = ({ messages = [], chatContainerRef }) => {
  return (
    <div
      ref={chatContainerRef}
      className="flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-[#eef1f5]"
    >
      {messages.map((msg, i) => (
        <div key={i} className={`flex ${msg.sender === 'user2' ? 'justify-end' : 'justify-start'}`}>
          <div
            className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
              msg.sender === 'user2'
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-white text-gray-800 rounded-bl-none'
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
