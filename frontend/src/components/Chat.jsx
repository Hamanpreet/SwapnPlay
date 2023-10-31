import React from "react";
import "../styles/Chat.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import Contacts from "./Contacts";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("/");

const Chat = (props) => {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [senderId, setSenderId] = useState("");
  const [receiverName, setReceiverName] = useState("");

  const { matchId } = useParams();
  const { subId } = props;

  useEffect(() => {
    socket.on("chat message", (newMessage) => {
      // Use the spread operator to create a new array with the new message
      setChat((prevChat) => [...prevChat, newMessage]);
    });
  }, []);

  useEffect(() => {
    if (subId) {
      // Make an API request to get the user's information based on subId
      axios
        .get(`http://localhost:8080/api/users/${subId}`)
        .then((response) => {
          // Set the currentUser state with the user's information
          setCurrentUser(response.data[0]);
        })
        .catch((error) => {
          console.error("Error fetching user information:", error);
        });
    }
  }, [subId]);

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
            `http://localhost:8080/api/messages/${matchId}/receiver`,
            {
              senderId,
            }
          );
          console.log("reciver", response.data);
          if (response.data[0]) {
            setReceiverId(response.data[0].id);
          }
        } catch (error) {
          console.error("Error fetching receiver information:", error);
        }
      })();
    }
  }, [matchId, senderId]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8080/api/messages/${matchId}/usernames`
  //       );
  //       console.log("Contact names", response.data);
  //       setContacts(response.data);
  //     } catch (error) {
  //       console.error("Error fetching contact names:", error);
  //     }
  //   })();
  // }, [matchId]);

  const sendMessage = async () => {
    console.log("senderid:", senderId);
    console.log("receiverid:", receiverId);
    const data = {
      text: message,
      match_id: 2,
      sender_id: senderId,
      receiver_id: 2,
    };
    // Save the message to the backend
    try {
      const response = await axios.post(
        "http://localhost:8080/api/messages",
        data
      );
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const renderMessages = () => {
    return chat.map((message, index) => (
      <div
        key={index}
        className={message.sender_id === currentUser.id ? "sent" : "received"}>
        {message.text}
      </div>
    ));
  };

  // UseEffect hook to fetch messages and update the state
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/messages/${matchId}`
        );
        const messagesData = response.data;
        console.log(messagesData);
        // Update the state with the fetched messages
        setChat(messagesData);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [matchId]);

// Fetch the receiver's name based on receiverId
useEffect(() => {
  if (receiverId) {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/${matchId}/receiverName`, { receiverId });
          console.log("Receiver name", response.data);
        // Set the receiver's name based on the response
        setReceiverName(response.data[0]);
      } catch (error) {
        console.error("Error fetching receiver's name:", error);
      }
    })();
  }
}, [receiverId]);

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
