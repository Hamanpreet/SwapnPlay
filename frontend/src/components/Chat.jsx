import React from "react";
import "../styles/Chat.scss";
import axios from 'axios';
import { useState, useEffect } from "react";
import Contacts from "./Contacts";


const Chat = () => {

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(async() => {
    const response = await axios.get(`http://localhost:8080/api/messages/${userId}`);
    console.log("Contact names", response.data);
    setContacts(response.data);
  }, [])

  useEffect(async() => {

  }, [])


  return (
    <div className="chat-container">
      <div className="container">
        Chat
        <Contacts contacts={contacts} />

      </div>
    </div>
  );
};

export default Chat;