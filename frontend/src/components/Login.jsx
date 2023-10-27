import { useAuth0 } from "@auth0/auth0-react";
import  React, { useEffect } from "react";
import Button from '@mui/material/Button';
import axios from 'axios';


const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  useEffect (() => {
    if (isAuthenticated) {
      axios.post('http://localhost:8080/api/users', user)
      .then((response) => {
        //console.log(response);
      })
    }
  },[isAuthenticated])

  
  return (
    !isAuthenticated && (
      <Button variant="contained" color="primary" onClick={() => loginWithRedirect()}>Log In</Button>
    )
  );
};

export default LoginButton;
