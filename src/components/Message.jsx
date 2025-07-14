// src/components/Message.jsx
import React from "react";

function Message({ sender, text }) {
  return (
    <div className={`message ${sender === "user" ? "user" : "ai"}`}>
      <p>{text}</p>
    </div>
  );
}

export default Message;
