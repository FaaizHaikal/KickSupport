import React, { useState } from "react";
import Box from "@mui/material/Box";
import ChatInput from "./components/ChatInput";
import Chats from "./components/Chats";

function App() {
  const [messages, setMessages] = useState([
    { speaker: "bot", message: "Hello! How can I assist you today?" },
  ]);

  const addMessage = (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
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
        <ChatInput onSend={(msg) => addMessage(msg)} />
      </Box>
    </Box>
  );
}

export default App;
