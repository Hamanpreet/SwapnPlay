import React from "react";
import "../styles/Chat.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import config from "../config/config";


const socket = io("/");

const Chat = (props) => {
  const [currentUser, setCurrentUser] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [senderId, setSenderId] = useState("");
  const [receiverName, setReceiverName] = useState("");

  const  { userId }  = useParams();
  const matchId = userId;
  
  
  const { subId } = props;


  useEffect(() => {
    if (subId) {
      // Make an API request to get the user's information based on subId
      axios
        .get(`${config.baseUrl}/api/users/${subId}`)
        .then((response) => {
          // Set the currentUser state with the user's information
          //console.log("currentUser", currentUser);
          setCurrentUser(response.data[0]);
        })
        .catch((error) => {
          console.error("Error fetching user information:", error);
        });
    }
  }, [subId, currentUser]);

  useEffect(() => {
    if (currentUser.id) {
      // Set the senderId based on the currentUser
      setSenderId(currentUser.id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (senderId) {
      (async () => {
        try {
          const response = await axios.get(
            `${config.baseUrl}/api/messages/${matchId}/receiver`,
            {
              params: { senderId },

            }
          );
          console.log("reciver", response.data);
            setReceiverId(response.data.id);
            const username = response.data.receiver_first_name;
            setReceiverName(username);
            // setReceiverName(username.split('@')[0]);
         
        } catch (error) {
          console.error("Error fetching receiver information:", error);
        }
      })();
    }
  }, [matchId, senderId]);


  const sendMessage = async () => {
    console.log("senderid:", senderId);
    console.log("receiverid:", receiverId);
    const data = {
      text: message,
      match_id: matchId,
      sender_id: senderId,
      receiver_id: receiverId,
    };
    // Save the message to the backend
    try {
      await axios.post(
        `${config.baseUrl}/api/messages`,
        data
      );
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    socket.on("chat message", (newMessage) => {
      // Spread operator to create a new array with the new message
      setChat((prevChat) => [...prevChat, newMessage]);
    });
  }, []);

  const renderMessages = () => {
    if (chat) {
    return chat.map((message, index) => (
      <div
        key={index}
        className={message.sender_id === currentUser?.id ? "sent" : "received"}>
        {message.text}
      </div>
    ));
    }
  };

  // UseEffect hook to fetch messages and update the state
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${config.baseUrl}/api/messages/${matchId}`
        );
        const messagesData = response.data;
        // Update the state with the fetched messages
        setChat(messagesData);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [matchId]);
  
  return (
    <div className="Chat">
      <div className="chat-header">
        <h2>{receiverName}</h2>
      </div>
      <div className="chat-container">
        <div className="message-list">
          {
            /* Display chat messages*/
            renderMessages()
          }
        </div>
        <div className="message-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            // Update the message state
            onChange={(e) => setMessage(e.target.value)}
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
