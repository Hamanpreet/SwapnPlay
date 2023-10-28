import React from "react";
import "../styles/Chat.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import Contacts from "./Contacts";
import { useParams } from "react-router-dom";
import io from 'socket.io-client';

const socket = io('/');

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const { userId } = useParams();

  useEffect(async () => {
    const response = await axios.get(
      `http://localhost:8080/api/messages/${userId}`
    );
    console.log("Contact names", response.data);
    setContacts(response.data);
  }, [userId]);

  useEffect(() => {
    socket.on('chat message', (message) => {
      setChat((chat) => [...chat, message]);
    });
  }, []);

  const sendMessage = async() => {
    // socket.emit('chat message', message);
    // setMessage('');
    if (message.trim() === '') {
      return;
    }
    // Send the message to the server
    try {
      const response = await axios.post('http://localhost:8080/api/messages', {
        userId: userId, // You might need to adjust this based on your server's API
        message: message,
      });
      setMessage('');
    } catch (error) {
      // Handle any errors here
      console.error('Error sending message:', error);
    }
  };


  return (
    <div className="Chat">
      <div className="chat-container">
        <div className="message-list">{
        /* Display chat messages*/
          chat.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)} // Update the message state
            className="message-box"
          />
          <button onClick={sendMessage} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
