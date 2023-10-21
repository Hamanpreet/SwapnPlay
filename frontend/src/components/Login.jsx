import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Button from '@mui/material/Button';
import axios from 'axios';

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  if (isAuthenticated) {
    // This is user's sub ID from Auth0,used populate the `sub_id` field in users table.
    const subId = user.sub;
  
    // axios.post('/update-sub-id', { sub: subId }).then((response) => {
    //   console.log(response.data);
    // });
  }
  
  return (
    !isAuthenticated && (
      <Button variant="contained" color="primary" onClick={() => loginWithRedirect()}>Log In</Button>
    )
  );
};

export default LoginButton;
