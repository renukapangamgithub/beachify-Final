import React from 'react';

const ChatHeader = ({ activeUser }) => {
  return (
    <div className="h-[70px] bg-white border-b px-6 flex items-center shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold uppercase">
          {activeUser.charAt(0)}
        </div>
        <div>
          <div className="text-lg font-semibold">{activeUser}</div>
          <div className="text-xs text-green-500">Online</div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
