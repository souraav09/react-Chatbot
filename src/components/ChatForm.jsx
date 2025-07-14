import React, { useRef } from "react";
import { MdArrowUpward } from "react-icons/md";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;

    inputRef.current.value = "";

    const newHistory = [
      ...chatHistory,
      { role: "user", text: userMessage },
      { role: "model", text: "Thinking..." },
    ];

    setChatHistory(newHistory);

    generateBotResponse(newHistory);
  };

  return (
    <form className="chat-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type a message..."
        className="chat-input"
        required
      />
      <button type="submit">
        <MdArrowUpward />
      </button>
    </form>
  );
};

export default ChatForm;
