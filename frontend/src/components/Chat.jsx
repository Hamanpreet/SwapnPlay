import React from "react";
import "../styles/Chat.scss";
import axios from 'axios';
import { useState, useEffect } from "react";
import Contacts from "./Contacts";
import { useParams } from 'react-router-dom';


const Chat = () => {

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  const { userId } = useParams();

  useEffect(async() => {
    const response = await axios.get(`http://localhost:8080/api/messages/${userId}`);
    console.log("Contact names", response.data);
    setContacts(response.data);
  }, [userId])

  useEffect(async() => {

  }, [])


  return (
    <div className="chat-container">
      <div className="chat">
        <div className="left-column">
          <div className="receiver-info">
            <h3>Receiver: {contacts.receiver_first_name}</h3>
          </div>
          <div className="messages">
            {/* Loop through receiver's messages and display them */}
            
          </div>
        </div>
        <div className="right-column">
          <div className="sender-info">
            <h3>Sender: {currentUser}</h3>
          </div>
          <div className="messages">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;