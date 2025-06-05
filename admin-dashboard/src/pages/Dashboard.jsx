import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import ChatSidebar from '../components/ChatSidebar';
import ChatHeader from '../components/ChatHeader';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';

const SOCKET_SERVER_URL = 'https://beachify-final-backend.onrender.com';

const Dashboard = () => {
  const [conversations, setConversations] = useState({});
  const [activeUser, setActiveUser] = useState(null);
  const [text, setText] = useState('');
  const socket = useRef();
  const chatContainerRef = useRef();

useEffect(() => {
  socket.current = io(SOCKET_SERVER_URL);
  socket.current.emit('join', 'user2');

  // Remove old listener if exists, then add listener
  socket.current.off('receiveMessage');
  socket.current.on('receiveMessage', (msg) => {
    const from = msg.sender === 'user2' ? msg.receiver : msg.sender;
    setConversations((prev) => {
      const updated = { ...prev };
      if (!updated[from]) updated[from] = [];
      updated[from].push(msg);
      return updated;
    });
  });

  return () => socket.current.disconnect();
}, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversations, activeUser]);

  const sendMessage = () => {
    if (!activeUser || !text.trim()) return;

    const message = {
      sender: 'user2',
      receiver: activeUser,
      content: text,
    };

    socket.current.emit('sendMessage', message);

    setConversations((prev) => {
      const updated = { ...prev };
      if (!updated[activeUser]) updated[activeUser] = [];
      updated[activeUser].push(message);
      return updated;
    });

    setText('');
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Left Sidebar */}
      <ChatSidebar
        conversations={conversations}
        activeUser={activeUser}
        setActiveUser={setActiveUser}
      />

      {/* Chat Section */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {activeUser ? (
          <>
            <ChatHeader activeUser={activeUser} />
            <ChatMessages
              messages={conversations[activeUser]}
              chatContainerRef={chatContainerRef}
            />
            <ChatInput
              text={text}
              setText={setText}
              sendMessage={sendMessage}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
