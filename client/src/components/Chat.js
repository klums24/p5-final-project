import React, { useEffect, useRef, useState } from 'react';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';


const useStyles = styled((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    padding: theme.spacing(2),
  },
  chatBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    maxHeight: '300px',
    overflowY: 'auto',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  message: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
  },
  inputContainer: {
    display: 'flex',
    gap: theme.spacing(1),
  },
}));

function Chat() {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const connectionRef = useRef(null);
  const nameInputRef = useRef(null);
  const messageInputRef = useRef(null);

  useEffect(() => {
    connectionRef.current = new WebSocket('ws://localhost:8080');

    connectionRef.current.onopen = () => {
      console.log('WebSocket is open now.');
    };

    connectionRef.current.onclose = () => {
      console.log('WebSocket is closed now.');
    };

    connectionRef.current.onerror = (error) => {
      console.error('WebSocket error observed:', error);
    };

    connectionRef.current.onmessage = (event) => {
      const receivedData = event.data;
      if (typeof receivedData === 'string') {
        setMessages((prevMessages) => [...prevMessages, receivedData]);
      } else if (receivedData instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          const blobData = reader.result;
          setMessages((prevMessages) => [...prevMessages, blobData]);
        };
        reader.readAsText(receivedData);
      }
    };

    return () => {
      connectionRef.current.close();
    };
  }, []);

  const handleSendMessage = () => {
    const name = nameInputRef.current.value;
    const message = messageInputRef.current.value;
    const composedMessage = `${name}: ${message}`;

    connectionRef.current.send(composedMessage);

    nameInputRef.current.value = '';
    messageInputRef.current.value = '';
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h5" component="h2">
        Chat Box
      </Typography>
      <Paper className={classes.chatBox}>
        {messages.map((message, index) => (
          <Typography key={index} className={classes.message}>
            {message}
          </Typography>
        ))}
      </Paper>
      <Box className={classes.inputContainer}>
        <TextField
          inputRef={nameInputRef}
          type="text"
          placeholder="Name"
          variant="outlined"
          size="small"
        />
        <TextField
          inputRef={messageInputRef}
          type="text"
          placeholder="Message"
          variant="outlined"
          size="small"
        />
        <Button variant="contained" onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default Chat;
