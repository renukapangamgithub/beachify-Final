import React from 'react';

const ChatSidebar = ({ conversations, activeUser, setActiveUser }) => {
  return (
    <div className="w-[280px] bg-[#f0f4fa] border-r px-4 py-6">
      <h2 className="text-xl font-semibold mb-6 px-2">Messages</h2>
      <div className="space-y-2 overflow-y-auto h-[calc(100vh-100px)] pr-1">
        {Object.keys(conversations).map((user, i) => (
          <div
            key={i}
            onClick={() => setActiveUser(user)}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
              activeUser === user ? 'bg-white shadow text-blue-600' : 'hover:bg-white'
            }`}
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold uppercase">
              {user.charAt(0)}
            </div>
            <div className="text-sm font-medium">{user}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
