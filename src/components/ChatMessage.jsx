import React from 'react';
import ChatIcon from './ChatIcon';

const ChatMessage = ({ chat }) => {
  return (
    <div className={`message-row ${chat.role}`}>
      {chat.role === "model" ? (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <ChatIcon />
          <p className="message-text">{chat.text}</p>
        </div>
      ) : (
        <p className="message-text">{chat.text}</p>
      )}
    </div>
  );
};

export default ChatMessage;
