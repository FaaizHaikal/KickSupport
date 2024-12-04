import React, { useState } from "react";
import Box from "@mui/material/Box";
import MessageInput from "./components/MessageInput";
import AppContext from "./contexts/AppContext";

function App() {
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        newMessage,
        setNewMessage,
        isLoading,
        setIsLoading,
      }}
    >
      <Box
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <Box style={{ flex: "1", overflow: "auto", padding: "16px" }}></Box>
        <MessageInput />
      </Box>
    </AppContext.Provider>
  );
}

export default App;
