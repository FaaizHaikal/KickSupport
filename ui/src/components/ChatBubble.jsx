import React from "react";
import { Box, Typography } from "@mui/material";

function ChatBubble({ speaker, message }) {
  const isBot = speaker === "bot";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isBot ? "row" : "row-reverse",
        width: "100%",
        marginBottom: "10px",
      }}
    >
      <Box
        sx={{
          backgroundColor: isBot ? "#e0e0e0" : "#1976d2",
          color: isBot ? "#000000" : "#ffffff",
          borderRadius: "20px",
          padding: "10px",
          maxWidth: "75%",
          wordWrap: "break-word",
        }}
      >
        <Typography variant="body1">{message}</Typography>
      </Box>
    </Box>
  );
}

export default ChatBubble;
