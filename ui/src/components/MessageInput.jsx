import React, { useContext, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import AppContext from "../contexts/AppContext";

function MessageInput() {
  const { newMessage, setNewMessage, isLoading, submitNewMessage } =
    useContext(AppContext);

  const textareaRef = useRef();

  function handleKeyDown(e) {
    if (e.keyCode === 13 && !e.shiftKey && !isLoading) {
      e.preventDefault();
      submitNewMessage();
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: "20px",
        padding: "5px 10px",
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
        onKeyDown={handleKeyDown}
        inputRef={textareaRef}
        sx={{
          backgroundColor: "#f0f0f0",
          borderRadius: "20px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            },
          },
        }}
      />
      <IconButton
        color="primary"
        onClick={submitNewMessage}
        disabled={isLoading}
        sx={{
          marginLeft: "10px",
          color: "gray",
          "&:hover": {
            color: "darkgray",
          },
        }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
}

export default MessageInput;
