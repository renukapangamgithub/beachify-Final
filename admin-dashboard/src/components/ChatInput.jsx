import React from 'react';

const ChatInput = ({ text, setText, sendMessage }) => {
  return (
    <div className="border-t px-6 py-4 bg-white flex items-center gap-3">
      {/* Input */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type your message..."
        className="flex-1 px-4 py-2 border rounded-full outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Send Button */}
      <button
        onClick={sendMessage}
        className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium"
        type="button"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
