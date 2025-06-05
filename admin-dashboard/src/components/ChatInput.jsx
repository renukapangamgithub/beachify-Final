import React, { useState } from 'react';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

const ChatInput = ({ text, setText, sendMessage }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  return (
    <div className="relative border-t px-6 py-4 bg-white flex items-center gap-3">
      {/* Emoji button */}
      <button
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        className="text-2xl"
        type="button"
        aria-label="Toggle emoji picker"
      >
        😊
      </button>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-16 left-0 z-50">
          <Picker
            onSelect={(emoji) => {
              setText((prev) => prev + emoji.native);
              setShowEmojiPicker(false);
            }}
          />
        </div>
      )}

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
