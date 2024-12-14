import React, { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function ChatInput({ onSend }) {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      onSend({ speaker: "user", message: newMessage });
      setNewMessage(""); // Clear input after sending
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: "20px",
        padding: "5px",
        backgroundColor: "#f0f0f0",
      }}
    >
      <TextField
        fullWidth
        multiline
        maxRows={4}
        variant="outlined"
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            },
          },
        }}
      />
      <IconButton
        color="primary"
        onClick={handleSend}
        sx={{
          marginLeft: "10px",
        }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
}

export default ChatInput;
