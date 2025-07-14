import React, { useState } from "react";
import ChatIcon from "./components/ChatIcon";
import ChatMessage from "./components/ChatMessage";
import ChatForm from "./components/ChatForm";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

function App() {
  const [chatHistory, setChatHistory] = useState([]);

  const updateBotResponse = (text) => {
    setChatHistory((prev) =>
      prev.map((msg) =>
        msg.role === "model" && msg.text === "Thinking..."
          ? { ...msg, text }
          : msg
      )
    );
  };

  const generateBotResponse = async (history) => {
    const formattedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: formattedHistory }),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.error?.message || "Something went wrong");

      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
        "No response.";
      updateBotResponse(reply);
    } catch (err) {
      updateBotResponse("Sorry, something went wrong!");
    }
  };

  return (
    <div className="container">
      <div className="chatbot-popup">
        <div className="chatbot-header">
          <div className="header-left">
            <ChatIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button className="close-btn material-symbols-rounded">
            keyboard_arrow_down
          </button>
        </div>

        <div className="chat-body">
          <div className="message-bot">
            <ChatIcon />
            <p className="message-text">
              Hi there!
              <br />
              How can I help you today?
            </p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
