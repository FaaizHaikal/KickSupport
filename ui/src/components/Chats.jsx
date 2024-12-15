import { useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import ChatBubble from "./ChatBubble";

function Chats({messages}) {
  const chatsRef = useRef(null);

  useEffect(() => {
    if (chatsRef.current) {
      chatsRef.current.scrollTo({
        top: chatsRef.current.scrollHeight,
        behavior: "smooth", // Smooth scrolling
      });
    }
  }, [messages]);

  return (
    <Box
      ref={chatsRef}
      sx={{
        flexGrow: 1,
        width: "100%",
        margin: "20px",
        maxWidth: "600px",
        display: "flex",
        flexDirection: "column-reverse", // Start from bottom
        overflowY: "auto",
        boxSizing: "border-box",
      }}
    >
      {messages
        .slice(0)
        .reverse()
        .map((message, index) => (
          <ChatBubble
            key={index}
            speaker={message.speaker}
            content={message.content}
          />
        ))}
    </Box>
  );
}

export default Chats;
