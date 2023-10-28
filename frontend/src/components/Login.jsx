import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import axios from 'axios';

const LoginButton = ({ onSubIdChange }) => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const [subId, setSubId] = useState(null); // State to store the sub ID

  useEffect(() => {
    if (isAuthenticated) {
      // Use the user's sub ID to identify the user
      setSubId(user.sub);

      // Send the user data to the backend
      axios.post('http://localhost:8081/api/users', user)
        .then((response) => {
          onSubIdChange(user.sub);
        })
        .catch((error) => {
          console.error("Error sending user data to the backend:", error);
        });
    }
  }, [isAuthenticated, user]);

  return (
    !isAuthenticated && (
      <Button variant="contained" color="primary" onClick={() => loginWithRedirect()}>Log In</Button>
    )
  );
};

export default LoginButton;
