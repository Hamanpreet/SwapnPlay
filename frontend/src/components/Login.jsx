import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import Button from '@mui/material/Button';
import axios from 'axios';
import config from '../config/config'

const LoginButton = ({ onSubIdChange }) => {
  const { loginWithRedirect, isAuthenticated, user, isLoading, error } = useAuth0();

  useEffect(() => {
    if (error) {
      console.error("Auth0 Error:", error);
    }
    
    if (!isLoading && isAuthenticated) {
      // Send the user data to the backend
      axios.post(`${config.baseUrl}/api/users`, user)
        .then((response) => {
          onSubIdChange(user);
        })
        .catch((error) => {
          console.error("Error sending user data to the backend:", error);
        });
    }
  }, [isLoading, isAuthenticated, user, onSubIdChange, error]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        !isAuthenticated ? (
          <Button variant="contained" color="primary" onClick={() => loginWithRedirect()}>Log In</Button>
        ) : null
      )}
    </div>
  );
};

export default LoginButton;
