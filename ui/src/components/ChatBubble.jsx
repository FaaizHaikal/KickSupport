import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

function ChatBubble({ speaker, content }) {
  const isBot = speaker === "bot";
  const isBotLoading = isBot && content === "";

  const links = [
    "kickflicker.kisenaa.me",
    "faaizhaikal@gmail.com",
  ];

  const modifiedContent = () => {
    if (!isBot || isBotLoading) {
      return content;
    }

    let modifiedContent = content;
    links.forEach((link) => {
      const regex = new RegExp(link, 'g');
      modifiedContent = modifiedContent.replace(
        regex,
        `<a href="http://${link}" target="_blank">${link}</a>`
      );
    });

    console.log(modifiedContent);

    return modifiedContent;
  }

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
          display: "flex",
          alignItems: "center",
        }}
      >
        {isBotLoading ? (
          <CircularProgress size={20} sx={{ color: "#000000" }} />
        ) : (
          <Typography variant="body1" dangerouslySetInnerHTML={{ __html: modifiedContent() }} />
        )}
      </Box>
    </Box>
  );
}

export default ChatBubble;
