import React, { useState } from "react";
import Box from "@mui/material/Box";
import ChatInput from "./components/ChatInput";
import Chats from "./components/Chats";

function App() {
  const BOT_HOST = import.meta.env.VITE_BOT_HOST;
  const BOT_PORT = import.meta.env.VITE_BOT_PORT;
  const BOT_URL = `http://${BOT_HOST}:${BOT_PORT}/chat`;

  const [messages, setMessages] = useState([
    { speaker: "bot", content: "Hello! How can I assist you today?"},
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const getBotResponse = async (userMessage) => {
    // add bot loading
    setIsLoading(true);
    addMessage({ speaker: "bot", content: ""})

    const response = await fetch(BOT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage })
    });

    if (!response.ok) {
      console.error("Failed to get response from bot");
      return;
    }

    const data = await response.json();
    
    // update last bot message content
    setMessages((prev) => {
      const lastBotMessage = prev[prev.length - 1];
      lastBotMessage.content = data.response;
      return [...prev];
    });
    setIsLoading(false);
  }

  const addMessage = (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
    
    if (newMessage.speaker === "user") {
      console.log("User message:", newMessage.content);
      getBotResponse(newMessage.content);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#242424",
        overflow: "hidden",
      }}
    >
      <Chats messages={messages}/>
      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          padding: "10px",
          boxSizing: "border-box",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <ChatInput isLoading={isLoading} onSend={(msg) => addMessage(msg)} />
      </Box>
    </Box>
  );
}

export default App;
